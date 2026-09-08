import { PageHero } from '../components/layout/PageHero';
import { PackageCard } from '../components/ui/PackageCard';
import { packages } from '../data/packages';
import './Packages.css';

export function Packages() {
  return (
    <div className="packages-page">
      <PageHero
        image="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1800&q=85"
        title="Travel Packages"
        subtitle="Handcrafted itineraries with every detail planned — all you have to do is show up."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Packages' }]}
        overlay="dark"
      />

      <section className="section">
        <div className="container">
          <div className="packages-page-header" data-reveal>
            <div>
              <span className="eyebrow">✦ All Packages</span>
              <h2 className="heading-lg" style={{ marginTop: 8 }}>
                {packages.length} journeys waiting for you
              </h2>
              <p className="text-soft" style={{ marginTop: 6, fontSize: '14.5px' }}>
                Spring – Winter 2025 · All-inclusive · Flights optional
              </p>
            </div>
          </div>

          <div className="packages-page-list">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
