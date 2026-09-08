import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar, Users, Wallet, ShieldCheck, Headphones, BadgeCheck, Sparkles, ArrowRight, Star } from 'lucide-react';
import './HeroSection.css';

const trendingDestinations = ['Bali', 'Dubai', 'Maldives', 'Kashmir', 'Thailand', 'Switzerland'];

const trustBadges = [
  { icon: <ShieldCheck size={18} />, label: 'Zero hidden fees', sub: 'Transparent pricing' },
  { icon: <Headphones size={18} />, label: '24/7 support', sub: 'Real humans, on call' },
  { icon: <BadgeCheck size={18} />, label: 'Free cancellation', sub: 'Up to 21 days prior' },
];

const tabOptions = ['Tours', 'Hotels', 'Activities'] as const;

export function HeroSection() {
  const [activeTab, setActiveTab] = useState<(typeof tabOptions)[number]>('Tours');
  const [destination, setDestination] = useState('');
  const [submitted, setSubmitted] = useState(false);

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
        <div className="hero-grid">
          {/* Left: Text + Search */}
          <div className="hero-content" data-reveal>
            <span className="hero-eyebrow">
              <Sparkles size={13} />
              2,300+ trips booked this season
            </span>

            <h1 className="hero-headline">
              Travel Further.<br />
              <em>Experience More.</em>
            </h1>

            <p className="hero-sub">
              Compare handpicked packages, see real prices, and book with planners who answer their phones.
            </p>

            {/* Trust Badges */}
            <div className="hero-trust">
              {trustBadges.map((b) => (
                <div key={b.label} className="hero-trust-item">
                  <span className="hero-trust-icon">{b.icon}</span>
                  <div>
                    <b>{b.label}</b>
                    <span>{b.sub}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Trending chips */}
            <div className="hero-trending">
              <span className="hero-trending-label">
                <Star size={12} fill="currentColor" /> Trending:
              </span>
              {trendingDestinations.map((d) => (
                <button
                  key={d}
                  className="hero-chip"
                  onClick={() => {
                    setDestination(d);
                    document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Search Panel */}
          <div className="hero-panel" data-reveal data-reveal-delay="2">
            {/* Tabs */}
            <div className="panel-tabs">
              {tabOptions.map((tab) => (
                <button
                  key={tab}
                  className={`panel-tab ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Fields */}
            <form className="panel-form" onSubmit={handleSearch}>
              <div className="panel-field wide">
                <label htmlFor="hero-destination">
                  <MapPin size={12} /> Destination
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
                  {trendingDestinations.map((d) => <option key={d} value={d} />)}
                </datalist>
              </div>

              <div className="panel-field">
                <label htmlFor="hero-date">
                  <Calendar size={12} /> Departure Date
                </label>
                <input id="hero-date" type="date" />
              </div>

              <div className="panel-field">
                <label htmlFor="hero-travellers">
                  <Users size={12} /> Travellers
                </label>
                <select id="hero-travellers">
                  <option>2 adults</option>
                  <option>Solo traveller</option>
                  <option>Family of 4</option>
                  <option>Group 5+</option>
                </select>
              </div>

              <div className="panel-field wide">
                <label htmlFor="hero-budget">
                  <Wallet size={12} /> Budget per person
                </label>
                <select id="hero-budget">
                  <option>Any budget</option>
                  <option>Under ₹50,000</option>
                  <option>₹50,000 – ₹1,00,000</option>
                  <option>₹1,00,000 – ₹2,00,000</option>
                  <option>₹2,00,000+</option>
                </select>
              </div>

              <div className="panel-submit">
                <button type="submit" className="panel-search-btn">
                  <Search size={17} />
                  {submitted ? 'Searching…' : `Search ${activeTab}`}
                </button>
              </div>
            </form>

            {/* Floating stat card */}
            <div className="panel-stat">
              <div className="panel-stat-rating">
                <Star size={14} fill="var(--amber)" color="var(--amber)" />
                <strong>4.9</strong>
              </div>
              <span>Loved by 12,000+ travellers</span>
              <div className="panel-stat-avatars">
                {[
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
                  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
                ].map((src, i) => (
                  <img key={i} src={src} alt="Happy traveller" loading="lazy" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hero image strip below */}
        <div className="hero-images" data-reveal data-reveal-delay="3">
          {[
            { src: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80', label: 'Bali' },
            { src: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80', label: 'Dubai' },
            { src: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=600&q=80', label: 'Maldives' },
            { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80', label: 'Swiss Alps' },
          ].map((img) => (
            <div key={img.label} className="hero-image-item">
              <img src={img.src} alt={img.label} loading="lazy" />
              <span className="hero-image-label">{img.label}</span>
            </div>
          ))}
          <Link to="/destinations" className="hero-view-all">
            View all <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
