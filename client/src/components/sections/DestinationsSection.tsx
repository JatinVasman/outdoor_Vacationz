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
            <span className="eyebrow">✦ Popular Destinations</span>
            <h2 className="heading-lg">Explore the world with us</h2>
            <p className="text-soft" style={{ fontSize: '14.5px', marginTop: '4px' }}>
              Curated by our planners · updated weekly
            </p>
          </div>
          <Link to="/destinations" className="section-link">
            View all 48 <ArrowRight size={15} />
          </Link>
        </div>

        {/* Featured Destination Spotlight Card (Horizontal Orientation) */}
        <div className="destinations-featured-wrap" data-reveal data-reveal-delay="1">
          <DestinationCard destination={featured} featured />
        </div>

        {/* Trending Destinations Grid */}
        <div className="destinations-grid-section" data-reveal data-reveal-delay="2">
          <div className="destinations-grid-header">
            <h3 className="destinations-subheading">More Trending Destinations</h3>
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
