import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { experiences } from '../data/experiences';
import { destinations } from '../data/destinations';
import { packages } from '../data/packages';
import { PageHero } from '../components/layout/PageHero';
import { DestinationCard } from '../components/ui/DestinationCard';
import { PackageCard } from '../components/ui/PackageCard';
import './ExperienceDetail.css';

export function ExperienceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const experience = experiences.find((e) => e.slug === slug);

  if (!experience) return <Navigate to="/experiences" replace />;

  const relatedDests = destinations.filter((d) =>
    experience.recommendedDestinationSlugs.includes(d.slug)
  );
  const relatedPkgs = packages.filter((p) =>
    experience.recommendedPackageSlugs.includes(p.slug)
  );

  return (
    <div className="exp-detail-page">
      {/* Hero */}
      <PageHero
        image={experience.heroImage}
        title={experience.title + ' Travel'}
        subtitle={experience.description}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Experiences', href: '/experiences' },
          { label: experience.title },
        ]}
        overlay="dark"
        badge={experience.count}
      />

      <section className="section">
        <div className="container">
          {/* Overview */}
          <div className="exp-detail-overview" data-reveal>
            <div className="exp-detail-overview-text">
              <h2 className="heading-md">About {experience.title} Travel</h2>
              <p>{experience.longDescription}</p>
            </div>
          </div>

          {/* Activities */}
          <div className="exp-detail-section" data-reveal>
            <h2 className="heading-md">Featured Activities</h2>
            <div className="exp-activities-grid">
              {experience.activities.map((act) => (
                <div key={act.title} className="exp-activity-card">
                  <div className="exp-activity-img">
                    <img src={act.image} alt={act.title} loading="lazy" />
                  </div>
                  <div className="exp-activity-body">
                    <h3>{act.title}</h3>
                    <p>{act.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Destinations */}
          {relatedDests.length > 0 && (
            <div className="exp-detail-section" data-reveal>
              <div className="exp-detail-section-header">
                <h2 className="heading-md">Recommended Destinations</h2>
                <Link to="/destinations" className="section-link">
                  View all <ArrowRight size={14} />
                </Link>
              </div>
              <div className="exp-dest-grid">
                {relatedDests.map((d) => (
                  <DestinationCard key={d.id} destination={d} />
                ))}
              </div>
            </div>
          )}

          {/* Recommended Packages */}
          {relatedPkgs.length > 0 && (
            <div className="exp-detail-section" data-reveal>
              <div className="exp-detail-section-header">
                <h2 className="heading-md">Recommended Packages</h2>
                <Link to="/packages" className="section-link">
                  View all <ArrowRight size={14} />
                </Link>
              </div>
              <div className="exp-packages-list">
                {relatedPkgs.map((p) => (
                  <PackageCard key={p.id} pkg={p} />
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="exp-detail-cta" data-reveal>
            <h2>Ready for your {experience.title.toLowerCase()} adventure?</h2>
            <p>Our planners will craft the perfect {experience.title.toLowerCase()} itinerary just for you.</p>
            <div className="exp-detail-cta-actions">
              <Link to="/plan-your-trip" className="btn-primary">
                Plan My Trip <ArrowRight size={14} />
              </Link>
              <Link to="/contact" className="btn-outline">
                Talk to a Planner
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
