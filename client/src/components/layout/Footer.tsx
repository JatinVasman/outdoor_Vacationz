import { Link } from 'react-router-dom';
import { Plane, Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const exploreLinks = [
  { label: 'Destinations', href: '/destinations' },
  { label: 'Packages', href: '/packages' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'About Us', href: '/about' },
  { label: 'Plan Your Trip', href: '/plan-your-trip' },
];

const destinationLinks = [
  { label: 'Bali, Indonesia', href: '/destinations/bali' },
  { label: 'Maldives', href: '/destinations/maldives' },
  { label: 'Dubai, UAE', href: '/destinations/dubai' },
  { label: 'Swiss Alps', href: '/destinations/swiss-alps' },
  { label: 'Kashmir, India', href: '/destinations/kashmir' },
  { label: 'Kyoto, Japan', href: '/destinations/kyoto' },
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
        <div className="footer-grid">
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
              Handpicked travel experiences for adventurers. We plan the details so you can live the journey.
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
          </div>

          {/* Explore */}
          <div className="footer-col">
            <h4 className="footer-heading">Explore</h4>
            <ul className="footer-links">
              {exploreLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="footer-link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div className="footer-col">
            <h4 className="footer-heading">Top Destinations</h4>
            <ul className="footer-links">
              {destinationLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="footer-link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="footer-heading">Get In Touch</h4>
            <ul className="footer-contact-list">
              <li className="footer-contact-item">
                <Mail size={15} />
                <a href="mailto:Outdoorvacationz@gmail.com" className="footer-link">
                  Outdoorvacationz@gmail.com
                </a>
              </li>
              <li className="footer-contact-item">
                <Phone size={15} />
                <a href="tel:+917669931399" className="footer-link">
                  +91 76699 31399
                </a>
              </li>
              <li className="footer-contact-item">
                <MapPin size={15} />
                <span className="footer-link">India</span>
              </li>
            </ul>
            <Link to="/contact" className="footer-enquiry-btn">
              Send Enquiry
            </Link>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {currentYear} Outdoor Vacationz. All rights reserved.</span>
          <div className="footer-bottom-links">
            <Link to="/" className="footer-bottom-link">Privacy Policy</Link>
            <Link to="/" className="footer-bottom-link">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
