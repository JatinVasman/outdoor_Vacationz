import { Link } from 'react-router-dom';
import { destinations } from '../../data/destinations';
import { DestinationCard } from '../ui/DestinationCard';
import { ArrowRight } from 'lucide-react';
import './DestinationsSection.css';

export function DestinationsSection() {
  const [featured, ...rest] = destinations;

  return (
    <section className="section destinations-section" id="destinations">
      <div className="container">
        <div className="section-header" data-reveal>
          <div className="section-header-left">
            <span className="eyebrow">✦ Tour Destinations</span>
            <h2 className="heading-lg">Explore our 7 signature destinations</h2>
            <p className="text-soft" style={{ fontSize: '14.5px', marginTop: '4px' }}>
              Authentic itineraries with vetted hotels, private transfers &amp; guided sightseeing
            </p>
          </div>
          <Link to="/packages" className="section-link">
            View all 7 packages <ArrowRight size={15} />
          </Link>
        </div>

        {/* Featured Destination Spotlight Card (Horizontal Orientation) */}
        <div className="destinations-featured-wrap" data-reveal data-reveal-delay="1">
          <DestinationCard destination={featured} featured />
        </div>

        {/* Trending Destinations Grid */}
        <div className="destinations-grid-section" data-reveal data-reveal-delay="2">
          <div className="destinations-grid-header">
            <h3 className="destinations-subheading">All Curated Tour Destinations</h3>
          </div>
          <div className="destinations-row">
            {rest.slice(0, 6).map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
