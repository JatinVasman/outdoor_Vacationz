import { experiences } from '../../data/experiences';
import { ExperienceCard } from '../ui/ExperienceCard';
import './ExperiencesSection.css';

export function ExperiencesSection() {
  return (
    <section className="section experiences-section" id="experiences">
      <div className="container">
        <div className="section-header" data-reveal>
          <div className="section-header-left">
            <span className="eyebrow">✦ Travel Styles</span>
            <h2 className="heading-lg">How do you like to travel?</h2>
            <p className="text-soft" style={{ fontSize: '14.5px', marginTop: '4px' }}>
              Every kind of traveller finds their perfect journey with us
            </p>
          </div>
        </div>

        <div className="experiences-grid">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} experience={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
