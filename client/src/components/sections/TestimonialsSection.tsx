import { testimonials } from '../../data/testimonials';
import { Star, BadgeCheck } from 'lucide-react';
import './TestimonialsSection.css';

export function TestimonialsSection() {
  return (
    <section className="section testimonials-section" id="testimonials">
      <div className="container">
        <div className="section-header" data-reveal>
          <div className="section-header-left">
            <span className="eyebrow">✦ Traveller Stories</span>
            <h2 className="heading-lg">Loved by 12,000+ travellers</h2>
          </div>
          <a href="#contact" className="section-link">
            Read all reviews →
          </a>
        </div>

        <div className="testimonials-layout" data-reveal data-reveal-delay="1">
          {/* Aggregate score */}
          <div className="testimonials-score">
            <div className="score-big">4.9</div>
            <div className="score-stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={20} fill="var(--amber)" color="var(--amber)" />
              ))}
            </div>
            <p className="score-sub">2,184 verified reviews</p>
            <p className="score-pct">96% would travel with us again</p>
            <div className="score-bars">
              {[
                { label: '5 stars', pct: 88 },
                { label: '4 stars', pct: 8 },
                { label: '3 stars', pct: 3 },
                { label: '2 stars', pct: 1 },
              ].map((b) => (
                <div key={b.label} className="score-bar-row">
                  <span>{b.label}</span>
                  <div className="score-bar-track">
                    <div className="score-bar-fill" style={{ width: `${b.pct}%` }} />
                  </div>
                  <span>{b.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Review cards */}
          <div className="testimonials-grid">
            {testimonials.map((t) => (
              <div key={t.id} className="review-card">
                <div className="review-header">
                  <img src={t.avatar} alt={t.name} loading="lazy" />
                  <div>
                    <b className="review-name">{t.name}</b>
                    <span className="review-loc">{t.location}</span>
                  </div>
                  <span className="review-verified">
                    <BadgeCheck size={11} /> Verified
                  </span>
                </div>
                <div className="review-stars">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={13} fill="var(--amber)" color="var(--amber)" />
                  ))}
                </div>
                <p className="review-text">"{t.text}"</p>
                <span className="review-trip">{t.trip} · {t.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
