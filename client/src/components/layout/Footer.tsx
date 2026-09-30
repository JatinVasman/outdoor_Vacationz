import { Link } from 'react-router-dom';
import { Plane, Instagram, Facebook, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import './Footer.css';

const destinationHubLinks = [
  { label: 'Explore All Destinations →', href: '/packages' },
  { label: 'Kerala Backwaters & Hills', href: '/destinations/kerala' },
  { label: 'Vietnam Discovery', href: '/destinations/vietnam' },
  { label: 'Singapore & Sentosa', href: '/destinations/singapore' },
  { label: 'Malaysia (KL + Langkawi)', href: '/destinations/malaysia-langkawi' },
  { label: 'North East Meghalaya', href: '/destinations/north-east' },
];

const departureCityLinks = [
  { label: 'Explore All Locations →', href: '/locations' },
  { label: 'Tours from Delhi NCR', href: '/locations/delhi/delhi' },
  { label: 'Holidays from Mumbai', href: '/locations/maharashtra/mumbai' },
  { label: 'Packages from Bengaluru', href: '/locations/karnataka/bengaluru' },
  { label: 'Departures from Hyderabad', href: '/locations/telangana/hyderabad' },
  { label: 'Tours from Chennai', href: '/locations/tamil-nadu/chennai' },
];

const travelGuideLinks = [
  { label: 'Kerala 5-Day Route Plan', href: '/travel-guides/kerala-5-day-itinerary' },
  { label: 'First-Timer Vietnam Guide', href: '/travel-guides/vietnam-travel-guide-first-timers' },
  { label: 'Singapore & Malaysia Planner', href: '/travel-guides/singapore-malaysia-combined-trip-planner' },
  { label: 'Living Root Bridges Guide', href: '/travel-guides/meghalaya-living-root-bridges-cherrapunji-guide' },
  { label: 'Best Time to Visit Kerala', href: '/travel-guides/best-time-to-visit-kerala-weather-guide' },
  { label: 'Genting Dream Cruise Guide', href: '/travel-guides/genting-dream-cruise-singapore-guide' },
  { label: 'All Travel Guides & Tips', href: '/travel-guides' },
];

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/outdoor_vacationz/',
    icon: <Instagram size={18} />,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/Outdoorvacationz766/',
    icon: <Facebook size={18} />,
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner container">
        <div className="footer-grid" style={{ gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1fr' }}>
          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="footer-logo-icon">
                <Plane size={18} strokeWidth={2.5} />
              </span>
              <span>
                Outdoor<span className="footer-logo-accent">Vacationz</span>
              </span>
            </Link>
            <p className="footer-desc">
              Curated international and domestic travel packages with handpicked accommodations, private sightseeing transfers, and personalized itineraries.
            </p>
            <div className="footer-socials">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <div style={{ marginTop: '20px', fontSize: '13px', color: 'var(--soft)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <Mail size={14} color="var(--primary)" />
                <a href="mailto:contact.outdoorvacationz@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>
                  contact.outdoorvacationz@gmail.com
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <Phone size={14} color="var(--primary)" />
                <a href="tel:+917669931399" style={{ color: 'inherit', textDecoration: 'none' }}>
                  +91 76699 31399
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={14} color="var(--primary)" />
                <span>Sector 62, Noida, NCR, India</span>
              </div>
            </div>
          </div>

          {/* Destinations Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Destinations</h4>
            <ul className="footer-links">
              {destinationHubLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="footer-link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Departure Cities Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Departures</h4>
            <ul className="footer-links">
              {departureCityLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="footer-link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Travel Guides Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Travel Guides</h4>
            <ul className="footer-links">
              {travelGuideLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="footer-link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links & CTA Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links" style={{ marginBottom: '20px' }}>
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/packages" className="footer-link">All Tour Packages</Link></li>
              <li><Link to="/contact" className="footer-link">Contact Support</Link></li>
              <li><Link to="/plan-your-trip" className="footer-link">Plan My Trip</Link></li>
              <li><Link to="/seo-dashboard" className="footer-link" style={{ color: 'var(--primary)', fontWeight: 600 }}>SEO Health Console</Link></li>
            </ul>

            <Link to="/plan-your-trip" className="footer-enquiry-btn">
              Customize Journey
            </Link>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {currentYear} Outdoor Vacationz. All rights reserved. Registered travel management company.</span>
          <div className="footer-bottom-links">
            <Link to="/about" className="footer-bottom-link">About E-E-A-T</Link>
            <Link to="/contact" className="footer-bottom-link">Privacy & Terms</Link>
            <a href="/sitemap.xml" className="footer-bottom-link" target="_blank" rel="noreferrer">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
