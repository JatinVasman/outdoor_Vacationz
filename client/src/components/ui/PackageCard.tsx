import { Link } from 'react-router-dom';
import { Star, Calendar, MapPin, ArrowRight } from 'lucide-react';
import type { TravelPackage } from '../../types';
import './PackageCard.css';

interface Props {
  pkg: TravelPackage;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="pkg-stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          fill={i < Math.floor(rating) ? 'var(--amber)' : 'none'}
          color={i < Math.floor(rating) ? 'var(--amber)' : 'var(--line)'}
        />
      ))}
      <span>{rating}</span>
    </div>
  );
}

export function PackageCard({ pkg }: Props) {
  return (
    <article className="pkg-card" data-reveal>
      <div className="pkg-image">
        <img src={pkg.image} alt={pkg.title} loading="lazy" />
        {pkg.badge && <span className="pkg-badge">{pkg.badge}</span>}
        <span className="pkg-type-tag">{pkg.type}</span>
      </div>

      <div className="pkg-body">
        <div className="pkg-header">
          <div>
            <span className="pkg-destination">
              <MapPin size={12} /> {pkg.destination}, {pkg.country}
            </span>
            <h3 className="pkg-title">{pkg.title}</h3>
          </div>
          {pkg.badge && (
            <span className="pkg-badge-pill">{pkg.badge}</span>
          )}
        </div>

        <p className="pkg-desc">{pkg.description}</p>

        <ul className="pkg-highlights">
          {pkg.highlights.map((h) => (
            <li key={h}>
              <span className="pkg-highlight-dot" />
              {h}
            </li>
          ))}
        </ul>

        <div className="pkg-meta">
          <span className="pkg-meta-item">
            <Calendar size={13} /> {pkg.duration}
          </span>
        </div>

        <div className="pkg-footer">
          <div>
            <StarRating rating={pkg.rating} />
            <span className="pkg-review-count">{pkg.reviewCount} reviews</span>
          </div>
          <div className="pkg-price-area">
            <div className="pkg-price">
              <small>from</small>
              <strong>{pkg.price}</strong>
            </div>
            <Link to={`/packages/${pkg.slug}`} className="pkg-book-btn">
            View Journey <ArrowRight size={13} />
          </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
