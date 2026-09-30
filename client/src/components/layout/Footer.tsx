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
  {
    label: 'WhatsApp',
    href: 'https://wa.me/917669931399?text=Hello%20Outdoor%20Vacationz%2C%20I%20would%20like%20to%20inquire%20about%20a%20vacation%20package.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    ),
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
