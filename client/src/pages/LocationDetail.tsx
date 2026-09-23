import { useParams, Link, Navigate } from 'react-router-dom';
import {
  Plane,
  Train,
  Clock,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Building,
  Info,
} from 'lucide-react';
import { getCityBySlug, citiesDatabase } from '../data/locations';
import { packages } from '../data/packages';
import { travelGuides } from '../data/travelGuides';
import { PackageCard } from '../components/ui/PackageCard';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import {
  generateLocationSchema,
  generateBreadcrumbSchema,
  generateFAQPageSchema,
} from '../utils/schemaGenerator';
import './Locations.css';

export function LocationDetail() {
  const params = useParams<{ stateSlug?: string; citySlug?: string; slug?: string }>();
  const targetCitySlug = params.citySlug || params.slug || '';
  const city = getCityBySlug(targetCitySlug);

  if (!city) {
    return <Navigate to="/locations" replace />;
  }

  const suggestedPackages = packages.filter((pkg) =>
    city.suggestedPackageSlugs?.includes(pkg.slug)
  );

  const relevantGuides = travelGuides.filter((g) =>
    city.suggestedPackageSlugs?.includes(g.relatedPackageSlugs[0])
  ).slice(0, 3);

  const breadcrumbs = [
    { label: 'Travel by City', url: '/locations' },
    ...(city.state && city.stateSlug ? [{ label: city.state, url: `/locations/${city.stateSlug}` }] : []),
    { label: `${city.name} Departures` },
  ];

  const schemas = [
    generateLocationSchema(city),
    generateBreadcrumbSchema(breadcrumbs),
    city.localFAQs && city.localFAQs.length > 0 ? generateFAQPageSchema(city.localFAQs) : null,
  ].filter(Boolean);

  const connections = Object.entries(city.flightConnections || {});

  return (
    <div className="city-detail-page">
      <SEOHead
        title={city.metaTitle || `Holiday Packages from ${city.name} | Outdoor Vacationz`}
        description={city.metaDescription || city.introCopy}
        keywords={`holiday packages from ${city.name.toLowerCase()}, tour packages from ${city.name.toLowerCase()}, flight connections from ${city.airportCode}, kerala tour from ${city.name.toLowerCase()}`}
        canonical={city.stateSlug ? `/locations/${city.stateSlug}/${city.slug}` : `/locations/${city.slug}`}
        robots={city.indexabilityStatus === 'INDEX' ? 'index, follow' : 'noindex, follow'}
        jsonLd={schemas}
      />

      <header className="city-detail-header">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
            <Plane size={15} />
            <span>Departure Hub · {city.state}</span>
          </div>

          <h1 className="city-detail-title">Holiday & Tour Packages from {city.name}</h1>
          <p className="city-detail-lead">{city.introCopy}</p>
        </div>
      </header>

      <Breadcrumbs items={breadcrumbs} />

      <div className="container">
        <div className="city-detail-layout">
          {/* Main Area */}
          <main className="city-detail-main">
            {/* Flight Connectivity Section */}
            <section className="city-section">
              <h2>Direct Flights & Connectivity from {city.airportCode}</h2>
              <p>
                Aviation connections and typical flight durations from {city.airportName} to our primary holiday destinations:
              </p>

              {connections.length > 0 ? (
                <div className="city-conn-grid">
                  {connections.map(([destKey, info]) => {
                    if (!info) return null;
                    const destDisplayName =
                      destKey === 'kerala' ? 'Kerala (Cochin COK)' :
                      destKey === 'vietnam' ? 'Vietnam (Hanoi / Da Nang)' :
                      destKey === 'singapore' ? 'Singapore (Changi SIN)' :
                      destKey === 'malaysia' ? 'Malaysia (Kuala Lumpur KUL)' :
                      'North East (Guwahati GAU)';

                    return (
                      <div key={destKey} className="city-conn-card">
                        <h3>
                          <span>{destDisplayName}</span>
                          <span className={`city-conn-badge ${info.direct ? 'direct' : 'connecting'}`}>
                            {info.direct ? 'Direct Flight' : '1-Stop'}
                          </span>
                        </h3>
                        <div className="city-conn-time">
                          <Clock size={13} style={{ display: 'inline', verticalAlign: '-1px' }} /> {info.flightTime}
                        </div>
                        <p className="city-conn-notes">{info.routeNotes}</p>
                        {info.airlineExamples && info.airlineExamples.length > 0 && (
                          <div style={{ fontSize: '11.5px', color: 'var(--soft)', marginTop: '8px' }}>
                            Airlines: <strong>{info.airlineExamples.join(', ')}</strong>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p style={{ color: 'var(--soft)', fontSize: '14px' }}>
                  Direct and connecting flight arrangements can be coordinated via metropolitan hub airports with group airfare benefits.
                </p>
              )}
            </section>

            {/* Curated Tour Packages for this city */}
            <section className="city-section">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2>Recommended Tour Packages from {city.name}</h2>
                <Link to="/packages" style={{ fontSize: '13.5px', color: 'var(--primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  All Packages <ArrowRight size={13} />
                </Link>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {suggestedPackages.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} />
                ))}
              </div>
            </section>

            {/* Local Departure Advice */}
            {city.localDepartureAdvice && (
              <section className="city-section">
                <h2>{city.name} Departure Logistics & Travel Planning Tips</h2>
                <p>{city.localDepartureAdvice}</p>
                {city.whyBookFromCity && city.whyBookFromCity.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
                    {city.whyBookFromCity.map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#334155' }}>
                        <CheckCircle size={16} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* Local FAQs */}
            {city.localFAQs && city.localFAQs.length > 0 && (
              <section className="city-section">
                <h2>Frequently Asked Questions: Departing from {city.name}</h2>
                {city.localFAQs.map((faq, i) => (
                  <div key={i} className="city-faq-item">
                    <h3>
                      <HelpCircle size={16} color="var(--primary)" />
                      {faq.question}
                    </h3>
                    <p>{faq.answer}</p>
                  </div>
                ))}
              </section>
            )}

            {/* Relevant Guides */}
            {relevantGuides.length > 0 && (
              <section className="city-section">
                <h2>Travel Guides & Route Planners</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginTop: '12px' }}>
                  {relevantGuides.map((guide) => (
                    <Link
                      key={guide.id}
                      to={`/travel-guides/${guide.slug}`}
                      style={{
                        background: '#f8fafc',
                        border: '1px solid var(--line)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '14px',
                        textDecoration: 'none',
                        color: 'inherit',
                      }}
                    >
                      <span style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase' }}>
                        {guide.destination}
                      </span>
                      <h4 style={{ fontSize: '13.5px', fontWeight: 700, margin: '4px 0 0', color: 'var(--ink)', lineHeight: 1.4 }}>
                        {guide.title}
                      </h4>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </main>

          {/* Sidebar */}
          <aside className="city-sidebar">
            {/* Transit Hub Info */}
            <div className="city-sidebar-card">
              <h3>{city.name} Transit Information</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13.5px' }}>
                <div>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--soft)', fontWeight: 700, display: 'block', marginBottom: '2px' }}>
                    Primary Airport
                  </span>
                  <strong>{city.airportName} ({city.airportCode})</strong>
                </div>

                {city.majorRailwayStations && city.majorRailwayStations.length > 0 && (
                  <div>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--soft)', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                      Key Railway Stations
                    </span>
                    <ul style={{ margin: 0, paddingLeft: '16px', color: 'var(--soft)', lineHeight: 1.5 }}>
                      {city.majorRailwayStations.map((stn, i) => (
                        <li key={i}>{stn}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--soft)', fontWeight: 700, display: 'block', marginBottom: '2px' }}>
                    Market Classification
                  </span>
                  <span>{city.tier} · {city.populationCategory}</span>
                </div>
              </div>
            </div>

            {/* Custom Trip Plan CTA */}
            <div className="city-sidebar-card" style={{ background: '#0f172a', color: '#fff', border: 'none' }}>
              <h3 style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.1)' }}>Planning from {city.name}?</h3>
              <p style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.6, margin: '0 0 16px' }}>
                Our travel concierge can coordinate group air tickets from {city.airportCode} with private vehicle pickups upon landing.
              </p>
              <Link to="/plan-your-trip" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Plan Your Vacation
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
