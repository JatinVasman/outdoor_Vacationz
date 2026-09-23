import { Navigate, Routes, Route } from 'react-router-dom';
import { useScrollReveal } from './hooks/useScrollReveal';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/layout/ScrollToTop';

// Core Pages
import { Home } from './pages/Home';
// Destinations listing page removed — individual /destinations/:slug pages kept for SEO
import { DestinationDetail } from './pages/DestinationDetail';
import { Packages } from './pages/Packages';
import { PackageDetail } from './pages/PackageDetail';
import { TravelGuides } from './pages/TravelGuides';
import { TravelGuideDetail } from './pages/TravelGuideDetail';
import { Locations } from './pages/Locations';
import { StateLocations } from './pages/StateLocations';
import { LocationDetail } from './pages/LocationDetail';
import { LocationRouteResolver } from './pages/LocationRouteResolver';
import { SEODashboard } from './pages/SEODashboard';
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
          
          {/* /destinations root → redirect to tour packages */}
          <Route path="/destinations" element={<Navigate to="/packages" replace />} />
          <Route path="/destinations/:slug" element={<DestinationDetail />} />
          <Route path="/destinations/:country/:slug" element={<DestinationDetail />} />
          
          {/* Tour Packages (both /packages and /tours supported) */}
          <Route path="/packages" element={<Packages />} />
          <Route path="/packages/:slug" element={<PackageDetail />} />
          <Route path="/tours" element={<Packages />} />
          <Route path="/tours/:slug" element={<PackageDetail />} />
          
          {/* Travel Guides Editorial Hub */}
          <Route path="/travel-guides" element={<TravelGuides />} />
          <Route path="/travel-guides/:slug" element={<TravelGuideDetail />} />
          
          {/* Location SEO Directory & Departure City Hubs (State -> City Hierarchy) */}
          <Route path="/locations" element={<Locations />} />
          <Route path="/locations/:stateSlug/:citySlug" element={<LocationDetail />} />
          <Route path="/locations/:slug" element={<LocationRouteResolver />} />
          
          {/* Internal SEO Console & Quality Health Monitor */}
          <Route path="/seo-dashboard" element={<SEODashboard />} />
          
          {/* Supporting Brand Pages */}
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/experiences/:slug" element={<ExperienceDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/plan-your-trip" element={<PlanYourTrip />} />
          
          {/* 404 Error Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
