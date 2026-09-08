import { useParams, Link, Navigate } from 'react-router-dom';
import { Star, MapPin, Calendar, Clock, ArrowRight, Check, Info, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { destinations } from '../data/destinations';
import { packages } from '../data/packages';
import { PageHero } from '../components/layout/PageHero';
import { PackageCard } from '../components/ui/PackageCard';
import './DestinationDetail.css';

export function DestinationDetail() {
  const { slug } = useParams<{ slug: string }>();
  const destination = destinations.find((d) => d.slug === slug);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!destination) return <Navigate to="/destinations" replace />;

  const relatedPackages = packages.filter((p) =>
    destination.relatedPackageSlugs.includes(p.slug)
  );

  return (
    <div className="dest-detail-page">
      {/* Hero */}
      <PageHero
        image={destination.heroImage}
        title={destination.name}
        subtitle={destination.description}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Destinations', href: '/destinations' },
          { label: destination.name },
        ]}
        overlay="dark"
        badge={destination.country}
        meta={
          <div className="dest-detail-hero-meta">
            <span className="dest-meta-pill">
              <Star size={13} fill="var(--amber)" color="var(--amber)" />
              {destination.rating} rating
            </span>
            <span className="dest-meta-pill">
              <Clock size={13} />
              from {destination.duration}
            </span>
            <span className="dest-meta-pill">
              <MapPin size={13} />
              {destination.country}
            </span>
          </div>
        }
      />

      <div className="container">
        <div className="dest-detail-layout">
          {/* Main content */}
          <div className="dest-detail-main">

            {/* About */}
            <section className="dest-detail-section" data-reveal>
              <h2 className="heading-md">About {destination.name}</h2>
              <p className="dest-detail-long-desc">{destination.longDescription}</p>
            </section>

            {/* Highlights */}
            <section className="dest-detail-section" data-reveal>
              <h2 className="heading-md">Top Highlights</h2>
              <div className="dest-highlights-grid">
                {destination.highlights.map((h) => (
                  <div key={h.title} className="dest-highlight-card">
                    <h3>{h.title}</h3>
                    <p>{h.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Why Visit */}
            <section className="dest-detail-section" data-reveal>
              <h2 className="heading-md">Why Visit {destination.name}?</h2>
              <ul className="dest-why-list">
                {destination.whyVisit.map((reason) => (
                  <li key={reason}>
                    <Check size={16} />
                    {reason}
                  </li>
                ))}
              </ul>
            </section>

            {/* Gallery */}
            <section className="dest-detail-section" data-reveal>
              <h2 className="heading-md">Gallery</h2>
              <div className="dest-gallery">
                {destination.gallery.map((img, i) => (
                  <div key={i} className="dest-gallery-item">
                    <img src={img} alt={`${destination.name} ${i + 1}`} loading="lazy" />
                  </div>
                ))}
              </div>
            </section>

            {/* Recommended Packages */}
            {relatedPackages.length > 0 && (
              <section className="dest-detail-section" data-reveal>
                <h2 className="heading-md">Recommended Packages</h2>
                <div className="dest-detail-packages">
                  {relatedPackages.map((pkg) => (
                    <PackageCard key={pkg.id} pkg={pkg} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="dest-detail-sidebar">
            {/* Quick info card */}
            <div className="dest-info-card" data-reveal>
              <h3 className="dest-info-title">
                <Info size={15} /> Travel Information
              </h3>
              <div className="dest-info-grid">
                <div className="dest-info-item">
                  <span>Ideal For</span>
                  <strong>{destination.travelInfo.idealFor.join(', ')}</strong>
                </div>
                <div className="dest-info-item">
                  <span>Best Season</span>
                  <strong>{destination.travelInfo.bestSeason}</strong>
                </div>
                <div className="dest-info-item">
                  <span>Climate</span>
                  <strong>{destination.travelInfo.climate}</strong>
                </div>
                <div className="dest-info-item">
                  <span>Currency</span>
                  <strong>{destination.travelInfo.currency}</strong>
                </div>
                <div className="dest-info-item">
                  <span>Language</span>
                  <strong>{destination.travelInfo.language}</strong>
                </div>
                <div className="dest-info-item">
                  <span>Timezone</span>
                  <strong>{destination.travelInfo.timezone}</strong>
                </div>
              </div>
            </div>

            {/* Best time */}
            <div className="dest-best-time-card" data-reveal>
              <Calendar size={18} />
              <div>
                <h4>Best Time to Visit</h4>
                <p>{destination.bestTime}</p>
              </div>
            </div>

            {/* Starting price */}
            <div className="dest-price-card" data-reveal>
              <span className="dest-price-from">Packages from</span>
              <span className="dest-price-value">{destination.startingPrice}</span>
              <span className="dest-price-per">per person</span>
              <Link to="/plan-your-trip" className="dest-price-cta">
                Plan a Trip to {destination.name} <ArrowRight size={14} />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
