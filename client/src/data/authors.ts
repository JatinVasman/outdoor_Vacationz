import type { AuthorProfile } from '../types/seo';

export const authors: AuthorProfile[] = [
  {
    id: 'editorial-desk',
    name: 'Outdoor Vacationz Editorial Desk',
    role: 'Destination Research & Verified Travel Itineraries',
    bio: 'The Outdoor Vacationz Editorial Desk curates verified travel itineraries, ground transit logistics, and seasonal advisories across India and Southeast Asia. Every itinerary is planned with door-to-destination private transfers and verified hotels.',
    avatar: '/images/favicon.svg',
    expertise: ['Itinerary Verification', 'Flight Logistics', 'Private Sightseeing Transfers', 'Seasonal Timing'],
    yearsExperience: 10,
    destinationsCovered: ['Kerala', 'Vietnam', 'Singapore', 'Malaysia', 'North East'],
    contactEmail: 'contact.outdoorvacationz@gmail.com',
  },
];

export function getAuthorById(_id?: string): AuthorProfile {
  return authors[0];
}
