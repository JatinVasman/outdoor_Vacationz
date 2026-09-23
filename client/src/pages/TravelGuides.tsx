import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, ArrowRight, BookOpen, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { travelGuides } from '../data/travelGuides';
import { PageHero } from '../components/layout/PageHero';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { generateBreadcrumbSchema, generateWebSiteSchema } from '../utils/schemaGenerator';
import './TravelGuides.css';

const CLUSTERS = ['All Destinations', 'Kerala', 'Vietnam', 'Singapore', 'Malaysia', 'North East'];
const CATEGORIES = [
  'All Categories',
  'Destination Guides',
  'Itineraries',
  'Things To Do',
  'Best Time To Visit',
  'Travel Planning',
  'Family Travel',
  'Honeymoon',
  'Budget Travel',
  'Adventure Travel',
  'Travel Tips',
  'Food & Experiences',
];

const ITEMS_PER_PAGE = 18;

export function TravelGuides() {
  const [selectedCluster, setSelectedCluster] = useState('All Destinations');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 on filter/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCluster, selectedCategory, searchQuery]);

  const filteredGuides = useMemo(() => {
    return travelGuides.filter((guide) => {
      const matchesCluster =
        selectedCluster === 'All Destinations' ||
        guide.destination.toLowerCase().includes(selectedCluster.toLowerCase()) ||
        guide.cluster.toLowerCase().includes(selectedCluster.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All Categories' ||
        (guide.category || '').toLowerCase() === selectedCategory.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        guide.title.toLowerCase().includes(q) ||
        guide.excerpt.toLowerCase().includes(q) ||
        guide.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCluster && matchesCategory && matchesSearch;
    });
  }, [selectedCluster, selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredGuides.length / ITEMS_PER_PAGE);
  const paginatedGuides = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredGuides.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredGuides, currentPage]);

  const featuredGuide = useMemo(() => {
    return travelGuides.find((g) => g.isFeatured) || travelGuides[0];
  }, []);

  const breadcrumbs = [{ label: 'Travel Guides' }];
  const schemas = [
    generateWebSiteSchema(),
    generateBreadcrumbSchema(breadcrumbs),
  ];

  return (
    <div className="guides-page">
      <SEOHead
        title="Travel Guides & Itinerary Planners | 500+ Expert Guides | Outdoor Vacationz"
        description="Browse 500+ expert-curated travel guides, 5-day itineraries, packing checklists, and seasonal weather advice across Kerala, Vietnam, Singapore, Malaysia, and Meghalaya."
        keywords="travel guides, tour itineraries, munnar travel tips, halong bay cruise guide, singapore travel planner, meghalaya explorer, vietnam itinerary"
        canonical="/travel-guides"
        jsonLd={schemas}
      />

      <PageHero
        title="Travel Guides & Itinerary Planners"
        subtitle="Over 500 practical routes, seasonal weather insights, and local tips curated by certified destination specialists."
        image="/images/tours/kerala-munnar.webp"
        badge="Editorial Library"
      />

      <Breadcrumbs items={breadcrumbs} />

      <div className="container guides-container">
        {/* Destination Cluster Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          {CLUSTERS.map((cluster) => (
            <button
              key={cluster}
              className={`guides-tab-btn ${selectedCluster === cluster ? 'active' : ''}`}
              onClick={() => setSelectedCluster(cluster)}
            >
              {cluster}
            </button>
          ))}
        </div>

        {/* Category & Search Filter Bar */}
        <div className="guides-filter-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <Filter size={16} color="var(--primary)" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                background: '#fff',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-pill)',
                padding: '8px 16px',
                fontSize: '13.5px',
                color: 'var(--ink)',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer',
              }}
              aria-label="Filter by category"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <span style={{ fontSize: '13px', color: 'var(--soft)' }}>
              Showing <strong>{filteredGuides.length}</strong> of {travelGuides.length} articles
            </span>
          </div>

          <div className="guides-search-box">
            <Search size={16} color="var(--soft)" />
            <input
              type="text"
              placeholder="Search 500+ guides, routes, tips..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search travel guides"
            />
          </div>
        </div>

        {/* Featured Article Banner (only on page 1 with default filters) */}
        {featuredGuide && selectedCluster === 'All Destinations' && selectedCategory === 'All Categories' && !searchQuery && currentPage === 1 && (
          <Link to={`/travel-guides/${featuredGuide.slug}`} className="guides-featured-card">
            <img
              src={featuredGuide.coverImage}
              alt={featuredGuide.title}
              className="guides-featured-img"
              loading="eager"
            />
            <div className="guides-featured-content">
              <div className="guides-badge-strip">
                <span className="guides-dest-badge">{featuredGuide.destination}</span>
                <span className="guides-time-badge">
                  <Clock size={13} style={{ display: 'inline', verticalAlign: '-1px' }} /> {featuredGuide.readingTime}
                </span>
                <span style={{ fontSize: '11px', background: '#fef3c7', color: '#92400e', fontWeight: 700, padding: '2px 8px', borderRadius: '12px' }}>
                  FEATURED GUIDE
                </span>
              </div>
              <h2 className="guides-featured-title">{featuredGuide.title}</h2>
              <p className="guides-featured-excerpt">{featuredGuide.excerpt}</p>
              <div className="guides-author-byline">
                <span style={{ fontSize: '12.5px', color: 'var(--soft)', fontWeight: 600 }}>
                  Outdoor Vacationz Editorial Desk · Updated {featuredGuide.updatedDate}
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Guides Grid */}
        <div className="guides-grid">
          {paginatedGuides.map((guide) => {
            return (
              <Link key={guide.id} to={`/travel-guides/${guide.slug}`} className="guide-card">
                <div className="guide-card-img-wrapper">
                  <img
                    src={guide.coverImage || guide.featuredImage}
                    alt={guide.imageAlt || guide.title}
                    className="guide-card-img"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/tours/kerala-munnar.webp';
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: 'rgba(15, 23, 42, 0.8)',
                      color: '#fff',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '12px',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    {guide.destination}
                  </span>
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '12px',
                      background: 'rgba(255, 255, 255, 0.9)',
                      color: 'var(--ink)',
                      fontSize: '10.5px',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    {guide.category}
                  </span>
                </div>
                <div className="guide-card-body">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--soft)' }}>
                    <Clock size={13} /> {guide.readingTime}
                    <span>•</span>
                    <span>{guide.publishedDate}</span>
                  </div>
                  <h3 className="guide-card-title">{guide.title}</h3>
                  <p className="guide-card-excerpt">{guide.excerpt}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--line)' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--soft)' }}>Outdoor Vacationz</span>
                    <span style={{ color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 700 }}>
                      Read Guide <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredGuides.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: 'var(--radius-md)', border: '1px solid var(--line)' }}>
            <BookOpen size={40} color="var(--soft)" style={{ marginBottom: '12px' }} />
            <h3 style={{ fontSize: '18px', color: 'var(--ink)', marginBottom: '8px' }}>No travel guides match your filter</h3>
            <p style={{ color: 'var(--soft)', fontSize: '14px' }}>Try resetting the destination cluster or search keywords.</p>
            <button
              className="btn btn-primary"
              style={{ marginTop: '12px' }}
              onClick={() => { setSelectedCluster('All Destinations'); setSelectedCategory('All Categories'); setSearchQuery(''); }}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '48px' }}>
            <button
              className="guides-tab-btn"
              disabled={currentPage === 1}
              onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
              style={{ opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
            >
              <ChevronLeft size={14} style={{ display: 'inline', verticalAlign: '-2px' }} /> Previous
            </button>

            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink)', margin: '0 8px' }}>
              Page {currentPage} of {totalPages}
            </span>

            <button
              className="guides-tab-btn"
              disabled={currentPage === totalPages}
              onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
              style={{ opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
            >
              Next <ChevronRight size={14} style={{ display: 'inline', verticalAlign: '-2px' }} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
