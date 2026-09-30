const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://outdoorvacationz.com';
const TODAY = new Date().toISOString().split('T')[0];

const publicDir = path.join(__dirname, '..', 'client', 'public');
const sitemapsDir = path.join(publicDir, 'sitemaps');
if (!fs.existsSync(sitemapsDir)) {
  fs.mkdirSync(sitemapsDir, { recursive: true });
}

function buildUrlXml(url, lastmod, changefreq, priority) {
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function wrapUrlSet(items) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items.join('\n')}
</urlset>`;
}

// Write to both sitemaps/ and root public directory for standard crawlers
function writeSitemapFile(filename, content) {
  fs.writeFileSync(path.join(sitemapsDir, filename), content, 'utf8');
  fs.writeFileSync(path.join(publicDir, filename), content, 'utf8');
}

// 1. Static Pages (strictly canonical URLs, omitting /destinations which redirects to /packages)
const pages = [
  { path: '', freq: 'daily', priority: '1.0' },
  { path: '/packages', freq: 'weekly', priority: '0.9' },
  { path: '/travel-guides', freq: 'daily', priority: '0.9' },
  { path: '/locations', freq: 'weekly', priority: '0.9' },
  { path: '/about', freq: 'monthly', priority: '0.7' },
  { path: '/contact', freq: 'monthly', priority: '0.7' },
  { path: '/plan-your-trip', freq: 'monthly', priority: '0.8' },
];

const pageItems = pages.map((p) => buildUrlXml(`${BASE_URL}${p.path}`, TODAY, p.freq, p.priority));
const pagesXml = wrapUrlSet(pageItems);
writeSitemapFile('sitemap-pages.xml', pagesXml);
console.log(`[Pages Sitemap] Generated with ${pages.length} URLs.`);

// 2. Tours
const tourSlugs = [
  'kerala',
  'malaysia-kuala-lumpur-langkawi',
  'malaysia-singapore',
  'north-east',
  'singapore',
  'singapore-cruise',
  'vietnam',
];

const tourItems = tourSlugs.map((slug) => buildUrlXml(`${BASE_URL}/packages/${slug}`, TODAY, 'weekly', '0.9'));
const toursXml = wrapUrlSet(tourItems);
writeSitemapFile('sitemap-tours.xml', toursXml);
console.log(`[Tours Sitemap] Generated with ${tourSlugs.length} URLs.`);

// 3. Destinations
const destSlugs = [
  'kerala',
  'malaysia-langkawi',
  'malaysia-singapore',
  'north-east',
  'singapore',
  'singapore-cruise',
  'vietnam',
];

const destItems = destSlugs.map((slug) => buildUrlXml(`${BASE_URL}/destinations/${slug}`, TODAY, 'weekly', '0.9'));
const destinationsXml = wrapUrlSet(destItems);
writeSitemapFile('sitemap-destinations.xml', destinationsXml);
console.log(`[Destinations Sitemap] Generated with ${destSlugs.length} URLs.`);

// 4. Locations (Strictly Indexable States + Indexable Commercial Departure Hubs)
const cityDbPath = path.join(__dirname, '..', 'client', 'src', 'data', 'indiaCityDatabase.json');
const cityDatabase = JSON.parse(fs.readFileSync(cityDbPath, 'utf8'));

// Extract distinct states
const stateMap = new Map();
cityDatabase.forEach((c) => {
  if (c.stateSlug && !stateMap.has(c.stateSlug)) {
    stateMap.set(c.stateSlug, c.state);
  }
});

const stateUrls = Array.from(stateMap.keys()).map((stateSlug) =>
  buildUrlXml(`${BASE_URL}/locations/${stateSlug}`, TODAY, 'weekly', '0.8')
);

// Filter ONLY indexable cities (strictly excluding NOINDEX & REVIEW)
const indexableCities = cityDatabase.filter((c) => (c.indexability === 'INDEX' || c.indexabilityStatus === 'INDEX'));
const cityUrls = indexableCities.map((city) =>
  buildUrlXml(
    `${BASE_URL}/locations/${city.stateSlug}/${city.slug}`,
    TODAY,
    'monthly',
    city.tier && city.tier.includes('Tier 1') ? '0.85' : '0.75'
  )
);

const locationItems = [...stateUrls, ...cityUrls];
const locationsXml = wrapUrlSet(locationItems);
writeSitemapFile('sitemap-locations.xml', locationsXml);
console.log(`[Locations Sitemap] Generated with ${locationItems.length} URLs (${stateUrls.length} State hubs + ${cityUrls.length} indexable cities).`);

// 5. Travel Guides / Blog (Strictly Indexable & Non-Draft)
const guidesDbPath = path.join(__dirname, '..', 'client', 'src', 'data', 'travelGuidesDatabase.json');
const guidesDatabase = JSON.parse(fs.readFileSync(guidesDbPath, 'utf8'));

const indexableGuides = guidesDatabase.filter((g) => g.indexable === true && g.status !== 'DRAFT');
const guideItems = indexableGuides.map((guide) =>
  buildUrlXml(
    `${BASE_URL}/travel-guides/${guide.slug}`,
    guide.updatedDate || guide.publishDate || TODAY,
    'monthly',
    guide.status === 'PUBLISHED' ? '0.85' : '0.75'
  )
);

const guidesXml = wrapUrlSet(guideItems);
writeSitemapFile('sitemap-blogs.xml', guidesXml);
writeSitemapFile('sitemap-guides.xml', guidesXml);
console.log(`[Blogs/Guides Sitemap] Generated with ${guideItems.length} indexable articles (excluded ${guidesDatabase.length - guideItems.length} draft/review articles).`);

// 6. Master Sitemap Index
const totalSitemapUrls = pages.length + tourSlugs.length + destSlugs.length + locationItems.length + guideItems.length;

const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemaps/sitemap-pages.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemaps/sitemap-tours.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemaps/sitemap-destinations.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemaps/sitemap-locations.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemaps/sitemap-blogs.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemaps/sitemap-guides.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
</sitemapindex>`;

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapIndex, 'utf8');
fs.writeFileSync(path.join(sitemapsDir, 'sitemap.xml'), sitemapIndex, 'utf8');

// Also write sitemap_index.xml (standard convention used by Yoast/RankMath/crawlers)
fs.writeFileSync(path.join(publicDir, 'sitemap_index.xml'), sitemapIndex, 'utf8');
fs.writeFileSync(path.join(sitemapsDir, 'sitemap_index.xml'), sitemapIndex, 'utf8');

// 7. Combined Single Sitemap (all URLs in one file for direct submission fallback)
const allItems = [...pageItems, ...tourItems, ...destItems, ...locationItems, ...guideItems];
const allXml = wrapUrlSet(allItems);
writeSitemapFile('sitemap-all.xml', allXml);

console.log(`\n======================================================`);
console.log(`Master XML Sitemap Index generated successfully!`);
console.log(`Total Indexable URLs across all sitemaps: ${totalSitemapUrls}`);
console.log(`Pages: ${pages.length}`);
console.log(`Tours: ${tourSlugs.length}`);
console.log(`Destinations: ${destSlugs.length}`);
console.log(`Locations (States + Indexable Hubs): ${locationItems.length}`);
console.log(`Blogs / Travel Guides: ${guideItems.length}`);
console.log(`Files generated: sitemap.xml, sitemap_index.xml, sitemap-all.xml, modular sitemaps`);
console.log(`======================================================\n`);
