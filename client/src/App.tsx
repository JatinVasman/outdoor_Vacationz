import { Routes, Route } from 'react-router-dom';
import { useScrollReveal } from './hooks/useScrollReveal';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/layout/ScrollToTop';

// Pages
import { Home } from './pages/Home';
import { Destinations } from './pages/Destinations';
import { DestinationDetail } from './pages/DestinationDetail';
import { Packages } from './pages/Packages';
import { PackageDetail } from './pages/PackageDetail';
import { Experiences } from './pages/Experiences';
import { ExperienceDetail } from './pages/ExperienceDetail';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { PlanYourTrip } from './pages/PlanYourTrip';
import { NotFound } from './pages/NotFound';

function App() {
  useScrollReveal();

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:slug" element={<DestinationDetail />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/packages/:slug" element={<PackageDetail />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/experiences/:slug" element={<ExperienceDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/plan-your-trip" element={<PlanYourTrip />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
