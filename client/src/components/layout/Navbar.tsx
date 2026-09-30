import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Plane, ArrowRight } from 'lucide-react';
import './Navbar.css';

// nav links — Destinations and Departure Cities intentionally excluded (footer only)
const navLinks = [
  { label: 'Tour Packages', href: '/packages' },
  { label: 'Travel Guides', href: '/travel-guides' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setMenuOpen(false);
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const heroEl = document.getElementById('hero');
      if (heroEl) {
        heroEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className={`navbar-wrapper ${scrolled ? 'scrolled' : ''} ${isHome ? 'on-home' : 'on-inner'}`}>
      <nav className="navbar-pill">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={handleLogoClick} title="Outdoor Vacationz - Home">
          <span className="navbar-logo-icon">
            <Plane size={18} strokeWidth={2.5} />
          </span>
          <span className="navbar-logo-text">
            Outdoor<span className="navbar-logo-accent">Vacationz</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="navbar-links">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.href}
              className={({ isActive }) =>
                `navbar-link${isActive ? ' active' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* CTA */}
        <Link to="/plan-your-trip" className="navbar-cta">
          Plan My Trip <ArrowRight size={14} />
        </Link>

        {/* Mobile hamburger */}
        <button
          className="navbar-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`navbar-mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <NavLink
            key={link.label}
            to={link.href}
            className={({ isActive }) =>
              `navbar-mobile-link${isActive ? ' active' : ''}`
            }
          >
            {link.label}
          </NavLink>
        ))}
        <Link to="/plan-your-trip" className="navbar-mobile-cta">
          Plan My Trip <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
