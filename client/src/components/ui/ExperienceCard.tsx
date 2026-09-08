import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Experience } from '../../types';
import './ExperienceCard.css';

interface Props {
  experience: Experience;
  index: number;
}

// Simple color palettes for each card
const cardColors = [
  { bg: '#e8f3f0', accent: 'var(--teal)' },
  { bg: '#fef3c7', accent: '#92400e' },
  { bg: '#fce7f3', accent: '#9d174d' },
  { bg: '#e0f2fe', accent: '#0369a1' },
  { bg: '#fff7ed', accent: '#c2410c' },
  { bg: '#f0fdf4', accent: '#15803d' },
  { bg: '#faf5ff', accent: '#7e22ce' },
  { bg: '#fff1f2', accent: '#be123c' },
];

export function ExperienceCard({ experience, index }: Props) {
  const colors = cardColors[index % cardColors.length];

  return (
    <article
      className="exp-card"
      data-reveal
      style={{ '--exp-bg': colors.bg, '--exp-accent': colors.accent } as React.CSSProperties}
    >
      <div className="exp-card-image">
        <img src={experience.image} alt={experience.title} loading="lazy" />
        <div className="exp-card-overlay" />
        <div className="exp-card-content">
          <span className="exp-count">{experience.count}</span>
          <h3 className="exp-title">{experience.title}</h3>
          <p className="exp-desc">{experience.description}</p>
          <Link to={`/experiences/${experience.slug}`} className="exp-cta">
            Explore <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </article>
  );
}
