import { useParams, Navigate } from 'react-router-dom';
import { getAllStates, getCityBySlug } from '../data/locations';
import { StateLocations } from './StateLocations';
import { LocationDetail } from './LocationDetail';

/**
 * Resolver for single-segment location paths like /locations/:slug
 * Seamlessly resolves whether :slug is a State (e.g. /locations/uttar-pradesh)
 * or a legacy direct city URL (e.g. /locations/noida -> 301/replace to /locations/uttar-pradesh/noida)
 */
export function LocationRouteResolver() {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) return <Navigate to="/locations" replace />;

  const isState = getAllStates().some((s) => s.slug === slug);
  if (isState) {
    return <StateLocations />;
  }

  const city = getCityBySlug(slug);
  if (city) {
    if (city.stateSlug) {
      return <Navigate to={`/locations/${city.stateSlug}/${city.slug}`} replace />;
    }
    return <LocationDetail />;
  }

  return <Navigate to="/locations" replace />;
}
