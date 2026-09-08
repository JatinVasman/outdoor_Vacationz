import { Link } from 'react-router-dom';
import { Star, MapPin, ArrowRight, Flame, TrendingUp, Sparkles, Calendar, Compass } from 'lucide-react';
import type { Destination } from '../../types';
import './DestinationCard.css';

interface Props {
  destination: Destination;
  featured?: boolean;
}

const badgeConfig = {
  trending: { label: 'Trending', icon: <TrendingUp size={12} />, className: 'badge-new' },
  new: { label: 'New', icon: <Sparkles size={12} />, className: 'badge-new' },
  bestseller: { label: 'Bestseller', icon: <Flame size={12} />, className: 'badge-hot' },
};

export function DestinationCard({ destination, featured = false }: Props) {
  const badge = destination.badge ? badgeConfig[destination.badge] : null;

  if (featured) {
    return (
      <article
        className="dest-card dest-card-featured"
        data-dest-slug={destination.slug}
        data-reveal
      >
        <div className="dest-card-image dest-featured-image">
          <img
            src={destination.heroImage || destination.image}
            alt={destination.name}
            loading="lazy"
          />
          {badge && (
            <span className={`dest-badge ${badge.className}`}>
              {badge.icon} {badge.label}
            </span>
          )}
          <span className="dest-rating">
            <Star size={13} fill="var(--amber)" color="var(--amber)" />
            {destination.rating}
          </span>
        </div>

        <div className="dest-card-body dest-featured-body">
          <div>
            <div className="dest-featured-eyebrow">
              <span className="dest-spotlight-tag">✦ Spotlight Destination</span>
              <span className="dest-location">
                <MapPin size={13} /> {destination.country}
              </span>
            </div>

            <h3 className="dest-name dest-featured-name">{destination.name}</h3>
            <p className="dest-desc dest-featured-desc">{destination.description}</p>

            {destination.highlights && destination.highlights.length > 0 && (
              <div className="dest-featured-highlights">
                <span className="dest-highlights-label">Key Highlights</span>
                <div className="dest-highlights-chips">
                  {destination.highlights.slice(0, 3).map((h, i) => (
                    <span key={i} className="dest-highlight-chip">
                      {h.title}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {destination.travelInfo && (
              <div className="dest-featured-meta">
                <span className="dest-meta-item">
                  <Calendar size={13} /> {destination.duration}
                </span>
                <span className="dest-meta-item">
                  <Compass size={13} /> Best: {destination.travelInfo.bestSeason}
                </span>
              </div>
            )}
          </div>

          <div className="dest-footer dest-featured-footer">
            <div className="dest-price">
              <small>Starting from</small>
              <strong>{destination.startingPrice}</strong>
              <span>/ person</span>
            </div>
            <Link to={`/destinations/${destination.slug}`} className="dest-featured-cta">
              Explore {destination.name} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className="dest-card"
      data-dest-slug={destination.slug}
      data-reveal
    >
      <div className="dest-card-image">
        <img
          src={destination.image}
          alt={destination.name}
          loading="lazy"
        />
        {badge && (
          <span className={`dest-badge ${badge.className}`}>
            {badge.icon} {badge.label}
          </span>
        )}
        <span className="dest-rating">
          <Star size={12} fill="var(--amber)" color="var(--amber)" />
          {destination.rating}
        </span>
      </div>

      <div className="dest-card-body">
        <span className="dest-location">
          <MapPin size={12} /> {destination.country}
        </span>
        <h3 className="dest-name">{destination.name}</h3>
        <div className="dest-footer">
          <div className="dest-price">
            <small>from</small>
            <strong>{destination.startingPrice}</strong>
            <span>· {destination.duration}</span>
          </div>
          <Link to={`/destinations/${destination.slug}`} className="dest-cta">
            Explore <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </article>
  );
}
