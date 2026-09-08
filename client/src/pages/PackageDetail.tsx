import { useParams, Navigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { Star, Calendar, MapPin, Check, X, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { packages } from '../data/packages';
import { PageHero } from '../components/layout/PageHero';
import './PackageDetail.css';

export function PackageDetail() {
  const { slug } = useParams<{ slug: string }>();
  const pkg = packages.find((p) => p.slug === slug);
  const [openDay, setOpenDay] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!pkg) return <Navigate to="/packages" replace />;

  return (
    <div className="pkg-detail-page">
      {/* Hero */}
      <PageHero
        image={pkg.gallery[0] || pkg.image}
        title={pkg.title}
        subtitle={`${pkg.duration} · ${pkg.type}`}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Packages', href: '/packages' },
          { label: pkg.title },
        ]}
        overlay="dark"
        badge={pkg.badge}
        meta={
          <div className="pkg-hero-meta">
            <span className="pkg-meta-pill">
              <MapPin size={13} /> {pkg.destination}, {pkg.country}
            </span>
            <span className="pkg-meta-pill">
              <Calendar size={13} /> {pkg.duration}
            </span>
            <span className="pkg-meta-pill">
              <Star size={13} fill="var(--amber)" color="var(--amber)" /> {pkg.rating} ({pkg.reviewCount} reviews)
            </span>
          </div>
        }
      />

      <div className="container">
        <div className="pkg-detail-layout">
          {/* Main */}
          <div className="pkg-detail-main">

            {/* Overview */}
            <section className="pkg-detail-section" data-reveal>
              <h2 className="heading-md">Overview</h2>
              <p className="pkg-detail-desc">{pkg.longDescription}</p>
              <div className="pkg-highlights-strip">
                {pkg.highlights.map((h) => (
                  <span key={h} className="pkg-highlight-tag">
                    <span className="pkg-highlight-dot-tag" />
                    {h}
                  </span>
                ))}
              </div>
            </section>

            {/* Itinerary */}
            <section className="pkg-detail-section" data-reveal>
              <h2 className="heading-md">Day-by-Day Itinerary</h2>
              <div className="pkg-itinerary">
                {pkg.itinerary.map((day, i) => (
                  <div key={day.day} className={`itinerary-day ${openDay === i ? 'open' : ''}`}>
                    <button
                      className="itinerary-day-header"
                      onClick={() => setOpenDay(openDay === i ? -1 : i)}
                    >
                      <span className="itinerary-day-num">Day {String(day.day).padStart(2, '0')}</span>
                      <span className="itinerary-day-title">{day.title}</span>
                      {openDay === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                    {openDay === i && (
                      <div className="itinerary-day-body">
                        <p>{day.description}</p>
                        <ul className="itinerary-activities">
                          {day.activities.map((a) => (
                            <li key={a}>
                              <Check size={13} />
                              {a}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Includes / Excludes */}
            <section className="pkg-detail-section" data-reveal>
              <h2 className="heading-md">What's Included</h2>
              <div className="pkg-ie-grid">
                <div className="pkg-ie-block">
                  <h4>Included</h4>
                  <ul>
                    {pkg.includes.map((item) => (
                      <li key={item}>
                        <Check size={14} className="pkg-ie-check" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pkg-ie-block">
                  <h4>Not Included</h4>
                  <ul>
                    {pkg.excludes.map((item) => (
                      <li key={item}>
                        <X size={14} className="pkg-ie-x" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Gallery */}
            <section className="pkg-detail-section" data-reveal>
              <h2 className="heading-md">Gallery</h2>
              <div className="pkg-detail-gallery">
                {pkg.gallery.map((img, i) => (
                  <div key={i} className="pkg-gallery-item">
                    <img src={img} alt={`${pkg.title} photo ${i + 1}`} loading="lazy" />
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section className="pkg-detail-section" data-reveal>
              <h2 className="heading-md">Frequently Asked Questions</h2>
              <div className="pkg-faqs">
                {pkg.faqs.map((faq, i) => (
                  <div key={i} className={`pkg-faq-item ${openFaq === i ? 'open' : ''}`}>
                    <button
                      className="pkg-faq-question"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      {faq.question}
                      {openFaq === i ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
                    </button>
                    {openFaq === i && (
                      <div className="pkg-faq-answer">{faq.answer}</div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="pkg-detail-sidebar">
            {/* Price card */}
            <div className="pkg-sidebar-price-card" data-reveal>
              <span className="pkg-price-label">Package from</span>
              <span className="pkg-price-big">{pkg.price}</span>
              <span className="pkg-price-per">per person</span>

              <div className="pkg-sidebar-meta">
                <div className="pkg-sidebar-meta-row">
                  <Calendar size={14} />
                  <span>{pkg.duration}</span>
                </div>
                <div className="pkg-sidebar-meta-row">
                  <MapPin size={14} />
                  <span>{pkg.destination}</span>
                </div>
                <div className="pkg-sidebar-meta-row">
                  <Star size={14} fill="var(--amber)" color="var(--amber)" />
                  <span>{pkg.rating} · {pkg.reviewCount} reviews</span>
                </div>
              </div>

              <Link to="/plan-your-trip" className="pkg-sidebar-cta">
                Plan This Trip <ArrowRight size={14} />
              </Link>
              <Link to="/contact" className="pkg-sidebar-enquire">
                Send Enquiry
              </Link>
            </div>

            {/* Destination link */}
            <Link to={`/destinations/${pkg.destinationSlug}`} className="pkg-dest-link">
              <img
                src={pkg.image}
                alt={pkg.destination}
                loading="lazy"
              />
              <div className="pkg-dest-link-overlay">
                <span>Explore {pkg.destination}</span>
                <ArrowRight size={14} />
              </div>
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
