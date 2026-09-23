import { useParams, Link, Navigate } from 'react-router-dom';
import { Plane, MapPin, ArrowRight, ShieldCheck, Compass } from 'lucide-react';
import { getCitiesByState, getAllStates } from '../data/locations';
import { packages } from '../data/packages';
import { PageHero } from '../components/layout/PageHero';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { generateBreadcrumbSchema, generateWebSiteSchema } from '../utils/schemaGenerator';
import './Locations.css';

export function StateLocations() {
  const params = useParams<{ stateSlug?: string; slug?: string }>();
  const stateSlug = params.stateSlug || params.slug || '';
  const allStates = getAllStates();
  const stateSummary = allStates.find((s) => s.slug === stateSlug);
  const cities = getCitiesByState(stateSlug);

  if (!stateSummary || cities.length === 0) {
    return <Navigate to="/locations" replace />;
  }

  const breadcrumbs = [
    { label: 'Travel by City', url: '/locations' },
    { label: stateSummary.name },
  ];

  const schemas = [
    generateWebSiteSchema(),
    generateBreadcrumbSchema(breadcrumbs),
  ];

  const indexableCities = cities.filter((c) => c.indexabilityStatus === 'INDEX');
  const otherCities = cities.filter((c) => c.indexabilityStatus !== 'INDEX');

  return (
    <div className="locations-page">
      <SEOHead
        title={`Holiday Packages from ${stateSummary.name} | Tours by Departure City | Outdoor Vacationz`}
        description={`Explore curated holiday packages departing from ${cities.length} cities across ${stateSummary.name}. Flight connections to Kerala, Vietnam, Singapore, and Malaysia with private tours.`}
        keywords={`holiday packages from ${stateSummary.name.toLowerCase()}, tour packages ${stateSummary.name.toLowerCase()}, flights from ${stateSummary.name.toLowerCase()}, vacations from ${stateSummary.name.toLowerCase()}`}
        canonical={`/locations/${stateSummary.slug}`}
        jsonLd={schemas}
      />

      <PageHero
        title={`Holiday Packages from ${stateSummary.name}`}
        subtitle={`Browse departure flight connectivity, airport logistics, and door-to-destination private holiday packages across ${cities.length} cities in ${stateSummary.name}.`}
        image="/images/tours/kerala-munnar.webp"
        badge={`${stateSummary.region} · ${cities.length} Cities`}
      />

      <Breadcrumbs items={breadcrumbs} />

      <div className="container locations-container">
        {/* Verification banner */}
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 'var(--radius-md)', padding: '16px 20px', marginBottom: '36px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <ShieldCheck size={24} color="#16a34a" style={{ flexShrink: 0 }} />
          <p style={{ margin: 0, fontSize: '13.5px', color: '#166534', lineHeight: 1.5 }}>
            Outdoor Vacationz coordinates departures from <strong>{stateSummary.name}</strong> with verified group flight bookings, pre-departure assistance, and private chauffeur vehicles upon landing in Kerala, Vietnam, Singapore, Malaysia, and Meghalaya.
          </p>
        </div>

        {/* Primary Departure Hubs */}
        {indexableCities.length > 0 && (
          <section style={{ marginBottom: '44px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--ink)', marginBottom: '16px' }}>
              Major Commercial Departure Hubs in {stateSummary.name}
            </h2>
            <div className="location-city-grid">
              {indexableCities.map((city) => (
                <Link
                  key={city.slug}
                  to={`/locations/${city.stateSlug}/${city.slug}`}
                  className="location-city-card"
                  style={{ borderColor: 'rgba(13, 148, 136, 0.4)' }}
                >
                  <div className="location-city-top">
                    <div>
                      <h3 className="location-city-name">{city.name}</h3>
                      <span className="location-city-state">{city.tier}</span>
                    </div>
                    <span className="location-airport-code" style={{ background: 'rgba(13, 148, 136, 0.1)', color: 'var(--primary)' }}>
                      {city.airportCode}
                    </span>
                  </div>

                  <div className="location-airport-name">
                    <Plane size={13} color="var(--primary)" />
                    <span>{city.airportName.split('(')[0]}</span>
                  </div>

                  <p style={{ fontSize: '13px', color: 'var(--soft)', lineHeight: 1.5, margin: 0 }}>
                    {city.introCopy.substring(0, 110)}...
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid var(--line)', color: 'var(--primary)', fontSize: '13px', fontWeight: 700 }}>
                    <span>View Departure Packages</span>
                    <ArrowRight size={14} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Regional & District Cities Directory */}
        {otherCities.length > 0 && (
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--ink)', marginBottom: '16px' }}>
              Regional Towns & Connecting Districts in {stateSummary.name} ({otherCities.length})
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
              {otherCities.map((city) => (
                <Link
                  key={city.slug}
                  to={`/locations/${city.stateSlug}/${city.slug}`}
                  style={{
                    background: '#fff',
                    border: '1px solid var(--line)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '12px 14px',
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'border-color 0.2s ease',
                  }}
                >
                  <div>
                    <strong style={{ fontSize: '14px', color: 'var(--ink)', display: 'block' }}>{city.name}</strong>
                    <span style={{ fontSize: '11.5px', color: 'var(--soft)' }}>Via {city.airportCode}</span>
                  </div>
                  <ArrowRight size={13} color="var(--soft)" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Other States Directory */}
        <section style={{ background: '#f8fafc', border: '1px solid var(--line)', borderRadius: 'var(--radius-md)', padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--ink)', marginBottom: '12px' }}>
            Explore Departures from Other Indian States
          </h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {allStates.filter((s) => s.slug !== stateSlug).map((s) => (
              <Link
                key={s.slug}
                to={`/locations/${s.slug}`}
                style={{
                  fontSize: '12.5px',
                  background: '#fff',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius-pill)',
                  padding: '4px 12px',
                  textDecoration: 'none',
                  color: 'var(--ink)',
                  fontWeight: 600,
                }}
              >
                {s.name} ({s.cityCount})
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
