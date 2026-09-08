import { PageHero } from '../components/layout/PageHero';
import { ExperienceCard } from '../components/ui/ExperienceCard';
import { experiences } from '../data/experiences';
import './Experiences.css';

export function Experiences() {
  return (
    <div className="experiences-page">
      <PageHero
        image="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1800&q=85"
        title="Travel Experiences"
        subtitle="Adventure. Luxury. Wellness. Culture. Find the travel style that defines you."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Experiences' }]}
        overlay="dark"
      />

      <section className="section">
        <div className="container">
          <div className="experiences-page-header" data-reveal>
            <span className="eyebrow">✦ All Experiences</span>
            <h2 className="heading-lg" style={{ marginTop: 8 }}>
              How do you like to travel?
            </h2>
            <p className="text-soft" style={{ marginTop: 8, fontSize: '15px', maxWidth: '55ch' }}>
              Choose a travel style and we'll curate the right destinations, packages, and moments for you.
            </p>
          </div>

          <div className="experiences-page-grid" data-reveal data-reveal-delay="1">
            {experiences.map((exp, i) => (
              <ExperienceCard key={exp.id} experience={exp} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
