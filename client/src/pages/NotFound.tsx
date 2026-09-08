import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';
import './NotFound.css';

export function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-card">
        <div className="not-found-icon">
          <Compass size={52} strokeWidth={1.5} />
        </div>
        <h1 className="not-found-title">Lost in transit?</h1>
        <p className="not-found-subtitle">
          Looks like this journey took a wrong turn. The page you're looking for doesn't exist or may have moved.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn-primary-dark">
            Back to Home <ArrowRight size={14} />
          </Link>
          <Link to="/destinations" className="btn-secondary-dark">
            Explore Destinations
          </Link>
        </div>
      </div>
    </div>
  );
}
