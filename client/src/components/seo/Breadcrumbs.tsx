import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import type { BreadcrumbItem } from '../../types/seo';
import './Breadcrumbs.css';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems: BreadcrumbItem[] = [{ label: 'Home', url: '/' }, ...items];

  return (
    <nav className="breadcrumbs-nav" aria-label="Breadcrumb">
      <div className="container">
        <ol className="breadcrumbs-list" itemScope itemType="https://schema.org/BreadcrumbList">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            return (
              <li
                key={index}
                className={`breadcrumb-item ${isLast ? 'active' : ''}`}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {index === 0 ? (
                  <Link to={item.url || '/'} className="breadcrumb-link" itemProp="item">
                    <Home size={14} className="breadcrumb-home-icon" />
                    <span itemProp="name" className="sr-only">Home</span>
                  </Link>
                ) : item.url && !isLast ? (
                  <Link to={item.url} className="breadcrumb-link" itemProp="item">
                    <span itemProp="name">{item.label}</span>
                  </Link>
                ) : (
                  <span className="breadcrumb-current" itemProp="name" aria-current="page">
                    {item.label}
                  </span>
                )}
                <meta itemProp="position" content={String(index + 1)} />
                {!isLast && <ChevronRight size={13} className="breadcrumb-separator" aria-hidden="true" />}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
