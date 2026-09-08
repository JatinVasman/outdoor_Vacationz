import { packages } from '../../data/packages';
import { PackageCard } from '../ui/PackageCard';
import './PackagesSection.css';

export function PackagesSection() {
  return (
    <section className="section packages-section" id="packages">
      <div className="container">
        <div className="section-header" data-reveal>
          <div className="section-header-left">
            <span className="eyebrow">✦ Featured Packages</span>
            <h2 className="heading-lg">Handpicked journeys</h2>
            <p className="text-soft" style={{ fontSize: '14.5px', marginTop: '4px' }}>
              Spring – Winter 2025 · All-inclusive · Flights optional
            </p>
          </div>
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
