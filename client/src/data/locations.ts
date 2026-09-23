import type { CityLocation } from '../types/seo';
import rawCities from './indiaCityDatabase.json';

export const citiesDatabase: CityLocation[] = (rawCities as any[]).map((c) => ({
  slug: c.slug,
  name: c.city || c.name,
  state: c.state,
  stateSlug: c.stateSlug || c.state.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  region: c.region,
  tier: c.tier,
  populationCategory: c.populationCategory || (c.tier.includes('Tier 1') ? 'Metropolitan Hub' : (c.tier.includes('Tier 2') ? 'Urban Center (1M–3M)' : 'Regional Center (<1M)')),
  airportCode: c.airport?.code || c.airportCode || 'DEL',
  airportName: c.airport?.name || c.airportName || 'Commercial Airport',
  hasInternationalFlights: Boolean(c.airport?.hasDirectInternational || c.hasInternationalFlights),
  majorRailwayStations: c.railway || c.majorRailwayStations || [`${c.city || c.name} Railway Station`],
  flightConnections: c.flightConnections || {
    kerala: {
      direct: ['DEL', 'BOM', 'BLR', 'MAA', 'HYD', 'CCU', 'AMD', 'PNQ', 'COK'].includes(c.airport?.code || c.airportCode),
      flightTime: '2 to 3 hrs flight to Cochin (COK)',
      airlineExamples: ['IndiGo', 'Air India', 'SpiceJet'],
      routeNotes: `Fast morning departures connect into Cochin Airport (COK) for same-day scenic road transfers to Munnar tea plantations.`,
    },
    vietnam: {
      direct: ['DEL', 'BOM', 'CCU', 'AMD', 'COK', 'BLR'].includes(c.airport?.code || c.airportCode),
      flightTime: '3 to 5 hrs flight to Hanoi / Da Nang',
      airlineExamples: ['VietJet Air', 'Vietnam Airlines'],
      routeNotes: `Direct or 1-stop connections landing in Hanoi (HAN) or Da Nang (DAD) for Halong Bay cruises and Ba Na Hills Golden Bridge tours.`,
    },
    singapore: {
      direct: ['DEL', 'BOM', 'BLR', 'MAA', 'HYD', 'CCU', 'COK', 'TRZ', 'AMD'].includes(c.airport?.code || c.airportCode),
      flightTime: '4 to 5.5 hrs flight to Changi',
      airlineExamples: ['Singapore Airlines', 'Air India', 'Scoot'],
      routeNotes: `Daily flights to Changi Airport (SIN) connecting to Sentosa, Universal Studios, and Genting Dream Cruise.`,
    },
    malaysia: {
      direct: ['DEL', 'BOM', 'BLR', 'MAA', 'HYD', 'CCU', 'COK', 'TRZ'].includes(c.airport?.code || c.airportCode),
      flightTime: '3.5 to 5 hrs flight to Kuala Lumpur',
      airlineExamples: ['Malaysia Airlines', 'AirAsia', 'Batik Air'],
      routeNotes: `Direct flights into KLIA with seamless domestic connecting hops to Langkawi (LGK).`,
    },
    northEast: {
      direct: ['DEL', 'BOM', 'BLR', 'CCU', 'HYD'].includes(c.airport?.code || c.airportCode),
      flightTime: '1 to 3 hrs flight to Guwahati (GAU)',
      airlineExamples: ['IndiGo', 'Air India'],
      routeNotes: `Morning flights to Guwahati Airport (GAU) with private vehicle escort along Umiam Lake to Shillong and Cherrapunji.`,
    },
  },
  suggestedPackageSlugs: c.relatedPackages || ['kerala', 'vietnam', 'singapore-cruise', 'malaysia-kuala-lumpur-langkawi', 'north-east'],
  localDepartureAdvice: c.travelPlanningInfo || `From ${c.city || c.name}, travelers can depart via ${c.airport?.code || c.airportCode} with daily direct or one-stop connections. Our travel concierge coordinates private airport pickups upon arrival.`,
  localFAQs: c.localFAQs || [
    {
      question: `Are flights from ${c.city || c.name} included in the package?`,
      answer: `All base package prices include land arrangements (hotels, private vehicle throughout, breakfasts, and sightseeing passes). Our airfare desk can bundle group-rate flight tickets departing ${c.airport?.code || c.airportCode} upon request.`,
    },
    {
      question: `Which international holiday is easiest to reach from ${c.city || c.name}?`,
      answer: `Vietnam, Singapore, and Malaysia offer exceptionally fast flight connections with pre-approved e-visa and visa-free travel arrangements for Indian passport holders.`,
    },
  ],
  metaTitle: c.seoTitle || `Holiday Packages from ${c.city || c.name} | Outdoor Vacationz`,
  metaDescription: c.seoDescription || `Discover curated holiday packages from ${c.city || c.name}. Seamless flight connections to Kerala, Vietnam, Singapore, and Malaysia with private tours.`,
  indexabilityStatus: c.indexability || 'REVIEW',
  whyBookFromCity: c.relevantTravelServices || [
    `Dedicated departure coordination from ${c.city || c.name}`,
    'Doorstep-to-destination private cab arrangements',
    'Transparent pricing with zero hidden surcharges',
  ],
  introCopy: c.description || `Travelers from ${c.city || c.name} enjoy seamless connectivity to Outdoor Vacationz handcrafted holiday packages across India and Southeast Asia.`,
  canonical: c.canonical || `/locations/${c.stateSlug || 'india'}/${c.slug}`,
  relevantTravelServices: c.relevantTravelServices,
  nearbyDestinations: c.nearbyDestinations,
  relevantTourCategories: c.relevantTourCategories,
  contentStatus: c.contentStatus,
  relatedDestinations: c.relatedDestinations,
  relatedPackages: c.relatedPackages,
  relatedBlogs: c.relatedBlogs,
}));

export function getCityBySlug(slug: string): CityLocation | undefined {
  return citiesDatabase.find((c) => c.slug === slug);
}

export function getCitiesByState(stateSlug: string): CityLocation[] {
  return citiesDatabase.filter((c) => c.stateSlug === stateSlug);
}

export function getIndexableCities(): CityLocation[] {
  return citiesDatabase.filter((c) => c.indexabilityStatus === 'INDEX');
}

export interface StateSummary {
  name: string;
  slug: string;
  region: string;
  cityCount: number;
  indexableCityCount: number;
  sampleCities: string[];
}

export function getAllStates(): StateSummary[] {
  const map: Record<string, { name: string; region: string; cities: CityLocation[] }> = {};

  citiesDatabase.forEach((c) => {
    const sSlug = c.stateSlug || 'other';
    if (!map[sSlug]) {
      map[sSlug] = {
        name: c.state,
        region: c.region,
        cities: [],
      };
    }
    map[sSlug].cities.push(c);
  });

  return Object.entries(map).map(([slug, data]) => ({
    name: data.name,
    slug,
    region: data.region,
    cityCount: data.cities.length,
    indexableCityCount: data.cities.filter((c) => c.indexabilityStatus === 'INDEX').length,
    sampleCities: data.cities.slice(0, 5).map((c) => c.name),
  })).sort((a, b) => b.cityCount - a.cityCount);
}
