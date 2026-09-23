import { useParams, Link, Navigate } from 'react-router-dom';
import {
  Clock,
  Calendar,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Share2,
  BookOpen,
  Compass,
} from 'lucide-react';
import { getTravelGuideBySlug, travelGuides } from '../data/travelGuides';
import { packages } from '../data/packages';
import { citiesDatabase } from '../data/locations';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFAQPageSchema,
} from '../utils/schemaGenerator';
import './TravelGuides.css';

export function TravelGuideDetail() {
  const { slug } = useParams<{ slug: string }>();
  const article = getTravelGuideBySlug(slug || '');

  if (!article) {
    return <Navigate to="/travel-guides" replace />;
  }

  const relatedPackages = packages.filter((pkg) =>
    article.relatedPackageSlugs.includes(pkg.slug)
  );

  const otherGuides = travelGuides.filter((g) => g.slug !== article.slug).slice(0, 3);

  const relatedCities = citiesDatabase.filter((c) =>
    article.relatedCitySlugs?.includes(c.slug)
  );

  const breadcrumbs = [
    { label: 'Travel Guides', url: '/travel-guides' },
    { label: article.destination, url: `/destinations/${article.destination.toLowerCase().replace(/[^a-z0-9]+/g, '-')}` },
    { label: article.title },
  ];

  const schemas = [
    generateArticleSchema(article),
    generateBreadcrumbSchema(breadcrumbs),
    article.faqs ? generateFAQPageSchema(article.faqs) : null,
  ].filter(Boolean);

  return (
    <div className="guide-detail-page">
      <SEOHead
        title={article.metaTitle || `${article.title} | Outdoor Vacationz`}
        description={article.metaDescription || article.excerpt}
        keywords={`${article.primaryKeyword}, ${article.secondaryKeywords.join(', ')}`}
        canonical={`/travel-guides/${article.slug}`}
        ogImage={article.coverImage}
        ogType="article"
        jsonLd={schemas}
      />

      <header className="guide-detail-header">
        <div className="container">
          <div className="guide-header-badges">
            <span className="guides-dest-badge">{article.destination}</span>
            <span className="guides-time-badge">
              <Clock size={13} style={{ display: 'inline', verticalAlign: '-1px' }} /> {article.readingTime}
            </span>
          </div>

          <h1 className="guide-detail-title">{article.h1 || article.title}</h1>
          <p className="guide-detail-excerpt">{article.excerpt}</p>

          <div className="guide-meta-strip">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(13, 148, 136, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                <Compass size={18} />
              </div>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--ink)' }}>
                  Outdoor Vacationz Editorial Desk
                </div>
                <div style={{ fontSize: '12px', color: 'var(--soft)' }}>
                  Published {article.publishedDate} · {article.readingTime}
                </div>
              </div>
            </div>

            <div className="guide-reviewer-badge">
              <ShieldCheck size={14} />
              <span>Verified Itinerary Logistics</span>
            </div>
          </div>
        </div>
      </header>

      <Breadcrumbs items={breadcrumbs} />

      <div className="container">
        <div className="guide-detail-layout">
          {/* Main Article Body */}
          <main className="guide-main-article">
            {article.coverImage && (
              <figure className="guide-cover-figure">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/tours/kerala-munnar.webp';
                  }}
                />
                <figcaption className="guide-cover-caption">
                  {article.title} · Handcrafted by Outdoor Vacationz
                </figcaption>
              </figure>
            )}

            {/* Sections */}
            {article.sections.map((section, idx) => (
              <section key={idx} className="guide-article-section">
                <h2>{section.heading}</h2>

                {section.body.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}

                {/* Optional Data Table */}
                {section.tableData && (
                  <div className="guide-data-table-wrapper">
                    <table className="guide-data-table">
                      <thead>
                        <tr>
                          {section.tableData.headers.map((h, hIdx) => (
                            <th key={hIdx}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.tableData.rows.map((row, rIdx) => (
                          <tr key={rIdx}>
                            {row.map((cell, cIdx) => (
                              <td key={cIdx}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Optional Tip Box */}
                {section.tipBox && (
                  <div className="guide-tip-box">
                    <strong>💡 Travel Specialist Tip: </strong>
                    {section.tipBox}
                  </div>
                )}
              </section>
            ))}

            {/* FAQs Section */}
            {article.faqs && article.faqs.length > 0 && (
              <section className="guide-article-section" style={{ marginTop: '48px' }}>
                <h2>Frequently Asked Questions</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {article.faqs.map((faq, i) => (
                    <div
                      key={i}
                      style={{
                        background: '#f8fafc',
                        border: '1px solid var(--line)',
                        borderRadius: 'var(--radius-md)',
                        padding: '20px',
                      }}
                    >
                      <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <HelpCircle size={16} color="var(--primary)" />
                        {faq.question}
                      </h3>
                      <p style={{ fontSize: '14.5px', color: 'var(--soft)', margin: 0, lineHeight: 1.6 }}>
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Route Verification Notice */}
            <div className="guide-author-bio-card" style={{ background: '#f8fafc', borderColor: '#e2e8f0' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(13, 148, 136, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                <ShieldCheck size={22} />
              </div>
              <div className="guide-author-bio-info">
                <h4>Verified by Outdoor Vacationz Travel Desk</h4>
                <div className="guide-author-role">Independent Route Research & Ground Coordination</div>
                <p className="guide-author-bio-text">
                  Our travel planners continuously verify transport timings, hotel access, and seasonal conditions across all featured circuits. Every published itinerary is backed by 24/7 on-trip concierge assistance and door-to-destination private transfers.
                </p>
              </div>
            </div>
          </main>

          {/* Sticky Sidebar */}
          <aside className="guide-sidebar">
            {/* Related Package Card */}
            {relatedPackages.length > 0 && (
              <div className="guide-sidebar-card" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)', borderColor: '#bbf7d0' }}>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#16a34a', fontWeight: 700 }}>
                  Featured Tour Package
                </span>
                <h3 style={{ fontSize: '17px', margin: '8px 0', border: 'none', padding: 0 }}>
                  {relatedPackages[0].title}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--soft)', lineHeight: 1.5, margin: '0 0 16px' }}>
                  {relatedPackages[0].duration} · {relatedPackages[0].hotel} hotels · Private vehicle throughout.
                </p>
                <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--ink)', marginBottom: '14px' }}>
                  {relatedPackages[0].price} <span style={{ fontSize: '12px', fontWeight: 400, color: 'var(--soft)' }}>/ person</span>
                </div>
                <Link to={`/packages/${relatedPackages[0].slug}`} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  View Full Package <ArrowRight size={14} />
                </Link>
              </div>
            )}

            {/* Departure Cities Connectivity Links */}
            {relatedCities.length > 0 && (
              <div className="guide-sidebar-card">
                <h3>Departures from Indian Cities</h3>
                <p style={{ fontSize: '13px', color: 'var(--soft)', marginBottom: '12px' }}>
                  Direct flights and transit connectivity to {article.destination}:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {relatedCities.map((city) => (
                    <Link
                      key={city.slug}
                      to={`/locations/${city.slug}`}
                      style={{
                        fontSize: '13.5px',
                        color: 'var(--ink)',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '6px 0',
                        borderBottom: '1px solid var(--line)',
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <MapPin size={13} color="var(--primary)" />
                        From {city.name}
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--soft)' }}>{city.airportCode}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Other Travel Guides */}
            <div className="guide-sidebar-card">
              <h3>More Travel Guides</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {otherGuides.map((guide) => (
                  <Link
                    key={guide.id}
                    to={`/travel-guides/${guide.slug}`}
                    style={{ textDecoration: 'none', color: 'inherit', display: 'flex', gap: '12px', alignItems: 'center' }}
                  >
                    <img
                      src={guide.coverImage}
                      alt={guide.title}
                      style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-sm)', objectFit: 'cover', flexShrink: 0 }}
                    />
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase' }}>
                        {guide.destination}
                      </div>
                      <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)', margin: '2px 0 0', lineHeight: 1.35 }}>
                        {guide.title.substring(0, 50)}...
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Need Custom Plan Card */}
            <div className="guide-sidebar-card" style={{ background: '#0f172a', color: '#fff', border: 'none' }}>
              <h3 style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.1)' }}>Planning a Trip?</h3>
              <p style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.6, margin: '0 0 16px' }}>
                Our destination architects can customize your itinerary, book flights, and arrange private transfers.
              </p>
              <Link to="/plan-your-trip" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Plan With a Specialist
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
