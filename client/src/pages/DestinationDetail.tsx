import { useParams, Link, Navigate } from 'react-router-dom';
import {
  MapPin,
  Clock,
  CheckCircle,
  HelpCircle,
  Info,
  Calendar,
  Compass,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { destinations } from '../data/destinations';
import { packages } from '../data/packages';
import { getTravelGuidesByDestination } from '../data/travelGuides';
import { PageHero } from '../components/layout/PageHero';
import { PackageCard } from '../components/ui/PackageCard';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import {
  generateTouristDestinationSchema,
  generateBreadcrumbSchema,
  generateFAQPageSchema,
} from '../utils/schemaGenerator';
import './DestinationDetail.css';

export function DestinationDetail() {
  const { slug } = useParams<{ slug: string }>();
  const destination = destinations.find((d) => d.slug === slug);

  if (!destination) {
    return <Navigate to="/destinations" replace />;
  }

  // Find linked tour packages
  const relatedPackages = packages.filter((pkg) => {
    if (destination.relatedPackageSlugs?.includes(pkg.slug)) return true;
    return (
      pkg.destinationSlug === destination.slug ||
      pkg.destination.toLowerCase().includes(destination.name.toLowerCase()) ||
      destination.name.toLowerCase().includes(pkg.destination.toLowerCase())
    );
  });

  // Find related travel guides
  const relatedGuides = getTravelGuidesByDestination(destination.name);

  // Default destination FAQs
  const destinationFAQs = [
    {
      question: `What is the best time of year to visit ${destination.name}?`,
      answer: destination.bestTime || `The most pleasant weather occurs during the winter and early spring months, when clear skies and moderate temperatures provide ideal conditions for sightseeing.`,
    },
    {
      question: `How many days are recommended for ${destination.name}?`,
      answer: `We recommend at least ${destination.duration || '5 to 7 days'} to comfortably experience the major natural highlights, cultural landmarks, and scenic landscapes without rushing.`,
    },
    {
      question: `Are all sightseeing transfers private in ${destination.name}?`,
      answer: `Yes, all Outdoor Vacationz packages in ${destination.name} include a dedicated private air-conditioned vehicle and professional chauffeur throughout your journey.`,
    },
    {
      question: `Can our itinerary in ${destination.name} be customized?`,
      answer: `Absolutely! Our destination specialists can adjust hotel categories, add exclusive excursions (such as backwater houseboats or luxury cable cars), and tailor daily pacing to suit your preferences.`,
    },
  ];

  const breadcrumbs = [
    { label: 'Destinations', url: '/destinations' },
    { label: destination.name },
  ];

  const schemas = [
    generateTouristDestinationSchema(destination),
    generateBreadcrumbSchema(breadcrumbs),
    generateFAQPageSchema(destinationFAQs),
  ];

  return (
    <div className="dest-detail-page">
      <SEOHead
        title={`${destination.name} Travel Packages & Destination Guide | Outdoor Vacationz`}
        description={`Explore ${destination.name} with Outdoor Vacationz. Best time to visit, curated itineraries, private tour packages, and travel guides for ${destination.country}.`}
        keywords={`${destination.name} tour packages, ${destination.name} travel guide, holidays in ${destination.name}, ${destination.country} tours`}
        canonical={`/destinations/${destination.slug}`}
        ogImage={destination.heroImage || destination.image}
        jsonLd={schemas}
      />

      <PageHero
        title={destination.name}
        subtitle={`${destination.region} · ${destination.country}`}
        image={destination.heroImage || destination.image}
        badge="Destination Guide"
      >
        <div className="dest-detail-hero-meta">
          <span className="dest-meta-pill">
            <Clock size={14} /> {destination.duration}
          </span>
          <span className="dest-meta-pill">
            <Compass size={14} /> {destination.country}
          </span>
          <span className="dest-meta-pill">
            ★ {destination.rating} Rating
          </span>
        </div>
      </PageHero>

      <Breadcrumbs items={breadcrumbs} />

      <div className="container">
        <div className="dest-detail-layout">
          {/* Main Content Area */}
          <main className="dest-detail-main">
            {/* Overview */}
            <section className="dest-detail-section">
              <h2 className="heading-md">About {destination.name}</h2>
              <p className="dest-detail-long-desc">{destination.longDescription || destination.description}</p>
            </section>

            {/* Highlights */}
            {destination.highlights && destination.highlights.length > 0 && (
              <section className="dest-detail-section">
                <h2 className="heading-md">Top Highlights & Experiences</h2>
                <div className="dest-highlights-grid">
                  {destination.highlights.map((h, i) => (
                    <div key={i} className="dest-highlight-card">
                      <h3>{h.title}</h3>
                      <p>{h.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Why Visit */}
            {destination.whyVisit && destination.whyVisit.length > 0 && (
              <section className="dest-detail-section">
                <h2 className="heading-md">Why Travel to {destination.name} with Us</h2>
                <ul className="dest-why-list">
                  {destination.whyVisit.map((reason, i) => (
                    <li key={i}>
                      <CheckCircle size={18} />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Tour Packages */}
            <section className="dest-detail-section">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 className="heading-md">Handcrafted {destination.name} Tour Packages</h2>
                <Link to="/packages" className="view-all-link" style={{ fontSize: '14px', color: 'var(--primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  All Packages <ArrowRight size={14} />
                </Link>
              </div>
              <div className="dest-detail-packages">
                {relatedPackages.length > 0 ? (
                  relatedPackages.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)
                ) : (
                  <p style={{ color: 'var(--soft)' }}>Contact our travel specialists to create a custom itinerary for {destination.name}.</p>
                )}
              </div>
            </section>

            {/* Related Travel Guides */}
            {relatedGuides.length > 0 && (
              <section className="dest-detail-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h2 className="heading-md">{destination.name} Travel Guides & Planning Tips</h2>
                  <Link to="/travel-guides" className="view-all-link" style={{ fontSize: '14px', color: 'var(--primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    All Travel Guides <ArrowRight size={14} />
                  </Link>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                  {relatedGuides.map((guide) => (
                    <Link
                      key={guide.id}
                      to={`/travel-guides/${guide.slug}`}
                      style={{
                        background: '#fff',
                        border: '1px solid var(--line)',
                        borderRadius: 'var(--radius-md)',
                        padding: '16px',
                        textDecoration: 'none',
                        color: 'inherit',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        transition: 'box-shadow var(--transition)',
                      }}
                    >
                      <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--primary)', fontWeight: 700 }}>
                        {guide.readingTime} · Travel Guide
                      </span>
                      <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)', margin: 0, lineHeight: 1.4 }}>
                        {guide.title}
                      </h4>
                      <p style={{ fontSize: '13px', color: 'var(--soft)', margin: 0, lineHeight: 1.5 }}>
                        {guide.excerpt.substring(0, 100)}...
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Destination FAQs */}
            <section className="dest-detail-section">
              <h2 className="heading-md">Frequently Asked Questions: {destination.name}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {destinationFAQs.map((faq, i) => (
                  <div
                    key={i}
                    style={{
                      background: '#fff',
                      border: '1px solid var(--line)',
                      borderRadius: 'var(--radius-md)',
                      padding: '18px 20px',
                    }}
                  >
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <HelpCircle size={16} color="var(--primary)" />
                      {faq.question}
                    </h3>
                    <p style={{ fontSize: '14px', color: 'var(--soft)', margin: 0, lineHeight: 1.6 }}>
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Sticky Sidebar */}
          <aside className="dest-detail-sidebar">
            {/* Price Box */}
            <div className="dest-price-card">
              <span className="dest-price-from">Curated Journeys From</span>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#fff', margin: '4px 0 16px' }}>
                {destination.startingPrice} <span style={{ fontSize: '13px', fontWeight: 400, color: '#a0aec0' }}>/ person</span>
              </div>
              <Link
                to="/plan-your-trip"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Plan Your {destination.name} Trip
              </Link>
            </div>

            {/* Quick Travel Facts */}
            {destination.travelInfo && (
              <div className="dest-info-card">
                <div className="dest-info-title">
                  <Info size={16} /> Quick Travel Facts
                </div>
                <div className="dest-info-grid">
                  <div className="dest-info-item">
                    <span>Best Season</span>
                    <strong>{destination.travelInfo.bestSeason}</strong>
                  </div>
                  <div className="dest-info-item">
                    <span>Climate</span>
                    <strong>{destination.travelInfo.climate}</strong>
                  </div>
                  <div className="dest-info-item">
                    <span>Currency</span>
                    <strong>{destination.travelInfo.currency}</strong>
                  </div>
                  <div className="dest-info-item">
                    <span>Languages</span>
                    <strong>{destination.travelInfo.language}</strong>
                  </div>
                  <div className="dest-info-item">
                    <span>Ideal For</span>
                    <strong>{destination.travelInfo.idealFor.join(', ')}</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Best Time Card */}
            {destination.bestTime && (
              <div className="dest-best-time-card">
                <Calendar size={20} />
                <div>
                  <h4>Best Time to Visit</h4>
                  <p>{destination.bestTime}</p>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
