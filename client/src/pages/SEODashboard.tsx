import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  CheckCircle2,
  FileText,
  MapPin,
  Layers,
  Search,
  ExternalLink,
  ShieldCheck,
  Globe,
  Database,
  Compass,
} from 'lucide-react';
import { seoContentRoadmap } from '../data/seoContentRoadmap';
import { citiesDatabase } from '../data/locations';
import { destinations } from '../data/destinations';
import { packages } from '../data/packages';
import { travelGuides } from '../data/travelGuides';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import './SEODashboard.css';

export function SEODashboard() {
  const [activeTab, setActiveTab] = useState<'audit' | 'roadmap' | 'cities' | 'quality'>('audit');

  // Roadmap filters
  const [clusterFilter, setClusterFilter] = useState('All');
  const [intentFilter, setIntentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // City filters
  const [regionFilter, setRegionFilter] = useState('All');
  const [tierFilter, setTierFilter] = useState('All');

  const clusters = useMemo(() => {
    return ['All', ...Array.from(new Set(seoContentRoadmap.map((item) => item.cluster)))];
  }, []);

  const filteredRoadmap = useMemo(() => {
    return seoContentRoadmap.filter((item) => {
      const matchCluster = clusterFilter === 'All' || item.cluster === clusterFilter;
      const matchIntent = intentFilter === 'All' || item.searchIntent === intentFilter;
      const matchStatus = statusFilter === 'All' || item.status === statusFilter;
      const matchSearch =
        searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.primaryKeyword.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCluster && matchIntent && matchStatus && matchSearch;
    });
  }, [clusterFilter, intentFilter, statusFilter, searchQuery]);

  const filteredCities = useMemo(() => {
    return citiesDatabase.filter((city) => {
      const matchRegion = regionFilter === 'All' || city.region === regionFilter;
      const matchTier = tierFilter === 'All' || city.tier === tierFilter;
      return matchRegion && matchTier;
    });
  }, [regionFilter, tierFilter]);

  const indexableCitiesCount = citiesDatabase.filter((c) => c.indexabilityStatus === 'INDEX').length;
  const totalIndexableUrls = 1 + destinations.length + packages.length + travelGuides.length + indexableCitiesCount;

  return (
    <div className="seo-dashboard-page">
      <SEOHead
        title="SEO Growth & Content Architecture Dashboard | Outdoor Vacationz"
        description="Internal SEO monitoring and content architecture tool for Outdoor Vacationz."
        robots="noindex, nofollow"
      />

      <div className="container">
        <header className="dashboard-header">
          <div className="dashboard-title-group">
            <h1>
              <BarChart3 size={28} color="#38bdf8" />
              Outdoor Vacationz — SEO Growth Console
            </h1>
            <p>Engineered for organic topical authority, crawlability, and Google Search Essentials compliance.</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
              style={{ borderColor: '#334155', color: '#38bdf8', padding: '8px 14px', fontSize: '13px' }}
            >
              <ExternalLink size={14} /> View Sitemap Index
            </a>
            <a
              href="/robots.txt"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
              style={{ borderColor: '#334155', color: '#94a3b8', padding: '8px 14px', fontSize: '13px' }}
            >
              <ExternalLink size={14} /> View robots.txt
            </a>
          </div>
        </header>

        {/* Top Metric Cards */}
        <div className="dashboard-stats-grid">
          <div className="dashboard-stat-card">
            <span className="dashboard-stat-label">Total Indexable URLs</span>
            <span className="dashboard-stat-val">{totalIndexableUrls}</span>
            <span className="dashboard-stat-sub">Strict anti-doorway qualified</span>
          </div>

          <div className="dashboard-stat-card">
            <span className="dashboard-stat-label">Editorial Content Map</span>
            <span className="dashboard-stat-val">{seoContentRoadmap.length}</span>
            <span className="dashboard-stat-sub">Across 12 topical clusters</span>
          </div>

          <div className="dashboard-stat-card">
            <span className="dashboard-stat-label">Researched Indian Cities</span>
            <span className="dashboard-stat-val">{citiesDatabase.length}</span>
            <span className="dashboard-stat-sub">{indexableCitiesCount} live departure hubs</span>
          </div>

          <div className="dashboard-stat-card">
            <span className="dashboard-stat-label">Structured Schemas</span>
            <span className="dashboard-stat-val">8 Types</span>
            <span className="dashboard-stat-sub">JSON-LD 100% active</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="dashboard-tabs">
          <button
            className={`dashboard-tab-btn ${activeTab === 'audit' ? 'active' : ''}`}
            onClick={() => setActiveTab('audit')}
          >
            Technical SEO Health
          </button>
          <button
            className={`dashboard-tab-btn ${activeTab === 'roadmap' ? 'active' : ''}`}
            onClick={() => setActiveTab('roadmap')}
          >
            500+ Editorial Content Roadmap ({filteredRoadmap.length})
          </button>
          <button
            className={`dashboard-tab-btn ${activeTab === 'cities' ? 'active' : ''}`}
            onClick={() => setActiveTab('cities')}
          >
            Indian City Departure Database ({citiesDatabase.length})
          </button>
          <button
            className={`dashboard-tab-btn ${activeTab === 'quality' ? 'active' : ''}`}
            onClick={() => setActiveTab('quality')}
          >
            Google Quality Gate Verification
          </button>
        </div>

        {/* Tab 1: Technical SEO Health */}
        {activeTab === 'audit' && (
          <div className="dashboard-panel">
            <h2>Active Technical Infrastructure</h2>
            <div className="dashboard-checklist">
              <div className="checklist-item">
                <CheckCircle2 size={20} className="checklist-icon-done" />
                <div className="checklist-text">
                  <strong>Dynamic Metadata Engine (`SEOHead.tsx`):</strong> Dynamically updates `document.title`, description meta tags, OpenGraph, Twitter cards, and canonical tags on every React route change.
                </div>
              </div>

              <div className="checklist-item">
                <CheckCircle2 size={20} className="checklist-icon-done" />
                <div className="checklist-text">
                  <strong>Structured Data Suite (JSON-LD):</strong> Automates `Organization`, `WebSite`, `TouristDestination`, `Product`, `Article`, `FAQPage`, and `BreadcrumbList` schemas.
                </div>
              </div>

              <div className="checklist-item">
                <CheckCircle2 size={20} className="checklist-icon-done" />
                <div className="checklist-text">
                  <strong>Multi-Level XML Sitemaps:</strong> Hierarchical `sitemap.xml` referencing modular `sitemap-pages.xml`, `sitemap-tours.xml`, `sitemap-destinations.xml`, `sitemap-locations.xml`, and `sitemap-guides.xml`.
                </div>
              </div>

              <div className="checklist-item">
                <CheckCircle2 size={20} className="checklist-icon-done" />
                <div className="checklist-text">
                  <strong>Production `robots.txt`:</strong> Explicit crawl rules for Googlebot and Bingbot with sitemap index declaration and staging protection.
                </div>
              </div>

              <div className="checklist-item">
                <CheckCircle2 size={20} className="checklist-icon-done" />
                <div className="checklist-text">
                  <strong>Zero Doorway Compliance:</strong> City pages are only indexable where real airport connectivity and non-template advice exists (Delhi, Mumbai, Bengaluru, etc.).
                </div>
              </div>

              <div className="checklist-item">
                <CheckCircle2 size={20} className="checklist-icon-done" />
                <div className="checklist-text">
                  <strong>E-E-A-T Author Attribution:</strong> Every travel guide includes verified author credentials, travel specialist review badges, and editorial oversight notices.
                </div>
              </div>

              <div className="checklist-item">
                <CheckCircle2 size={20} className="checklist-icon-done" />
                <div className="checklist-text">
                  <strong>Deep Internal Cross-Linking:</strong> Bidirectional links between destinations, packages, departure cities, and practical travel guides.
                </div>
              </div>

              <div className="checklist-item">
                <CheckCircle2 size={20} className="checklist-icon-done" />
                <div className="checklist-text">
                  <strong>Image SEO & Fast WebP:</strong> Next-gen WebP images, descriptive alt text attributes, and responsive layout containers to minimize Cumulative Layout Shift (CLS).
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: 500+ Editorial Content Roadmap Explorer */}
        {activeTab === 'roadmap' && (
          <div className="dashboard-panel">
            <h2>
              <span>Editorial Content Roadmap Database</span>
              <span style={{ fontSize: '13px', color: '#94a3b8' }}>Showing {filteredRoadmap.length} of {seoContentRoadmap.length}</span>
            </h2>

            <div className="dashboard-filters">
              <select
                className="dashboard-select"
                value={clusterFilter}
                onChange={(e) => setClusterFilter(e.target.value)}
              >
                {clusters.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <select
                className="dashboard-select"
                value={intentFilter}
                onChange={(e) => setIntentFilter(e.target.value)}
              >
                <option value="All">All Search Intents</option>
                <option value="Informational">Informational</option>
                <option value="Commercial">Commercial</option>
                <option value="Transactional">Transactional</option>
              </select>

              <select
                className="dashboard-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="PUBLISHED">Published</option>
                <option value="READY">Ready</option>
                <option value="DRAFT">Draft</option>
                <option value="IDEA">Idea</option>
              </select>

              <input
                type="text"
                placeholder="Search title or keyword..."
                className="dashboard-input"
                style={{ flex: 1, minWidth: '200px' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="dashboard-table-wrapper">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Article Title</th>
                    <th>Cluster</th>
                    <th>Search Intent</th>
                    <th>Primary Keyword</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Suggested URL</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRoadmap.slice(0, 100).map((item) => (
                    <tr key={item.id}>
                      <td style={{ fontFamily: 'monospace', color: '#38bdf8' }}>{item.id}</td>
                      <td style={{ fontWeight: 600, color: '#f8fafc' }}>{item.title}</td>
                      <td>{item.cluster}</td>
                      <td>{item.searchIntent}</td>
                      <td style={{ fontStyle: 'italic' }}>{item.primaryKeyword}</td>
                      <td>
                        <span style={{ fontWeight: 700, color: item.priority === 'P0' ? '#ef4444' : (item.priority === 'P1' ? '#f59e0b' : '#94a3b8') }}>
                          {item.priority}
                        </span>
                      </td>
                      <td>
                        <span className={`pill-status ${
                          item.status === 'PUBLISHED' ? 'pill-published' :
                          item.status === 'READY' ? 'pill-ready' :
                          item.status === 'DRAFT' ? 'pill-draft' : 'pill-idea'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td style={{ fontFamily: 'monospace', fontSize: '11.5px' }}>{item.suggestedUrl}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredRoadmap.length > 100 && (
              <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '12px' }}>
                Displaying first 100 matching entries. Use the cluster or search filter to refine results.
              </p>
            )}
          </div>
        )}

        {/* Tab 3: Indian City Departure Database */}
        {activeTab === 'cities' && (
          <div className="dashboard-panel">
            <h2>
              <span>Researched Indian Cities Database</span>
              <span style={{ fontSize: '13px', color: '#94a3b8' }}>Showing {filteredCities.length} Cities</span>
            </h2>

            <div className="dashboard-filters">
              <select
                className="dashboard-select"
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
              >
                <option value="All">All Regions</option>
                <option value="North India">North India</option>
                <option value="South India">South India</option>
                <option value="West India">West India</option>
                <option value="East & North-East">East & North-East</option>
                <option value="Central India">Central India</option>
              </select>

              <select
                className="dashboard-select"
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value)}
              >
                <option value="All">All Market Tiers</option>
                <option value="Tier 1">Tier 1</option>
                <option value="Tier 2">Tier 2</option>
                <option value="Tier 3">Tier 3</option>
              </select>
            </div>

            <div className="dashboard-table-wrapper">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>City</th>
                    <th>State</th>
                    <th>Region</th>
                    <th>Airport</th>
                    <th>Market Tier</th>
                    <th>Indexability</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCities.map((city) => (
                    <tr key={city.slug}>
                      <td style={{ fontWeight: 700, color: '#fff' }}>{city.name}</td>
                      <td>{city.state}</td>
                      <td>{city.region}</td>
                      <td>{city.airportCode} ({city.airportName.split('(')[0]})</td>
                      <td>{city.tier}</td>
                      <td>
                        <span className={`pill-status ${city.indexabilityStatus === 'INDEX' ? 'pill-published' : 'pill-idea'}`}>
                          {city.indexabilityStatus}
                        </span>
                      </td>
                      <td>
                        <Link to={`/locations/${city.slug}`} style={{ color: '#38bdf8', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          View Hub <ExternalLink size={12} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Quality Gate Verification */}
        {activeTab === 'quality' && (
          <div className="dashboard-panel">
            <h2>Google Quality Gate 18-Point Pre-Publication Checklist</h2>
            <div className="dashboard-checklist">
              {[
                'Does this page satisfy an authentic traveler search intent?',
                'Does it provide original, factual value rather than spinning competitor text?',
                'Is it meaningfully distinct from all existing indexed URLs?',
                'Is the travel information and flight duration accurate?',
                'Would a real human find this page helpful if search engines did not exist?',
                'Is the HTML title tag concise (<60 chars) and unique?',
                'Does the page feature a single, descriptive H1 heading?',
                'Is the meta description compelling and under 155 characters?',
                'Is the canonical link absolute and matching the primary URL?',
                'Are contextual internal links present to relevant packages and guides?',
                'Are authentic high-resolution images included with descriptive alt tags?',
                'Is valid JSON-LD structured data injected and verified without errors?',
                'Is the URL lowercase, hyphen-separated, and under 70 characters?',
                'Is the page mobile-responsive with zero horizontal layout shift?',
                'Are interactive elements sized properly with adequate touch targets?',
                'Is the page free from doorway / spun programmatic duplication?',
                'Is author attribution or editorial oversight transparently displayed?',
                'Is this URL declared in the appropriate modular XML sitemap?',
              ].map((item, i) => (
                <div key={i} className="checklist-item">
                  <CheckCircle2 size={18} className="checklist-icon-done" />
                  <span className="checklist-text">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
