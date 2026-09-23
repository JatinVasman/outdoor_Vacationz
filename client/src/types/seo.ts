export interface AuthorProfile {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  expertise: string[];
  yearsExperience: number;
  destinationsCovered: string[];
  contactEmail?: string;
  linkedinUrl?: string;
}

export type SearchIntentType = 'Informational' | 'Commercial' | 'Transactional' | 'Navigational';
export type PriorityLevel = 'P0' | 'P1' | 'P2' | 'P3';
export type ContentStatus =
  | 'IDEA'
  | 'RESEARCH'
  | 'DRAFT'
  | 'REVIEW'
  | 'READY'
  | 'PUBLISHED'
  | 'UPDATE_REQUIRED'
  | 'NOINDEX'
  | 'ARCHIVED';

export interface TopicCluster {
  id: string;
  name: string;
  slug: string;
  description: string;
  pillarTitle: string;
  pillarUrl: string;
  targetKeywordCount: number;
}

export interface EditorialRoadmapItem {
  id: string;
  title: string;
  primaryTopic: string;
  searchIntent: SearchIntentType;
  targetAudience: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  destination: string;
  cluster: string;
  parentPillar: string;
  relatedPackageSlug?: string;
  relatedLocationSlugs?: string[];
  suggestedUrl: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  internalLinks: string[];
  externalReferenceOpportunities: string[];
  freshnessRequirement: 'Monthly' | 'Quarterly' | 'Bi-Annual' | 'Annual' | 'Evergreen';
  priority: PriorityLevel;
  status: ContentStatus;
}

export interface TravelGuideFAQ {
  question: string;
  answer: string;
}

export interface TravelGuideSection {
  heading: string;
  subheading?: string;
  body: string[];
  tableData?: {
    headers: string[];
    rows: string[][];
  };
  tipBox?: string;
}

export interface TravelGuideArticle {
  id: string;
  slug: string;
  title: string;
  h1: string;
  excerpt: string;
  coverImage: string;
  authorId: string;
  reviewerId: string;
  publishedDate: string;
  updatedDate: string;
  readingTime: string;
  destination: string;
  cluster: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  relatedPackageSlugs: string[];
  relatedGuideSlugs: string[];
  relatedCitySlugs: string[];
  faqs: TravelGuideFAQ[];
  sections: TravelGuideSection[];
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  isFeatured?: boolean;
  status: ContentStatus;
  category?: string;
  indexable?: boolean;
  featuredImage?: string;
  imageAlt?: string;
  subregion?: string;
  content?: string;
  canonical?: string;
}

export interface FlightConnectionInfo {
  direct: boolean;
  flightTime: string;
  airlineExamples: string[];
  routeNotes: string;
}

export interface CityLocation {
  slug: string;
  name: string;
  state: string;
  stateSlug?: string;
  region: 'North India' | 'South India' | 'West India' | 'East & North-East' | 'Central India' | string;
  tier: string;
  populationCategory?: string;
  airportCode: string;
  airportName: string;
  hasInternationalFlights?: boolean;
  majorRailwayStations: string[];
  flightConnections?: {
    kerala?: FlightConnectionInfo;
    vietnam?: FlightConnectionInfo;
    singapore?: FlightConnectionInfo;
    malaysia?: FlightConnectionInfo;
    northEast?: FlightConnectionInfo;
  };
  suggestedPackageSlugs?: string[];
  localDepartureAdvice?: string;
  localFAQs: TravelGuideFAQ[];
  metaTitle: string;
  metaDescription: string;
  indexabilityStatus: 'INDEX' | 'REVIEW' | 'NOINDEX';
  whyBookFromCity?: string[];
  introCopy: string;
  canonical?: string;
  relevantTravelServices?: string[];
  nearbyDestinations?: string[];
  relevantTourCategories?: string[];
  contentStatus?: ContentStatus;
  relatedDestinations?: string[];
  relatedPackages?: string[];
  relatedBlogs?: string[];
}

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: 'website' | 'article' | 'product';
  twitterCard?: 'summary' | 'summary_large_image';
  robots?: string;
  jsonLd?: Record<string, any> | Array<Record<string, any>>;
}
