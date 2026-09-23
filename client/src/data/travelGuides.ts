import type { TravelGuideArticle } from '../types/seo';
import rawGuides from './travelGuidesDatabase.json';

export const travelGuides: TravelGuideArticle[] = rawGuides as unknown as TravelGuideArticle[];

export function getTravelGuideBySlug(slug: string): TravelGuideArticle | undefined {
  return travelGuides.find((g) => g.slug === slug);
}

export function getFeaturedTravelGuides(): TravelGuideArticle[] {
  return travelGuides.filter((g) => g.isFeatured || g.status === 'PUBLISHED').slice(0, 6);
}

export function getTravelGuidesByDestination(destination: string): TravelGuideArticle[] {
  const q = destination.toLowerCase();
  return travelGuides.filter((g) =>
    g.destination.toLowerCase().includes(q) ||
    g.title.toLowerCase().includes(q) ||
    g.cluster.toLowerCase().includes(q)
  );
}

export function getTravelGuidesByCategory(category: string): TravelGuideArticle[] {
  if (category === 'All') return travelGuides;
  return travelGuides.filter((g) => (g.category || '').toLowerCase() === category.toLowerCase());
}

export function getIndexableGuides(): TravelGuideArticle[] {
  return travelGuides.filter((g) => g.indexable !== false && (g.status === 'PUBLISHED' || g.status === 'READY'));
}
