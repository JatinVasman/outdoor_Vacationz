import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './PageHero.css';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface Props {
  image: string;
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  overlay?: 'dark' | 'teal' | 'medium';
  align?: 'left' | 'center';
  badge?: string;
  meta?: React.ReactNode;
  children?: React.ReactNode;
}

export function PageHero({
  image,
  title,
  subtitle,
  breadcrumbs,
  overlay = 'dark',
  align = 'left',
  badge,
  meta,
  children,
}: Props) {
  return (
    <div className={`page-hero page-hero--${overlay}`}>
      <img src={image} alt={title} loading="eager" />
      <div className={`page-hero-overlay page-hero-content page-hero-content--${align}`}>
        <div className="container">
          {breadcrumbs && (
            <nav className="page-hero-breadcrumb" aria-label="Breadcrumb">
              {breadcrumbs.map((b, i) => (
                <span key={b.label} className="page-hero-breadcrumb-item">
                  {i > 0 && <ChevronRight size={13} />}
                  {b.href ? (
                    <Link to={b.href}>{b.label}</Link>
                  ) : (
                    <span>{b.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}
          {badge && <span className="page-hero-badge">{badge}</span>}
          <h1 className="page-hero-title">{title}</h1>
          {subtitle && <p className="page-hero-subtitle">{subtitle}</p>}
          {meta && <div className="page-hero-meta">{meta}</div>}
          {children}
        </div>
      </div>
    </div>
  );
}
