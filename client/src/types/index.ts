export interface DestinationHighlight {
  title: string;
  description: string;
  icon: string;
}

export interface DestinationTravelInfo {
  idealFor: string[];
  bestSeason: string;
  climate: string;
  currency: string;
  language: string;
  timezone: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  region: string;
  description: string;
  longDescription: string;
  image: string;
  heroImage: string;
  gallery: string[];
  slug: string;
  rating: number;
  startingPrice: string;
  duration: string;
  badge?: 'trending' | 'new' | 'bestseller';
  highlights: DestinationHighlight[];
  whyVisit: string[];
  bestTime: string;
  travelInfo: DestinationTravelInfo;
  relatedPackageSlugs: string[];
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface TravelPackage {
  id: string;
  slug: string;
  title: string;
  destination: string;
  country: string;
  duration: string;
  nights: number;
  type: string;
  description: string;
  longDescription: string;
  price: string;
  image: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  badge?: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  includes: string[];
  excludes: string[];
  faqs: FAQ[];
  destinationSlug: string;
}

export interface ExperienceActivity {
  title: string;
  description: string;
  image: string;
}

export interface Experience {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  heroImage: string;
  icon: string;
  count: string;
  activities: ExperienceActivity[];
  recommendedDestinationSlugs: string[];
  recommendedPackageSlugs: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  trip: string;
  text: string;
  rating: number;
  avatar: string;
  date: string;
}

export interface EnquiryPayload {
  name: string;
  email: string;
  phone: string;
  destination: string;
  travelDates: string;
  travellers: string;
  travelStyle?: string;
  budget?: string;
  accommodation?: string;
  message: string;
}

export interface TrustStat {
  value: string;
  label: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
}
