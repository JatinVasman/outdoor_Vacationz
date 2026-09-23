import { useParams, Navigate, Link } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Star,
  Calendar,
  MapPin,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Building,
  Users,
  ShieldCheck,
  Camera,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Eye,
} from 'lucide-react';
import { packages } from '../data/packages';
import { PageHero } from '../components/layout/PageHero';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import {
  generateTourProductSchema,
  generateBreadcrumbSchema,
  generateFAQPageSchema,
} from '../utils/schemaGenerator';
import './PackageDetail.css';

export function PackageDetail() {
  const { slug } = useParams<{ slug: string }>();
  const pkg = packages.find((p) => p.slug === slug);
  const [openDays, setOpenDays] = useState<number[]>([0]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Collect every image on the tour page into an indexed catalog
  const allTourImages = useMemo(() => {
    if (!pkg) return [];
    const list: { src: string; caption?: string; dayTitle?: string; tag?: string }[] = [];

    // 1. Cover / Hero photo
    const coverSrc = pkg.gallery[0] || pkg.image;
    if (coverSrc) {
      list.push({
        src: coverSrc,
        caption: `${pkg.title} · ${pkg.destination}, ${pkg.country}`,
        dayTitle: `Cover Photo · ${pkg.title}`,
        tag: 'Overview',
      });
    }

    // 2. All day itinerary photos
    pkg.itinerary.forEach((d) => {
      if (d.image && !list.some((item) => item.src === d.image)) {
        list.push({
          src: d.image,
          caption: d.imageCaption || d.title,
          dayTitle: `Day ${String(d.day).padStart(2, '0')} · ${d.title}`,
          tag: `Day ${d.day}`,
        });
      }
    });

    // 3. Tour gallery photos
    pkg.gallery.forEach((g, idx) => {
      if (!list.some((item) => item.src === g)) {
        list.push({
          src: g,
          caption: `${pkg.title} Landmark Photo`,
          dayTitle: `Tour Gallery · Photo ${idx + 1}`,
          tag: 'Gallery',
        });
      }
    });

    // 4. Sidebar package image
    if (pkg.image && !list.some((item) => item.src === pkg.image)) {
      list.push({
        src: pkg.image,
        caption: `${pkg.destination} Scenic View`,
        dayTitle: `Featured Destination · ${pkg.destination}`,
        tag: 'Destination',
      });
    }

    return list;
  }, [pkg]);

  // Robust scroll locking that prevents background jumping or scrolling
  useEffect(() => {
    if (activeLightboxIndex === null) return;

    const scrollY = window.scrollY;
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    const origPosition = document.body.style.position;
    const origTop = document.body.style.top;
    const origLeft = document.body.style.left;
    const origRight = document.body.style.right;
    const origWidth = document.body.style.width;
    const origPaddingRight = document.body.style.paddingRight;
    const origOverflow = document.body.style.overflow;

    // Lock body in place without any layout shift
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActiveLightboxIndex((prev) => (prev !== null ? (prev + 1) % allTourImages.length : null));
      } else if (e.key === 'ArrowLeft') {
        setActiveLightboxIndex((prev) => (prev !== null ? (prev - 1 + allTourImages.length) % allTourImages.length : null));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.position = origPosition;
      document.body.style.top = origTop;
      document.body.style.left = origLeft;
      document.body.style.right = origRight;
      document.body.style.width = origWidth;
      document.body.style.paddingRight = origPaddingRight;
      document.body.style.overflow = origOverflow;
      window.scrollTo(0, scrollY);
    };
  }, [activeLightboxIndex, allTourImages.length]);

  const toggleDay = (idx: number) => {
    setOpenDays((prev) =>
      prev.includes(idx) ? prev.filter((d) => d !== idx) : [...prev, idx]
    );
  };

  const allExpanded = pkg ? openDays.length === pkg.itinerary.length : false;
  const toggleAllDays = () => {
    if (!pkg) return;
    if (allExpanded) {
      setOpenDays([]);
    } else {
      setOpenDays(pkg.itinerary.map((_, i) => i));
    }
  };

  const openLightboxForSrc = (src: string) => {
    const idx = allTourImages.findIndex((item) => item.src === src);
    if (idx !== -1) {
      setActiveLightboxIndex(idx);
    } else {
      setActiveLightboxIndex(0);
    }
  };

  if (!pkg) return <Navigate to="/packages" replace />;

  const coverImage = pkg.gallery[0] || pkg.image;

  const breadcrumbsList = [
    { label: 'Packages', url: '/packages' },
    { label: pkg.destination, url: `/destinations/${pkg.destinationSlug || pkg.slug}` },
    { label: pkg.title },
  ];

  const schemas = [
    generateTourProductSchema(pkg),
    generateBreadcrumbSchema(breadcrumbsList),
    pkg.faqs ? generateFAQPageSchema(pkg.faqs) : null,
  ].filter(Boolean);

  return (
    <div className="pkg-detail-page">
      <SEOHead
        title={`${pkg.title} | ${pkg.duration} Tour | Outdoor Vacationz`}
        description={pkg.description || pkg.longDescription}
        keywords={`${pkg.title}, ${pkg.destination} tour package, ${pkg.country} holiday, ${pkg.type}`}
        canonical={`/packages/${pkg.slug}`}
        ogImage={coverImage}
        ogType="product"
        jsonLd={schemas}
      />
      <Breadcrumbs items={breadcrumbsList} />
      {/* Hero with Click-to-Open-Photo capability */}
      <PageHero
        image={coverImage}
        title={pkg.title}
        subtitle={`${pkg.duration} · ${pkg.type}`}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Packages', href: '/packages' },
          { label: pkg.title },
        ]}
        overlay="dark"
        badge={pkg.badge}
        onImageClick={() => openLightboxForSrc(coverImage)}
        meta={
          <div className="pkg-hero-meta">
            <span className="pkg-meta-pill">
              <MapPin size={13} /> {pkg.destination}, {pkg.country}
            </span>
            <span className="pkg-meta-pill">
              <Calendar size={13} /> {pkg.duration}
            </span>
            {pkg.hotel && (
              <span className="pkg-meta-pill">
                <Building size={13} /> {pkg.hotel}
              </span>
            )}
            {pkg.guests && (
              <span className="pkg-meta-pill">
                <Users size={13} /> {pkg.guests}
              </span>
            )}
            {pkg.complimentary && (
              <span className="pkg-meta-pill">
                <ShieldCheck size={13} /> {pkg.complimentary}
              </span>
            )}
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
              <div className="pkg-itinerary-header-row">
                <div>
                  <h2 className="heading-md">Day-by-Day Itinerary</h2>
                  <p className="pkg-itinerary-subtitle">
                    Explore daily landmarks, curated experiences, and private excursions
                  </p>
                </div>
                <button
                  type="button"
                  className="pkg-itinerary-toggle-all"
                  onClick={toggleAllDays}
                >
                  {allExpanded ? 'Collapse All' : 'Expand All Days'}
                </button>
              </div>

              <div className="pkg-itinerary">
                {pkg.itinerary.map((day, i) => {
                  const isOpen = openDays.includes(i);
                  return (
                    <div key={day.day} className={`itinerary-day ${isOpen ? 'open' : ''}`}>
                      <button
                        type="button"
                        className="itinerary-day-header"
                        onClick={() => toggleDay(i)}
                        aria-expanded={isOpen}
                      >
                        <div className="itinerary-day-header-left">
                          <span className="itinerary-day-num">Day {String(day.day).padStart(2, '0')}</span>
                          <span className="itinerary-day-title">{day.title}</span>
                        </div>
                        <div className="itinerary-day-header-right">
                          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </div>
                      </button>

                      {isOpen && (
                        <div className="itinerary-day-body">
                          <div className={`itinerary-day-grid ${day.image ? 'has-media' : 'text-only'}`}>
                            <div className="itinerary-day-text">
                              <p>{day.description}</p>
                              <div className="itinerary-activities-wrapper">
                                <span className="itinerary-activities-label">Day Highlights & Inclusions:</span>
                                <ul className="itinerary-activities">
                                  {day.activities.map((a) => (
                                    <li key={a}>
                                      <Check size={13} />
                                      <span>{a}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {day.image && (
                              <div className="itinerary-day-media">
                                <div
                                  className="itinerary-photo-card"
                                  onClick={() => openLightboxForSrc(day.image!)}
                                  role="button"
                                  tabIndex={0}
                                  title="Click to view full photo"
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                      e.preventDefault();
                                      openLightboxForSrc(day.image!);
                                    }
                                  }}
                                >
                                  <div className="itinerary-photo-frame">
                                    <img
                                      src={day.image}
                                      alt={day.imageCaption || day.title}
                                      loading="lazy"
                                    />
                                    <div className="itinerary-photo-overlay">
                                      <span className="photo-zoom-btn">
                                        <Maximize2 size={13} /> Enlarge
                                      </span>
                                    </div>
                                  </div>
                                  {day.imageCaption && (
                                    <div className="itinerary-photo-caption">
                                      <MapPin size={12} className="caption-pin" />
                                      <span>{day.imageCaption}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
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
              <div className="pkg-gallery-header-row">
                <div>
                  <h2 className="heading-md">Tour Gallery</h2>
                  <p className="pkg-itinerary-subtitle">
                    Real sights, landmarks and experiences included in this journey
                  </p>
                </div>
              </div>
              <div className="pkg-detail-gallery">
                {pkg.gallery.map((img, i) => (
                  <div
                    key={i}
                    className="pkg-gallery-item"
                    onClick={() => openLightboxForSrc(img)}
                    role="button"
                    tabIndex={0}
                    title="Click to expand image"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openLightboxForSrc(img);
                      }
                    }}
                  >
                    <img src={img} alt={`${pkg.title} scene ${i + 1}`} loading="lazy" />
                    <div className="pkg-gallery-overlay">
                      <Eye size={18} />
                      <span>Expand</span>
                    </div>
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
                {pkg.hotel && (
                  <div className="pkg-sidebar-meta-row">
                    <Building size={14} />
                    <span>{pkg.hotel}</span>
                  </div>
                )}
                {pkg.guests && (
                  <div className="pkg-sidebar-meta-row">
                    <Users size={14} />
                    <span>{pkg.guests}</span>
                  </div>
                )}
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

            {/* Sidebar Destination Photo Preview Card */}
            <div
              className="pkg-sidebar-photo-card"
              onClick={() => openLightboxForSrc(pkg.image)}
              role="button"
              tabIndex={0}
              title="Click to view destination photo in separate box"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openLightboxForSrc(pkg.image);
                }
              }}
            >
              <img
                src={pkg.image}
                alt={pkg.destination}
                loading="lazy"
              />
              <div className="pkg-sidebar-photo-overlay">
                <Maximize2 size={16} />
                <span>Expand View</span>
              </div>
            </div>

            <Link to="/packages" className="pkg-all-packages-link">
              <span>View All Tour Packages</span>
              <ArrowRight size={14} />
            </Link>
          </aside>
        </div>
      </div>

      {/* Separate Box Photo Lightbox Modal - Portaled to document.body */}
      {activeLightboxIndex !== null && allTourImages[activeLightboxIndex] && createPortal(
        <div
          className="pkg-lightbox-backdrop"
          onClick={() => setActiveLightboxIndex(null)}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview dialog"
        >
          <div
            className="pkg-lightbox-box"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Box Header */}
            <div className="pkg-lightbox-box-header">
              <div className="pkg-lightbox-box-title">
                <span className="pkg-lightbox-tag">
                  <Camera size={13} />
                  {allTourImages[activeLightboxIndex].dayTitle || 'Tour Photo'}
                </span>
                <span className="pkg-lightbox-counter">
                  Photo {activeLightboxIndex + 1} of {allTourImages.length}
                </span>
              </div>
              <button
                type="button"
                className="pkg-lightbox-close-btn"
                onClick={() => setActiveLightboxIndex(null)}
                aria-label="Close photo preview (Esc)"
                title="Close (Esc)"
              >
                <X size={18} />
                <span className="pkg-lightbox-close-label">Close</span>
              </button>
            </div>

            {/* Box Stage (Image + Arrows) */}
            <div className="pkg-lightbox-stage">
              {allTourImages.length > 1 && (
                <button
                  type="button"
                  className="pkg-lightbox-arrow prev"
                  onClick={() =>
                    setActiveLightboxIndex((prev) =>
                      prev !== null ? (prev - 1 + allTourImages.length) % allTourImages.length : 0
                    )
                  }
                  aria-label="Previous photo (Left arrow)"
                  title="Previous photo"
                >
                  <ChevronLeft size={22} />
                </button>
              )}

              <div className="pkg-lightbox-img-frame">
                <img
                  src={allTourImages[activeLightboxIndex].src}
                  alt={allTourImages[activeLightboxIndex].caption || pkg.title}
                  key={allTourImages[activeLightboxIndex].src}
                  className="pkg-lightbox-img"
                />
              </div>

              {allTourImages.length > 1 && (
                <button
                  type="button"
                  className="pkg-lightbox-arrow next"
                  onClick={() =>
                    setActiveLightboxIndex((prev) =>
                      prev !== null ? (prev + 1) % allTourImages.length : 0
                    )
                  }
                  aria-label="Next photo (Right arrow)"
                  title="Next photo"
                >
                  <ChevronRight size={22} />
                </button>
              )}
            </div>

            {/* Box Footer (Caption + Mini Thumbnails) */}
            <div className="pkg-lightbox-box-footer">
              {allTourImages[activeLightboxIndex].caption && (
                <div className="pkg-lightbox-caption-row">
                  <MapPin size={13} className="pkg-lightbox-pin" />
                  <p className="pkg-lightbox-caption-text">
                    {allTourImages[activeLightboxIndex].caption}
                  </p>
                </div>
              )}

              {allTourImages.length > 1 && (
                <div className="pkg-lightbox-thumbs-bar" role="tablist" aria-label="Photo thumbnails">
                  {allTourImages.map((item, idx) => (
                    <button
                      key={item.src + idx}
                      type="button"
                      className={`pkg-lightbox-thumb ${idx === activeLightboxIndex ? 'active' : ''}`}
                      onClick={() => setActiveLightboxIndex(idx)}
                      title={item.dayTitle || `Photo ${idx + 1}`}
                      aria-label={`View photo ${idx + 1}`}
                      aria-selected={idx === activeLightboxIndex}
                    >
                      <img src={item.src} alt="" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
