import { HeroSection } from '../components/sections/HeroSection';
import { DestinationsSection } from '../components/sections/DestinationsSection';
import { PackagesSection } from '../components/sections/PackagesSection';
import { ExperiencesSection } from '../components/sections/ExperiencesSection';
import { WhyChooseUs } from '../components/sections/WhyChooseUs';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { FinalCTA } from '../components/sections/FinalCTA';
import { ContactSection } from '../components/sections/ContactSection';

export function Home() {
  return (
    <>
      <HeroSection />
      <DestinationsSection />
      <PackagesSection />
      <ExperiencesSection />
      <WhyChooseUs />
      <TestimonialsSection />
      <FinalCTA />
      <ContactSection />
    </>
  );
}
