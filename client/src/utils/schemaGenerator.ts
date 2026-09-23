import type { TravelGuideArticle, CityLocation } from '../types/seo';
import type { TravelPackage, Destination } from '../types';

export const BASE_URL = 'https://outdoorvacationz.com';

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': `${BASE_URL}/#organization`,
    name: 'Outdoor Vacationz',
    url: BASE_URL,
    logo: `${BASE_URL}/favicon.svg`,
    description: 'Outdoor Vacationz crafts curated international and domestic travel packages with handpicked accommodations, private sightseeing transfers, and personalized itineraries.',
    email: 'info@outdoorvacationz.com',
    telephone: '+91-98765-43210',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Noida',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN',
    },
    areaServed: [
      { '@type': 'Country', name: 'India' },
      { '@type': 'Country', name: 'Vietnam' },
      { '@type': 'Country', name: 'Singapore' },
      { '@type': 'Country', name: 'Malaysia' },
    ],
    sameAs: [
      'https://www.facebook.com/outdoorvacationz',
      'https://www.instagram.com/outdoorvacationz',
    ],
    priceRange: '₹₹₹',
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: 'Outdoor Vacationz',
    description: 'Travel Further. Experience More. Handcrafted holiday packages across India & Southeast Asia.',
    publisher: {
      '@id': `${BASE_URL}/#organization`,
    },
    inLanguage: 'en-US',
  };
}

export function generateBreadcrumbSchema(items: { label: string; url?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.url ? (item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`) : undefined,
    })),
  };
}

export function generateTouristDestinationSchema(destination: Destination) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: destination.name,
    description: destination.description || destination.longDescription,
    image: destination.image ? `${BASE_URL}${destination.image}` : undefined,
    touristType: destination.travelInfo?.idealFor || ['Couples', 'Families', 'Nature Enthusiasts'],
    address: {
      '@type': 'PostalAddress',
      addressCountry: destination.country,
    },
    includesAttraction: destination.highlights?.map((h) => ({
      '@type': 'TouristAttraction',
      name: h.title,
      description: h.description,
    })),
  };
}

export function generateTourProductSchema(pkg: TravelPackage) {
  const numericPrice = parseInt(pkg.price.replace(/[^0-9]/g, ''), 10) || 45000;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: pkg.title,
    description: pkg.description || pkg.longDescription,
    image: pkg.image ? `${BASE_URL}${pkg.image}` : undefined,
    sku: pkg.id,
    brand: {
      '@type': 'Brand',
      name: 'Outdoor Vacationz',
    },
    offers: {
      '@type': 'Offer',
      url: `${BASE_URL}/packages/${pkg.slug}`,
      priceCurrency: 'INR',
      price: numericPrice,
      availability: 'https://schema.org/InStock',
      validFrom: '2026-01-01',
      priceValidUntil: '2027-12-31',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: pkg.rating || 4.9,
      reviewCount: pkg.reviewCount || 350,
      bestRating: 5,
      worstRating: 1,
    },
  };
}

export function generateArticleSchema(article: TravelGuideArticle) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/travel-guides/${article.slug}`,
    },
    headline: article.title,
    description: article.excerpt,
    image: article.coverImage ? `${BASE_URL}${article.coverImage}` : undefined,
    datePublished: article.publishedDate,
    dateModified: article.updatedDate || article.publishedDate,
    author: {
      '@type': 'Organization',
      name: 'Outdoor Vacationz Editorial Desk',
      url: `${BASE_URL}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Outdoor Vacationz',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/favicon.svg`,
      },
    },
  };
}

export function generateFAQPageSchema(faqs: { question: string; answer: string }[]) {
  if (!faqs || faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateLocationSchema(city: CityLocation) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: `Outdoor Vacationz — Holiday Packages from ${city.name}`,
    description: city.introCopy,
    url: `${BASE_URL}/locations/${city.slug}`,
    telephone: '+91-98765-43210',
    areaServed: {
      '@type': 'City',
      name: city.name,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: city.state,
      },
    },
  };
}
