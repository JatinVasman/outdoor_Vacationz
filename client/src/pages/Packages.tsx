import { PageHero } from '../components/layout/PageHero';
import { PackageCard } from '../components/ui/PackageCard';
import { packages } from '../data/packages';
import { SEOHead } from '../components/seo/SEOHead';
import { generateBreadcrumbSchema } from '../utils/schemaGenerator';
import './Packages.css';

export function Packages() {
  const breadcrumbs = [{ label: 'Tour Packages' }];
  const schemas = [generateBreadcrumbSchema(breadcrumbs)];

  return (
    <div className="packages-page">
      <SEOHead
        title="Curated Tour Packages | Domestic & International Holidays | Outdoor Vacationz"
        description="Discover 7 handcrafted holiday packages. Kerala tea hills, Vietnam Halong Bay cruises, Singapore city escapes, Malaysia Genting tours, and Meghalaya root bridge treks."
        keywords="travel packages, holiday packages, kerala tour, vietnam package, singapore tour package, malaysia tour, meghalaya package"
        canonical="/packages"
        jsonLd={schemas}
      />
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
