import { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Users, Wallet, ShieldCheck, Headphones, BadgeCheck, Sparkles, Star, Compass } from 'lucide-react';
import './HeroSection.css';

interface HeroDestination {
  name: string;
  country: string;
  tagline: string;
  image: string;
  thumbnail: string;
  price: string;
  rating: string;
}

const heroDestinations: HeroDestination[] = [
  {
    name: 'Bali',
    country: 'Indonesia',
    tagline: 'Emerald Terraces & Sacred Coasts',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1920&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=160&q=80',
    price: '₹68,000',
    rating: '4.9',
  },
  {
    name: 'Maldives',
    country: 'Indian Ocean',
    tagline: 'Overwater Villas & Turquoise Lagoons',
    image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1920&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=160&q=80',
    price: '₹1,20,000',
    rating: '5.0',
  },
  {
    name: 'Swiss Alps',
    country: 'Switzerland',
    tagline: 'Alpine Peaks & Panoramic Glaciers',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=160&q=80',
    price: '₹1,85,000',
    rating: '4.9',
  },
  {
    name: 'Kyoto',
    country: 'Japan',
    tagline: 'Bamboo Groves & Historic Shrines',
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1920&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=160&q=80',
    price: '₹1,45,000',
    rating: '4.8',
  },
  {
    name: 'Dubai',
    country: 'UAE',
    tagline: 'Golden Dunes & Futuristic Luxury',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=160&q=80',
    price: '₹75,000',
    rating: '4.9',
  },
];

const trendingDestinations = ['Bali', 'Dubai', 'Maldives', 'Kashmir', 'Thailand', 'Switzerland'];

const trustBadges = [
  { icon: <ShieldCheck size={16} />, label: 'Zero hidden fees', sub: 'Transparent pricing' },
  { icon: <Headphones size={16} />, label: '24/7 dedicated support', sub: 'Real planners, on call' },
  { icon: <BadgeCheck size={16} />, label: 'Flexible cancellation', sub: 'Up to 21 days prior' },
];

const tabOptions = ['Tours', 'Hotels', 'Activities'] as const;

export function HeroSection() {
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<(typeof tabOptions)[number]>('Tours');
  const [destination, setDestination] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate every 7 seconds, pausing on hover or resetting on selection
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveHeroIndex((prev) => (prev + 1) % heroDestinations.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [activeHeroIndex, isPaused]);

  const activeDest = heroDestinations[activeHeroIndex];

  const handleSelectHeroDestination = (index: number) => {
    setActiveHeroIndex(index);
    setDestination(heroDestinations[index].name);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const targetEl = document.querySelector('[data-dest-slug]') as HTMLElement;
    if (destination && targetEl) {
      const match = document.querySelector(`[data-dest-slug*="${destination.toLowerCase()}"]`) as HTMLElement;
      if (match) match.scrollIntoView({ behavior: 'smooth', block: 'center' });
      else document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' });
    }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <section className="hero" id="hero">
      <div className="container">
        {/* ── 1. Image-Led Editorial Travel Stage ── */}
        <div
          className="hero-stage"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Layered destination backdrops for smooth crossfade */}
          {heroDestinations.map((item, idx) => (
            <div
              key={item.name}
              className={`hero-backdrop ${idx === activeHeroIndex ? 'active' : ''}`}
              style={{ backgroundImage: `url(${item.image})` }}
              role="img"
              aria-label={`${item.name}, ${item.country}`}
            />
          ))}

          {/* Filmic atmospheric darkening overlay */}
          <div className="hero-stage-overlay" />

          {/* Stage inner content */}
          <div className="hero-stage-inner">
            {/* Top Bar: Eyebrow + Live Location Badge */}
            <div className="hero-stage-top">
              <span className="hero-eyebrow">
                <Sparkles size={13} />
                Handcrafted Journeys & Stays
              </span>

              <div className="hero-location-pill">
                <MapPin size={13} />
                <span className="hero-loc-title">{activeDest.name}, {activeDest.country}</span>
                <span className="hero-loc-sep">•</span>
                <span className="hero-loc-price">From {activeDest.price}</span>
              </div>
            </div>

            {/* Center: Main Editorial Message */}
            <div className="hero-stage-center">
              <h1 className="hero-headline">
                Travel Further.<br />
                <em>Experience More.</em>
              </h1>
              <p className="hero-sub">
                Curated itineraries and boutique stays across the world’s most inspiring destinations.
              </p>
            </div>

            {/* Bottom of Stage: Destination Quick-Select Bar */}
            <div className="hero-stage-bottom">
              <div className="hero-dest-selector">
                <span className="hero-dest-selector-label">
                  <Compass size={13} /> Explore Destinations:
                </span>
                <div className="hero-dest-strip">
                  {heroDestinations.map((dest, idx) => {
                    const isSelected = idx === activeHeroIndex;
                    return (
                      <button
                        key={dest.name}
                        type="button"
                        className={`hero-dest-tab ${isSelected ? 'active' : ''}`}
                        onClick={() => handleSelectHeroDestination(idx)}
                        title={`View ${dest.name}, ${dest.country}`}
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
                        <span className="hero-dest-tab-badge">{dest.price}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 2. Integrated Horizontal Booking & Search Console ── */}
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

        {/* ── 3. Supporting Proof & Trust Highlights ── */}
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
