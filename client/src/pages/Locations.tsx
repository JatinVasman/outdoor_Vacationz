import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Plane, ArrowRight, ShieldCheck, Search, Building2, ChevronRight } from 'lucide-react';
import { citiesDatabase, getAllStates } from '../data/locations';
import { PageHero } from '../components/layout/PageHero';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { generateBreadcrumbSchema, generateWebSiteSchema } from '../utils/schemaGenerator';
import './Locations.css';

const REGIONS = ['All Regions', 'North India', 'South India', 'West India', 'East & North-East', 'Central India'] as const;

export function Locations() {
  const [selectedRegion, setSelectedRegion] = useState<string>('All Regions');
  const [searchQuery, setSearchQuery] = useState('');
  const allStates = getAllStates();

  const filteredCities = useMemo(() => {
    return citiesDatabase.filter((city) => {
      const matchesRegion = selectedRegion === 'All Regions' || city.region === selectedRegion;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        city.name.toLowerCase().includes(q) ||
        city.state.toLowerCase().includes(q) ||
        city.airportCode.toLowerCase().includes(q);
      return matchesRegion && matchesSearch;
    });
  }, [selectedRegion, searchQuery]);

  // Indexable primary departure hubs
  const primaryHubs = useMemo(() => {
    return filteredCities.filter((c) => c.indexabilityStatus === 'INDEX');
  }, [filteredCities]);

  const breadcrumbs = [{ label: 'Travel by City' }];
  const schemas = [
    generateWebSiteSchema(),
    generateBreadcrumbSchema(breadcrumbs),
  ];

  return (
    <div className="locations-page">
      <SEOHead
        title="Holiday Packages by Indian Departure City | 450+ Cities Directory | Outdoor Vacationz"
        description="Browse handcrafted holiday packages departing from 450+ Indian cities across all states. Direct flight connections to Kerala, Vietnam, Singapore, Malaysia, and Meghalaya."
        keywords="travel packages from delhi, tours from mumbai, bangalore holiday packages, hyderabad tour packages, kolkata international departures, india departure directory"
        canonical="/locations"
        jsonLd={schemas}
      />

      <PageHero
        title="Holiday Packages by Indian Departure City"
        subtitle="Explore seamless direct flight routes, airport logistics, and door-to-destination tour packages across 450+ Indian cities."
        image="/images/tours/kerala-munnar.webp"
        badge="450+ Cities Directory"
      />

      <Breadcrumbs items={breadcrumbs} />

      <div className="container locations-container">
        {/* Search & Region Filter Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {REGIONS.map((region) => (
              <button
                key={region}
                className={`guides-tab-btn ${selectedRegion === region ? 'active' : ''}`}
                onClick={() => setSelectedRegion(region)}
              >
                {region}
              </button>
            ))}
          </div>

          <div className="guides-search-box">
            <Search size={16} color="var(--soft)" />
            <input
              type="text"
              placeholder="Search 450+ cities, states, or airport codes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search cities, states, or airport codes"
            />
          </div>
        </div>

        {/* Anti-Doorway Verification Banner */}
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 'var(--radius-md)', padding: '18px 24px', marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <ShieldCheck size={28} color="#16a34a" style={{ flexShrink: 0 }} />
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#166534', margin: '0 0 4px' }}>
              Authentic Local Departure Planning & Zero-Doorway Standard
            </h4>
            <p style={{ fontSize: '13.5px', color: '#14532d', margin: 0, lineHeight: 1.5 }}>
              Outdoor Vacationz maps real aviation and railway logistics from 450+ cities across all Indian states into our tour packages. Verified commercial hubs feature direct flight connections, local departure advice, and private vehicle escorts upon landing.
            </p>
          </div>
        </div>

        {/* State Hierarchy Directory Cards (when not actively searching) */}
        {!searchQuery && selectedRegion === 'All Regions' && (
          <section style={{ marginBottom: '48px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>
                Browse Departures by State & Territory
              </h2>
              <span style={{ fontSize: '13px', color: 'var(--soft)' }}>
                {allStates.length} States & Territories
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
              {allStates.map((st) => (
                <Link
                  key={st.slug}
                  to={`/locations/${st.slug}`}
                  style={{
                    background: '#fff',
                    border: '1px solid var(--line)',
                    borderRadius: 'var(--radius-md)',
                    padding: '18px 20px',
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                  className="location-city-card"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>{st.name}</h3>
                    <span style={{ fontSize: '11px', background: 'rgba(13, 148, 136, 0.1)', color: 'var(--primary)', fontWeight: 700, padding: '2px 8px', borderRadius: '12px' }}>
                      {st.cityCount} Cities
                    </span>
                  </div>
                  <span style={{ fontSize: '12px', color: 'var(--soft)' }}>
                    Region: {st.region}
                  </span>
                  <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '4px' }}>
                    Key hubs: {st.sampleCities.join(', ')}...
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--primary)', fontWeight: 700, marginTop: '8px' }}>
                    <span>Explore State Departures</span>
                    <ChevronRight size={13} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Primary Departure Hubs Grid */}
        <section style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>
              {searchQuery ? `Search Results (${filteredCities.length} Cities)` : `Commercial Aviation Departure Hubs (${primaryHubs.length})`}
            </h2>
            <span style={{ fontSize: '13px', color: 'var(--soft)' }}>
              Verified Direct Flight Connections
            </span>
          </div>

          <div className="location-city-grid">
            {(searchQuery ? filteredCities : primaryHubs).map((city) => (
              <Link
                key={city.slug}
                to={`/locations/${city.stateSlug}/${city.slug}`}
                className="location-city-card"
              >
                <div className="location-city-top">
                  <div>
                    <h3 className="location-city-name">{city.name}</h3>
                    <span className="location-city-state">{city.state} · {city.tier}</span>
                  </div>
                  <span className="location-airport-code">{city.airportCode}</span>
                </div>

                <div className="location-airport-name">
                  <Plane size={13} color="var(--primary)" />
                  <span>{city.airportName.split('(')[0]}</span>
                </div>

                <p style={{ fontSize: '13px', color: 'var(--soft)', lineHeight: 1.5, margin: 0 }}>
                  {city.introCopy.substring(0, 110)}...
                </p>

                <div className="location-connections-summary">
                  {city.flightConnections?.kerala && (
                    <span className="location-conn-pill">Kerala {city.flightConnections.kerala.direct ? 'Direct' : '1-Stop'}</span>
                  )}
                  {city.flightConnections?.vietnam && (
                    <span className="location-conn-pill">Vietnam {city.flightConnections.vietnam.direct ? 'Direct' : '1-Stop'}</span>
                  )}
                  {city.flightConnections?.singapore && (
                    <span className="location-conn-pill">Singapore {city.flightConnections.singapore.direct ? 'Direct' : '1-Stop'}</span>
                  )}
                  {city.flightConnections?.malaysia && (
                    <span className="location-conn-pill">Malaysia {city.flightConnections.malaysia.direct ? 'Direct' : '1-Stop'}</span>
                  )}
                  {city.flightConnections?.northEast && (
                    <span className="location-conn-pill">Guwahati Direct</span>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px', fontSize: '13px', color: 'var(--primary)', fontWeight: 700 }}>
                  <span>View Departure Packages</span>
                  <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {filteredCities.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: 'var(--radius-md)', border: '1px solid var(--line)' }}>
            <MapPin size={40} color="var(--soft)" style={{ marginBottom: '12px' }} />
            <h3 style={{ fontSize: '18px', color: 'var(--ink)', marginBottom: '8px' }}>No cities match your search</h3>
            <p style={{ color: 'var(--soft)', fontSize: '14px' }}>Try searching by city name, state name, or changing the selected region.</p>
          </div>
        )}
      </div>
    </div>
  );
}
