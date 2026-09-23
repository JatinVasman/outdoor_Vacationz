import { HeroSection } from '../components/sections/HeroSection';
import { DestinationsSection } from '../components/sections/DestinationsSection';
import { PackagesSection } from '../components/sections/PackagesSection';
import { ExperiencesSection } from '../components/sections/ExperiencesSection';
import { WhyChooseUs } from '../components/sections/WhyChooseUs';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { FinalCTA } from '../components/sections/FinalCTA';
import { ContactSection } from '../components/sections/ContactSection';
import { SEOHead } from '../components/seo/SEOHead';
import { generateOrganizationSchema, generateWebSiteSchema } from '../utils/schemaGenerator';

export function Home() {
  const schemas = [
    generateOrganizationSchema(),
    generateWebSiteSchema(),
  ];

  return (
    <>
      <SEOHead
        title="Outdoor Vacationz — Travel Further. Experience More. Handcrafted Holiday Packages"
        description="Explore handpicked holiday packages across Kerala, Vietnam, Singapore, Malaysia, and Meghalaya. Private sightseeing, vetted 3/4-star hotels, and seamless travel logistics."
        keywords="travel packages, holiday packages India, kerala tour package, vietnam holiday, singapore vacation, malaysia trip, meghalaya tour"
        canonical="/"
        ogImage="/images/tours/kerala-munnar.webp"
        jsonLd={schemas}
      />
      <HeroSection />
      <PackagesSection />
      <DestinationsSection />
      <ExperiencesSection />
      <WhyChooseUs />
      <TestimonialsSection />
      <FinalCTA />
      <ContactSection />
    </>
  );
}
