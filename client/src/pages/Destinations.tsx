import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { PageHero } from '../components/layout/PageHero';
import { DestinationCard } from '../components/ui/DestinationCard';
import { destinations } from '../data/destinations';
import './Destinations.css';

const regions = ['All', 'South Asia', 'Southeast Asia', 'East Asia', 'Middle East', 'Europe'];

export function Destinations() {
  const [activeRegion, setActiveRegion] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return destinations.filter((d) => {
      const matchRegion = activeRegion === 'All' || d.region === activeRegion;
      const matchQuery = !query || d.name.toLowerCase().includes(query.toLowerCase()) || d.country.toLowerCase().includes(query.toLowerCase());
      return matchRegion && matchQuery;
    });
  }, [activeRegion, query]);

  return (
    <div className="destinations-page">
      <PageHero
        image="https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&w=1800&q=85"
        title="Explore Our Destinations"
        subtitle="48 handpicked destinations across Asia, Europe, and beyond — each chosen for extraordinary experiences."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Destinations' }]}
        overlay="dark"
      />

      <section className="section">
        <div className="container">
          {/* Filter Bar */}
          <div className="dest-page-filters" data-reveal>
            <div className="dest-page-search">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search destinations..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="dest-page-chips">
              {regions.map((r) => (
                <button
                  key={r}
                  className={`dest-page-chip ${activeRegion === r ? 'active' : ''}`}
                  onClick={() => setActiveRegion(r)}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="dest-page-count" data-reveal data-reveal-delay="1">
            Showing <strong>{filtered.length}</strong> destination{filtered.length !== 1 ? 's' : ''}
            {activeRegion !== 'All' && ` in ${activeRegion}`}
          </p>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="dest-page-grid">
              {filtered.map((dest) => (
                <DestinationCard key={dest.id} destination={dest} />
              ))}
            </div>
          ) : (
            <div className="dest-page-empty" data-reveal>
              <span>🗺️</span>
              <p>No destinations match your search. Try a different region or keyword.</p>
              <button onClick={() => { setQuery(''); setActiveRegion('All'); }}>
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
