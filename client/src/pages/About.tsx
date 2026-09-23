import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { PageHero } from '../components/layout/PageHero';
import './About.css';

const stats = [
  { value: '7', label: 'Curated Destinations' },
  { value: '7', label: 'Handcrafted Tours' },
  { value: '1,000+', label: 'Happy Travellers' },
  { value: '24/7', label: 'Dedicated Support' },
];


const values = [
  'Every itinerary is personally designed — never templated',
  'We only recommend experiences we have personally verified',
  '24/7 support throughout your journey from a real person',
  'Responsible tourism principles in every booking',
  'Transparent pricing — no hidden costs, ever',
  'Full flexibility — plans can be adjusted at any stage',
];

export function About() {
  return (
    <div className="about-page">
      <PageHero
        image="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1800&q=85"
        title="We Make Travel Feel Like It Should"
        subtitle="A team of passionate travellers building experiences worth having."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
        overlay="dark"
        align="center"
      />

      <div className="container">
        {/* Stats */}
        <div className="about-stats-row" data-reveal>
          {stats.map((s) => (
            <div key={s.label} className="about-stat">
              <span className="about-stat-value">{s.value}</span>
              <span className="about-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Story */}
        <div className="about-section about-story" data-reveal>
          <div className="about-story-text">
            <span className="eyebrow">✦ Our Story</span>
            <h2 className="heading-lg">Born from a love of travel done properly</h2>
            <p>
              Outdoor Vacationz started with a simple observation: too many people were booking holidays online and arriving disappointed — wrong hotels, rushed itineraries, cookie-cutter experiences. We knew there was a better way.
            </p>
            <p>
              Founded by a team of seasoned travellers and destination specialists, we set out to build a travel company that operates the way a trusted friend with extraordinary travel knowledge would. We listen first, then design an experience that fits the way you actually want to travel.
            </p>
            <p>
              Today, we specialise in Asia and Europe — regions we know intimately, with on-the-ground partners we trust completely. Every booking is handled personally. Every question gets a real answer from a real person.
            </p>
          </div>
          <div className="about-story-image">
            <img
              src="https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80"
              alt="Beautiful travel landscape"
              loading="lazy"
            />
          </div>
        </div>

        {/* Mission */}
        <div className="about-section about-mission" data-reveal>
          <div className="about-mission-image">
            <img
              src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80"
              alt="Our mission"
              loading="lazy"
            />
          </div>
          <div className="about-mission-text">
            <span className="eyebrow">✦ Our Mission</span>
            <h2 className="heading-lg">To make extraordinary travel accessible</h2>
            <p>
              We believe the most meaningful travel experiences should not require a travel agent contact or a luxury budget. Our mission is to make extraordinary, well-planned travel accessible to more people — curating experiences that feel personal, not packaged.
            </p>
            <p>
              We measure success in stories our travellers tell when they return — not in booking volume.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="about-section" data-reveal>
          <div className="about-values-header">
            <span className="eyebrow">✦ Why Choose Us</span>
            <h2 className="heading-lg">Our commitments to you</h2>
          </div>
          <div className="about-values-grid">
            {values.map((v) => (
              <div key={v} className="about-value-item">
                <CheckCircle2 size={18} />
                <span>{v}</span>
              </div>
            ))}
          </div>
        </div>


        {/* Final CTA */}
        <div className="about-cta" data-reveal>
          <h2>Ready to travel differently?</h2>
          <p>Tell us where you want to go. We'll take care of the rest.</p>
          <div className="about-cta-actions">
            <Link to="/plan-your-trip" className="btn-primary-dark">
              Plan Your Trip <ArrowRight size={14} />
            </Link>
            <Link to="/contact" className="btn-secondary-dark">
              Talk to Our Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
