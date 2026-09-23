const fs = require('fs');
const path = require('path');

const clusters = [
  {
    clusterId: 'kerala',
    clusterName: 'Kerala Travel Cluster',
    pillar: 'Complete Kerala Travel Guide & Itinerary Planner',
    destination: 'Kerala',
    packageSlug: 'kerala',
    subtopics: [
      { prefix: 'Kerala Itinerary', intents: ['5-day Munnar and Thekkady route', '7-day classic backwaters and tea hills', '10-day slow travel circuit', '3-day weekend Munnar road trip', 'Kerala family holiday schedule', 'Kerala senior citizen relaxed plan'] },
      { prefix: 'Best Time to Visit Kerala', intents: ['monsoon season ayurveda and rain guide', 'winter weather Munnar temperature guide', 'summer holiday hill station escape', 'month by month climate breakdown', 'Onam festival travel dates and boat races'] },
      { prefix: 'Munnar Travel Guide', intents: ['tea estate photography spots', 'Eravikulam National Park Nilgiri Tahr safari', 'Mattupetty Dam boating and Echo point', 'top 10 trekking trails in Munnar', 'choosing between tea plantation resorts vs town stays'] },
      { prefix: 'Thekkady & Periyar', intents: ['Periyar Tiger Reserve boat safari timings and booking', 'bamboo rafting and jungle patrol trekking', 'spice plantation guided tour and buying genuine cardamom', 'elephant sanctuary ethical visits', 'Kalaripayattu martial arts show booking'] },
      { prefix: 'Fort Kochi Heritage', intents: ['Jewish Synagogue and Mattancherry Dutch Palace walk', 'Chinese fishing nets sunset photography spots', 'Fort Kochi boutique heritage cafes and art galleries', 'St Francis Church history and Vasco da Gama', 'Kathakali dance performance evening tickets'] },
      { prefix: 'Alleppey & Backwaters', intents: ['houseboat vs shikara boat comparison', 'overnight houseboat costs and meal inclusions', 'kayaking through narrow village canals', 'kumarakom vs alleppey backwaters difference', 'nehrutrophy boat race dates and viewing stands'] },
      { prefix: 'Kerala Food & Culture', intents: ['traditional sadhya feast 28 dishes explained', 'malabar parotta and fish curry food trail', 'spice trading history of Calicut and Cochin', 'ayurvedic wellness treatments and authentic vaidyashalas', 'theyyam ritual performances in North Kerala'] },
      { prefix: 'Kerala Logistics & Budget', intents: ['Cochin airport to Munnar private taxi cost', 'Kerala trip budget breakdown for couples and families', 'train vs flight travel to Kerala from Delhi Mumbai', 'packing essentials for Kerala monsoon and hill stations', 'safe drinking water and local transportation tips'] }
    ]
  },
  {
    clusterId: 'vietnam',
    clusterName: 'Vietnam Travel Cluster',
    pillar: 'Vietnam Ultimate Travel Guide: North to Central Route',
    destination: 'Vietnam',
    packageSlug: 'vietnam',
    subtopics: [
      { prefix: 'Vietnam Itinerary', intents: ['5-day Hanoi Halong Bay and Da Nang route', '7-day classic North and Central circuit', '10-day slow Vietnam cultural journey', 'first timer 6-day Vietnam essential planner', 'couples romantic Vietnam escape', 'family vacation in Ba Na Hills and Hoi An'] },
      { prefix: 'Halong Bay Cruises', intents: ['overnight luxury cruise vs day trip from Hanoi', 'Halong Bay vs Lan Ha Bay cruise comparison', 'kayaking in Luon Cave and Ti Top Island hike', 'seaplane scenic flight over limestone karsts', 'what to pack for Halong Bay cruise'] },
      { prefix: 'Hanoi City Guide', intents: ['Old Quarter street food walking tour egg coffee and pho', 'Train Street safety guidelines and viewing cafes', 'Hoan Kiem Lake weekend walking street atmosphere', 'French Quarter architecture and Opera House', 'Water Puppet Theatre tickets and show timings'] },
      { prefix: 'Da Nang & Golden Bridge', intents: ['Ba Na Hills cable car and Golden Bridge photography guide', 'Marble Mountains caves and Buddhist pagodas', 'Dragon Bridge weekend fire breathing show timings', 'My Khe Beach water sports and seaside dining', 'day trip from Da Nang to Son Tra peninsula monkey mountain'] },
      { prefix: 'Hoi An Ancient Town', intents: ['lantern boat ride on Thu Bon river evening', 'custom tailoring guide in Hoi An turnaround and fabrics', 'bicycle ride through Cam Thanh coconut palm forest', 'An Bang Beach relaxing and seaside cafes', 'Japanese Covered Bridge heritage and history'] },
      { prefix: 'Vietnam Travel Logistics', intents: ['Indian passport e-visa application process and approval time', 'Vietnam dong currency exchange and ATM withdrawal tips', 'best eSIM and SIM card options at Hanoi and Da Nang airports', 'Grab app usage vs traditional taxis in Vietnam', 'tipping etiquette and cultural norms in Vietnam'] },
      { prefix: 'Best Time to Visit Vietnam', intents: ['weather differences between North Central and South Vietnam', 'Halong Bay winter mist vs summer blue skies', 'Central Vietnam typhoon season months to avoid', 'Tet Lunar New Year travel impact on shops and transport'] }
    ]
  },
  {
    clusterId: 'singapore',
    clusterName: 'Singapore Travel Cluster',
    pillar: 'Singapore Travel Guide: City in Nature & Island Thrills',
    destination: 'Singapore',
    packageSlug: 'singapore',
    subtopics: [
      { prefix: 'Singapore Itinerary', intents: ['4-day family friendly action packed schedule', '5-day luxury city and cruise experience', '3-day stopover essential highlights guide', 'budget traveler Singapore 4-day plan', 'honeymoon itinerary romantic dining and skyline views'] },
      { prefix: 'Gardens by the Bay', intents: ['Cloud Forest and Flower Dome tickets guide', 'Supertree Grove light show Garden Rhapsody timings', 'Floral Fantasy exhibition review', 'Supertree Observatory vs Marina Bay Sands SkyPark', 'photography tips for indoor waterfall and glass domes'] },
      { prefix: 'Sentosa Island Guide', intents: ['Universal Studios Singapore top rides and express pass worth it', 'S.E.A. Aquarium family tour and shark dome', 'cable car ride from Mount Faber to Sentosa', 'Palawan Beach suspension bridge and Southernmost Point of Continental Asia', 'Wings of Time fireworks and light show booking'] },
      { prefix: 'Marina Bay & Civic District', intents: ['Marina Bay Sands SkyPark observation deck sunset view', 'Merlion Park photo angles and walking promenade', 'Spectra light and water show timings', 'ArtScience Museum future world exhibition guide', 'Singapore Flyer giant observation wheel experience'] },
      { prefix: 'Singapore Dining & Hawkers', intents: ['Michelin star hawker stalls in Chinatown and Maxwell', 'Lau Pa Sat satay street dining after 7 PM', 'Chili Crab where to eat without getting ripped off', 'Little India vegetarian dining and Mustafa Centre shopping', 'Kaya toast and kopi traditional breakfast ritual'] },
      { prefix: 'Singapore Cruise Logistics', intents: ['Genting Dream Cruise boarding guide from Marina Bay Cruise Centre', 'cabin categories interior balcony and palace suite review', 'onboard dining halal vegetarian options on Genting Dream', 'cruise entertainment waterslides and theatre productions', 'shore excursions Port Klang and Penang tips'] }
    ]
  },
  {
    clusterId: 'malaysia',
    clusterName: 'Malaysia (KL + Langkawi) Cluster',
    pillar: 'Malaysia Travel Guide: Modern Skylines to Tropical Archipelagos',
    destination: 'Malaysia',
    packageSlug: 'malaysia-kuala-lumpur-langkawi',
    subtopics: [
      { prefix: 'Malaysia Itinerary', intents: ['6-day Kuala Lumpur and Langkawi island combo', 'dual country Singapore and Malaysia 7-day plan', 'Genting Highlands and KL 4-day family holiday', 'honeymoon guide Langkawi beach luxury and KL dining', 'first time traveler Malaysia essential circuit'] },
      { prefix: 'Kuala Lumpur Attractions', intents: ['Petronas Twin Towers observation deck and skybridge booking', 'KL Tower vs Petronas view comparison', 'Batu Caves 272 rainbow steps Murugan statue guide', 'Jalan Alor night food street best satay and seafood', 'KLCC Park lake symphony water fountains show times'] },
      { prefix: 'Genting Highlands Guide', intents: ['Awana SkyWay glass bottom cable car ride', 'Genting SkyWorlds outdoor theme park rides', 'Chin Swee Caves Temple pagoda and giant Buddha', 'Genting Highlands weather what jacket to wear', 'Genting Highlands Premium Outlets shopping discounts'] },
      { prefix: 'Langkawi Island Travel', intents: ['SkyBridge and SkyCab cable car tickets and windy closures', 'Mangrove River Safari Kilim Geoforest Park eagle feeding', 'Pantai Cenang watersports jet ski and parasailing', 'duty free shopping chocolates and perfumes allowance', 'island hopping tour Pulau Dayang Bunting pregnant maiden lake'] },
      { prefix: 'Malaysia Logistics', intents: ['Malaysia Digital Arrival Card MDAC filling guide', 'Grab taxi availability in Langkawi and Kuala Lumpur', 'KL Sentral to KLIA airport express train vs taxi', 'currency exchange Malaysian Ringgit best rates', 'intercity flights AirAsia luggage rules between KL and Langkawi'] }
    ]
  },
  {
    clusterId: 'meghalaya',
    clusterName: 'North East Meghalaya & Assam Cluster',
    pillar: 'Meghalaya & Assam Travel Guide: Abode of Clouds Explorer',
    destination: 'North East',
    packageSlug: 'north-east',
    subtopics: [
      { prefix: 'Meghalaya Itinerary', intents: ['5-day Shillong Cherrapunji and Dawki circuit', '6-day complete Meghalaya and Kaziranga safari', '4-day quick Shillong waterfalls getaway', 'adventure trekker Meghalaya caves and root bridges plan', 'family friendly gentle pace Meghalaya vacation'] },
      { prefix: 'Living Root Bridges', intents: ['Nongriat Double Decker root bridge trek difficulty and steps', 'single root bridge Mawlynnong easy access for elders', 'how Khasi tribes grow living root bridges ecology', 'Rainbow Falls hike from double decker bridge', 'homestays in Nongriat village packing guide'] },
      { prefix: 'Cherrapunji (Sohra)', intents: ['Nohkalikai Falls tragic legend and best viewpoint', 'Seven Sisters Falls and Mawsmai Cave exploration', 'Arwah Cave fossils and underground streams', 'Garden of Caves seasonal waterfall wonderland', 'Cherrapunji monsoon rainfall records and misty drives'] },
      { prefix: 'Dawki & Mawlynnong', intents: ['Umngot River crystal clear boat ride best months', 'India Bangladesh border post Tamabil visit', 'Mawlynnong cleanest village in Asia community lifestyle', 'bamboo tree house viewpoints overlooking Bangladesh plains', 'camping alongside Dawki riverside Shnongpdeng'] },
      { prefix: 'Shillong & Guwahati Logistics', intents: ['Guwahati airport to Shillong cab charges and Umiam Lake stop', 'Police Bazar shopping winter woolens and local bamboo crafts', 'Elephant Falls and Shillong Peak viewpoints', 'Kaziranga National Park elephant safari vs jeep safari', 'best time to visit North East dry winter vs lush monsoon'] }
    ]
  },
  {
    clusterId: 'planning',
    clusterName: 'Travel Planning & Smart Logistics',
    pillar: 'International & Domestic Travel Planning Master Guide',
    destination: 'All Destinations',
    packageSlug: 'kerala',
    subtopics: [
      { prefix: 'Flight & Airport Hacks', intents: ['booking cheapest flights from India to Southeast Asia', 'DigiYatra registration guide for Delhi Mumbai Bangalore airports', 'layover survival tips at Singapore Changi Airport', 'baggage weight allowance international vs domestic flights', 'avoiding airline hidden charges and seat selection fees'] },
      { prefix: 'Travel Insurance & Health', intents: ['why travel insurance is mandatory for international vacations', 'handling medical emergencies abroad cashless claims', 'motion sickness and altitude sickness prevention on hill roads', 'vaccination and health advisories for Southeast Asia', 'travel medicine kit essentials for family vacations'] },
      { prefix: 'Forex & Money Management', intents: ['forex debit card vs international credit card vs cash', 'airport currency exchange traps and how to avoid them', 'ATM withdrawal charges in Vietnam Singapore and Malaysia', 'UPI international acceptance in Singapore and UAE', 'budget tracking apps for group trips and couples'] },
      { prefix: 'Packing & Luggage Essentials', intents: ['carry-on only packing list for 5-day international trips', 'essential footwear for Meghalaya and Munnar hiking trails', 'rain gear and waterproof bags for Kerala and Vietnam monsoons', 'travel adapter guide plug types for Singapore Malaysia and Vietnam', 'electronics and power bank regulations for airline cabin luggage'] }
    ]
  },
  {
    clusterId: 'family',
    clusterName: 'Family Travel & Multi-Gen Vacations',
    pillar: 'Family Holiday Planning Guide: Stress-Free Multi-Gen Travel',
    destination: 'All Destinations',
    packageSlug: 'singapore',
    subtopics: [
      { prefix: 'Traveling with Kids', intents: ['toddler friendly activities in Singapore and Sentosa', 'managing picky eater children in Vietnam and Malaysia', 'stroller friendly destinations in Southeast Asia and India', 'amusement parks vs nature parks for school age kids', 'keeping children engaged during long flights and road trips'] },
      { prefix: 'Traveling with Senior Citizens', intents: ['gentle pace Kerala itinerary with minimal walking', 'wheelchair accessible attractions in Singapore and Kuala Lumpur', 'managing medications and mobility during international travel', 'choosing hotels with elevators and easy bathroom access', 'peaceful scenic viewpoints without steep stairs'] },
      { prefix: 'Multi-Generational Trips', intents: ['balancing adventure and relaxation on family vacations', 'private vehicle touring advantages for large families', 'connecting hotel rooms vs private villas for family bonding', 'family holiday budgeting split costs and shared expenses'] }
    ]
  },
  {
    clusterId: 'honeymoon',
    clusterName: 'Honeymoon & Romantic Escapes',
    pillar: 'Ultimate Honeymoon Travel Planner: Handcrafted Romantic Journeys',
    destination: 'All Destinations',
    packageSlug: 'kerala',
    subtopics: [
      { prefix: 'Romantic Kerala', intents: ['private pool villas in Munnar tea plantations', 'candlelight dinner on an Alleppey backwater houseboat', 'secluded viewpoints for couples in Thekkady', 'couple spa and Ayurvedic rejuvenation packages', 'romantic photoshoot spots in Fort Kochi'] },
      { prefix: 'Southeast Asia Honeymoon', intents: ['luxury sunset catamaran cruise in Langkawi', 'romantic rooftop dining overlooking Marina Bay Sands', 'lantern boat private ride for couples in Hoi An', 'Bana Hills French village couples photoshoot guide', 'luxury beach resorts in Langkawi for honeymooners'] }
    ]
  }
];

const allRoadmapItems = [];
let counter = 1;

for (const group of clusters) {
  for (const sub of group.subtopics) {
    for (const intent of sub.intents) {
      const id = 'art-' + String(counter).padStart(4, '0');
      const title = `${sub.prefix}: ${intent.charAt(0).toUpperCase() + intent.slice(1)}`;
      const rawSlug = `${sub.prefix}-${intent}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const slug = rawSlug.substring(0, 60).replace(/-$/, '');
      
      const searchIntent = intent.includes('cost') || intent.includes('booking') || intent.includes('package') || intent.includes('tickets') || intent.includes('price') 
        ? 'Commercial' 
        : (intent.includes('buy') ? 'Transactional' : 'Informational');

      const priority = counter <= 30 ? 'P0' : (counter <= 150 ? 'P1' : 'P2');
      const status = counter <= 6 ? 'PUBLISHED' : (counter <= 30 ? 'READY' : (counter <= 80 ? 'DRAFT' : 'IDEA'));

      allRoadmapItems.push({
        id,
        title,
        primaryTopic: sub.prefix,
        searchIntent,
        targetAudience: group.clusterId === 'honeymoon' ? 'Couples & Honeymooners' : (group.clusterId === 'family' ? 'Families & Parents' : 'Independent Travelers & Vacationers'),
        primaryKeyword: `${sub.prefix} ${intent.split(' ').slice(0, 3).join(' ')}`.toLowerCase(),
        secondaryKeywords: [
          `${group.destination} travel guide`,
          `${sub.prefix.toLowerCase()} tips`,
          `${intent.split(' ').slice(0, 2).join(' ')} guide`
        ],
        destination: group.destination,
        cluster: group.clusterName,
        parentPillar: group.pillar,
        relatedPackageSlug: group.packageSlug,
        relatedLocationSlugs: ['delhi', 'mumbai', 'bengaluru', 'noida'],
        suggestedUrl: `/travel-guides/${slug}`,
        metaTitle: `${title.substring(0, 55)} | Outdoor Vacationz`,
        metaDescription: `Comprehensive travel advice on ${title.toLowerCase()}. Detailed routes, practical costs, seasonal tips, and expert recommendations by Outdoor Vacationz.`,
        h1: title,
        internalLinks: [`/destinations/${group.packageSlug}`, `/packages/${group.packageSlug}`, '/travel-guides'],
        externalReferenceOpportunities: ['Official Tourism Board', 'State Transport Department', 'National Park Authority'],
        freshnessRequirement: 'Annual',
        priority,
        status
      });

      counter++;
    }
  }
}

// Ensure at least 500 entries by expanding with specific city-departure queries and seasonal variations
const additionalDestinations = [
  { dest: 'Kerala', pkg: 'kerala', themes: ['tea gardens', 'waterfalls', 'wildlife', 'houseboats', 'beaches', 'culture', 'cuisines', 'wellness'] },
  { dest: 'Vietnam', pkg: 'vietnam', themes: ['caves', 'karsts', 'lanterns', 'coffee', 'markets', 'beaches', 'islands', 'railways'] },
  { dest: 'Singapore', pkg: 'singapore', themes: ['gardens', 'skylines', 'cruises', 'theme parks', 'shopping', 'museums', 'architecture', 'nightlife'] },
  { dest: 'Malaysia', pkg: 'malaysia-kuala-lumpur-langkawi', themes: ['cable cars', 'mangroves', 'towers', 'bat-caves', 'duty-free', 'highlands', 'islands', 'street-food'] },
  { dest: 'Meghalaya', pkg: 'north-east', themes: ['living root bridges', 'waterfalls', 'caves', 'monsoons', 'cloud hills', 'village culture', 'crystal rivers', 'bamboo trails'] }
];

const modifierWords = [
  'Ultimate Traveler Checklist',
  'Cost Breakdown & Budgeting Secrets',
  'Mistakes to Avoid as a First-Time Visitor',
  'Best Photography Viewpoints & Angles',
  '3-Day Weekend Express Itinerary',
  'Couple vs Family Travel Comparison',
  'Senior Citizen Friendly Transit Guide',
  'Packing List & Weather Guide',
  'Local Transport & Cab Fare Guide',
  'Safety, Scams & Local Etiquette Guide'
];

for (const dest of additionalDestinations) {
  for (const theme of dest.themes) {
    for (const mod of modifierWords) {
      if (allRoadmapItems.length >= 510) break;
      const id = 'art-' + String(counter).padStart(4, '0');
      const title = `${dest.dest} ${theme.charAt(0).toUpperCase() + theme.slice(1)}: ${mod}`;
      const rawSlug = `${dest.dest}-${theme}-${mod}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const slug = rawSlug.substring(0, 60).replace(/-$/, '');

      allRoadmapItems.push({
        id,
        title,
        primaryTopic: `${dest.dest} ${theme}`,
        searchIntent: mod.includes('Cost') || mod.includes('Budgeting') ? 'Commercial' : 'Informational',
        targetAudience: 'Travelers Planning Trip to ' + dest.dest,
        primaryKeyword: `${dest.dest} ${theme} ${mod.split(' ')[0]}`.toLowerCase(),
        secondaryKeywords: [`${dest.dest.toLowerCase()} travel guide`, `${theme} in ${dest.dest.toLowerCase()}`],
        destination: dest.dest,
        cluster: `${dest.dest} Travel Cluster`,
        parentPillar: `Complete ${dest.dest} Travel Guide`,
        relatedPackageSlug: dest.pkg,
        relatedLocationSlugs: ['delhi', 'mumbai', 'bengaluru', 'hyderabad'],
        suggestedUrl: `/travel-guides/${slug}`,
        metaTitle: `${title.substring(0, 55)} | Outdoor Vacationz`,
        metaDescription: `Practical guide to ${dest.dest} ${theme}. In-depth insights on ${mod.toLowerCase()}, local recommendations, and itinerary coordination by Outdoor Vacationz.`,
        h1: title,
        internalLinks: [`/destinations/${dest.pkg}`, `/packages/${dest.pkg}`, '/travel-guides'],
        externalReferenceOpportunities: ['State Tourism Bureau', 'Meteorological Department'],
        freshnessRequirement: 'Annual',
        priority: 'P2',
        status: 'IDEA'
      });
      counter++;
    }
  }
}

const fileContent = `import type { EditorialRoadmapItem } from '../types/seo';

/**
 * Outdoor Vacationz 500+ Editorial Content Roadmap Database
 * Total catalogued items: ${allRoadmapItems.length}
 * Organized into topical clusters across Kerala, Vietnam, Singapore, Malaysia, Meghalaya, and cross-cutting themes.
 */
export const seoContentRoadmap: EditorialRoadmapItem[] = ${JSON.stringify(allRoadmapItems, null, 2)};

export function getRoadmapItemById(id: string): EditorialRoadmapItem | undefined {
  return seoContentRoadmap.find((item) => item.id === id);
}

export function getRoadmapItemsByCluster(cluster: string): EditorialRoadmapItem[] {
  return seoContentRoadmap.filter((item) => item.cluster === cluster);
}

export function getRoadmapItemsByPriority(priority: string): EditorialRoadmapItem[] {
  return seoContentRoadmap.filter((item) => item.priority === priority);
}

export function getRoadmapItemsByStatus(status: string): EditorialRoadmapItem[] {
  return seoContentRoadmap.filter((item) => item.status === status);
}
`;

fs.writeFileSync(path.join(__dirname, '..', 'client', 'src', 'data', 'seoContentRoadmap.ts'), fileContent, 'utf8');
console.log(`Generated ${allRoadmapItems.length} roadmap items successfully!`);
