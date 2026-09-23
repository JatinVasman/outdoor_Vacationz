import { Link } from 'react-router-dom';
import { packages } from '../../data/packages';
import { PackageCard } from '../ui/PackageCard';
import { ArrowRight } from 'lucide-react';
import './PackagesSection.css';

export function PackagesSection() {
  return (
    <section className="section packages-section" id="packages">
      <div className="container">
        <div className="section-header" data-reveal>
          <div className="section-header-left">
            <span className="eyebrow">✦ Featured Tour Packages</span>
            <h2 className="heading-lg">Our 7 Signature Journeys</h2>
            <p className="text-soft" style={{ fontSize: '14.5px', marginTop: '4px' }}>
              Handcrafted itineraries with full day-by-day plans, vetted hotels, and authentic sights
            </p>
          </div>
          <Link to="/packages" className="section-link">
            Explore all 7 journeys <ArrowRight size={15} />
          </Link>
        </div>

        <div className="packages-list">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}
