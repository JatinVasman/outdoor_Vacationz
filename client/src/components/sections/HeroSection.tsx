import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users, Wallet, ShieldCheck, Headphones, BadgeCheck, Sparkles, ArrowRight, Star, Compass, ChevronLeft, ChevronRight } from 'lucide-react';
import './HeroSection.css';

interface HeroDestination {
  name: string;
  country: string;
  price: string;
  image: string;
  thumbnail: string;
  packageSlug: string;
}

const heroDestinations: HeroDestination[] = [
  {
    name: 'Kerala',
    country: 'India',
    price: '₹45,000',
    image: '/images/tours/kerala-munnar.webp',
    thumbnail: '/images/tours/kerala-munnar.webp',
    packageSlug: 'kerala',
  },
  {
    name: 'Singapore',
    country: 'Singapore',
    price: '₹53,000',
    image: '/images/tours/singapore.webp',
    thumbnail: '/images/tours/singapore.webp',
    packageSlug: 'singapore',
  },
  {
    name: 'Vietnam',
    country: 'Vietnam',
    price: '₹54,000',
    image: '/images/tours/vietnam-phu-quoc-danang.webp',
    thumbnail: '/images/tours/vietnam-phu-quoc-danang.webp',
    packageSlug: 'vietnam',
  },
  {
    name: 'Malaysia (KL + Langkawi)',
    country: 'Malaysia',
    price: '₹37,000',
    image: '/images/tours/malaysia-kuala-lumpur-langkawi.webp',
    thumbnail: '/images/tours/malaysia-kuala-lumpur-langkawi.webp',
    packageSlug: 'malaysia-kuala-lumpur-langkawi',
  },
  {
    name: 'Singapore + Cruise',
    country: 'Singapore & Malaysia',
    price: '₹78,000',
    image: '/images/tours/singapore-genting-dream-cruise.webp',
    thumbnail: '/images/tours/singapore-genting-dream-cruise.webp',
    packageSlug: 'singapore-cruise',
  },
  {
    name: 'Malaysia + Singapore',
    country: 'Malaysia & Singapore',
    price: '₹53,000',
    image: '/images/tours/malaysia-singapore.webp',
    thumbnail: '/images/tours/malaysia-singapore.webp',
    packageSlug: 'malaysia-singapore',
  },
  {
    name: 'North East Meghalaya',
    country: 'India',
    price: '₹33,000',
    image: '/images/tours/north-east-meghalaya.webp',
    thumbnail: '/images/tours/north-east-meghalaya.webp',
    packageSlug: 'north-east',
  },
];

const trendingDestinations = [
  'Kerala',
  'Vietnam',
  'Singapore',
  'Singapore + Cruise',
  'Malaysia (KL + Langkawi)',
  'Malaysia + Singapore',
  'North East Meghalaya',
];

const trustBadges = [
  { icon: <ShieldCheck size={16} />, label: 'Zero hidden fees', sub: 'Transparent pricing' },
  { icon: <Headphones size={16} />, label: '24/7 dedicated support', sub: 'Real planners, on call' },
  { icon: <BadgeCheck size={16} />, label: 'Flexible cancellation', sub: 'Up to 21 days prior' },
];

const tabOptions = ['Tours', 'Activities'] as const;

export function HeroSection() {
  const navigate = useNavigate();
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<(typeof tabOptions)[number]>('Tours');
  const [destination, setDestination] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);

  const activeDest = heroDestinations[activeHeroIndex];

  const handleSelectHeroDestination = useCallback((idx: number) => {
    setActiveHeroIndex(idx);
  }, []);

  const scrollStrip = (direction: 'left' | 'right') => {
    if (!stripRef.current) return;
    const amount = 240;
    stripRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  // Auto-advance slideshow every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeroIndex((prev) => (prev + 1) % heroDestinations.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Enable horizontal mouse wheel scrolling and click-and-drag scrolling on the tours strip
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      startX = e.clientX;
      scrollLeft = el.scrollLeft;
      el.style.cursor = 'grabbing';
    };

    const onMouseLeave = () => {
      isDown = false;
      el.style.cursor = '';
    };

    const onMouseUp = () => {
      isDown = false;
      el.style.cursor = '';
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const walk = (e.clientX - startX) * 1.5;
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('mouseleave', onMouseLeave);
    el.addEventListener('mouseup', onMouseUp);
    el.addEventListener('mousemove', onMouseMove);

    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('mouseleave', onMouseLeave);
      el.removeEventListener('mouseup', onMouseUp);
      el.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  // Ensure active tour tab remains visible within the scrollable strip without scrolling ancestors
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const btn = el.children[activeHeroIndex] as HTMLElement;
    if (btn) {
      const targetScroll = btn.offsetLeft - el.offsetWidth / 2 + btn.offsetWidth / 2;
      el.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: 'smooth',
      });
    }
  }, [activeHeroIndex]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (destination) {
      const q = destination.toLowerCase().trim();
      const match = heroDestinations.find(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.packageSlug.includes(q) ||
          d.country.toLowerCase().includes(q)
      );
      if (match) {
        navigate(`/packages/${match.packageSlug}`);
        return;
      }
    }
    const pkgSection = document.getElementById('packages');
    if (pkgSection) {
      pkgSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/packages');
    }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <section className="hero" id="hero">
      <div className="hero-inner">
        {/* ══════ 1. Full-Bleed Background Stage ══════ */}
        <div className="hero-stage">
          {/* Background images */}
          {heroDestinations.map((dest, idx) => (
            <div
              key={dest.name}
              className={`hero-bg ${idx === activeHeroIndex ? 'active' : ''}`}
              style={{ backgroundImage: `url(${dest.image})` }}
              aria-hidden="true"
            />
          ))}
          <div className="hero-overlay" aria-hidden="true" />

          {/* Stage content */}
          <div className="hero-stage-content">
            {/* Top-left: Location Pill linking to package */}
            <div className="hero-stage-top">
              <Link
                to={`/packages/${activeDest.packageSlug}`}
                className="hero-location-pill"
                title={`Explore ${activeDest.name} Package`}
              >
                <MapPin size={13} />
                <span className="hero-loc-title">{activeDest.name}, {activeDest.country}</span>
                <span className="hero-loc-sep">·</span>
                <span className="hero-loc-price">From {activeDest.price}</span>
                <ArrowRight size={12} style={{ marginLeft: 4 }} />
              </Link>
            </div>

            {/* Center: Appealing & Refined Editorial Message */}
            <div className="hero-stage-center">
              <h1 className="hero-headline">
                <span className="hero-headline-primary">Travel Further.</span>
                <span className="hero-headline-secondary">Experience More.</span>
              </h1>
              <p className="hero-sub">
                7 handcrafted journeys across India &amp; Southeast Asia.
              </p>
            </div>

            {/* Bottom of Stage: Destination Quick-Select Bar with Scroll Controls */}
            <div className="hero-stage-bottom">
              <div className="hero-dest-selector">
                <div className="hero-dest-selector-header">
                  <span className="hero-dest-selector-label">
                    <Compass size={13} /> Explore 7 Tours:
                  </span>
                  <div className="hero-dest-arrows">
                    <button
                      type="button"
                      className="hero-strip-arrow"
                      onClick={() => scrollStrip('left')}
                      aria-label="Previous tour"
                      title="Scroll left"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      type="button"
                      className="hero-strip-arrow"
                      onClick={() => scrollStrip('right')}
                      aria-label="Next tour"
                      title="Scroll right"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                <div className="hero-dest-strip" ref={stripRef}>
                  {heroDestinations.map((dest, idx) => {
                    const isSelected = idx === activeHeroIndex;
                    return (
                      <button
                        key={dest.name}
                        type="button"
                        className={`hero-dest-tab ${isSelected ? 'active' : ''}`}
                        onClick={() => handleSelectHeroDestination(idx)}
                        title={`Select ${dest.name} (${dest.country})`}
                      >
                        <img
                          src={dest.thumbnail}
                          alt={dest.name}
                          className="hero-dest-tab-img"
                          loading="lazy"
                        />
                        <div className="hero-dest-tab-meta">
                          <span className="hero-dest-tab-name">{dest.name}</span>
                          <span className="hero-dest-tab-country">{dest.country}</span>
                        </div>
                        <span className="hero-dest-tab-badge">From {dest.price}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════ 2. Integrated Horizontal Booking & Search Console ══════ */}
        <div className="hero-search-wrap">
          <div className="search-console">
            {/* Tab navigation */}
            <div className="search-tabs">
              {tabOptions.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`search-tab ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search form */}
            <form className="search-form" onSubmit={handleSearch}>
              {/* Destination */}
              <div className="search-field destination-field">
                <label htmlFor="hero-destination">
                  <MapPin size={13} /> Destination
                </label>
                <input
                  id="hero-destination"
                  type="text"
                  placeholder="Where do you want to go?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  list="hero-dest-list"
                />
                <datalist id="hero-dest-list">
                  {trendingDestinations.map((d) => (
                    <option key={d} value={d} />
                  ))}
                </datalist>
              </div>

              <div className="search-divider" />

              {/* Date */}
              <div className="search-field date-field">
                <label htmlFor="hero-date">
                  <Calendar size={13} /> Dates
                </label>
                <input id="hero-date" type="date" />
              </div>

              <div className="search-divider" />

              {/* Travellers */}
              <div className="search-field travellers-field">
                <label htmlFor="hero-travellers">
                  <Users size={13} /> Travellers
                </label>
                <select id="hero-travellers" defaultValue="2 adults">
                  <option>2 adults</option>
                  <option>Solo traveller</option>
                  <option>Family of 4</option>
                  <option>Group 5+</option>
                </select>
              </div>

              <div className="search-divider" />

              {/* Budget */}
              <div className="search-field budget-field">
                <label htmlFor="hero-budget">
                  <Wallet size={13} /> Budget
                </label>
                <select id="hero-budget" defaultValue="Any budget">
                  <option>Any budget</option>
                  <option>Under ₹50,000</option>
                  <option>₹50,000 – ₹1,00,000</option>
                  <option>₹1,00,000 – ₹2,00,000</option>
                  <option>₹2,00,000+</option>
                </select>
              </div>

              {/* Search Submit */}
              <div className="search-submit">
                <button type="submit" className="search-btn">
                  <Search size={16} />
                  <span>{submitted ? 'Searching…' : `Search ${activeTab}`}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ══════ 3. Supporting Proof & Trust Highlights ══════ */}
        <div className="hero-footer-bar">
          <div className="hero-social-proof">
            <div className="hero-avatars">
              {[
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
                'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
              ].map((src, i) => (
                <img key={i} src={src} alt="Happy traveller" loading="lazy" />
              ))}
            </div>
            <div className="hero-proof-text">
              <div className="hero-stars">
                <Star size={13} fill="var(--amber)" color="var(--amber)" />
                <strong>4.9 / 5</strong>
              </div>
              <span>from 12,000+ travellers</span>
            </div>
          </div>

          <div className="hero-trust-list">
            {trustBadges.map((b) => (
              <div key={b.label} className="hero-trust-pill">
                <span className="hero-trust-icon">{b.icon}</span>
                <div className="hero-trust-copy">
                  <strong>{b.label}</strong>
                  <span>{b.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
