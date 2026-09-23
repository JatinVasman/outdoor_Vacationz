import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './FinalCTA.css';

export function FinalCTA() {
  return (
    <section className="final-cta" id="cta">
      <img
        src="https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1800&q=80"
        alt="Desert dunes at sunset"
        loading="lazy"
      />
      <div className="final-cta-overlay">
        <div className="final-cta-content" data-reveal>
          <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.7)' }}>
            ✦ Your next adventure
          </span>
          <h2 className="final-cta-headline">
            Where will your next journey take you?
          </h2>
          <p className="final-cta-sub">
            Free consultation with a dedicated travel planner. We'll design your perfect escape in 24 hours.
          </p>
          <div className="final-cta-actions">
            <Link to="/plan-your-trip" className="final-cta-btn-primary">
              Plan My Trip <ArrowRight size={16} />
            </Link>
            <Link to="/packages" className="final-cta-btn-secondary">
              Explore Tour Packages
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
