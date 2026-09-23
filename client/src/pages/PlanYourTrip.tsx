import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar, Users, Wallet, Palmtree, Home, CheckCircle2 } from 'lucide-react';
import { PageHero } from '../components/layout/PageHero';
import './PlanYourTrip.css';

const destinations = [
  'Kerala (5N/6D)',
  'Vietnam — Phu Quoc & Da Nang (5N/6D)',
  'Singapore (4N/5D)',
  'Singapore with Cruise (6N/7D)',
  'Malaysia — KL & Langkawi (6N/7D)',
  'Malaysia & Singapore (5N/6D)',
  'North East Meghalaya (5N/6D)',
  'Custom / Multi-Destination',
];
const styles = ['Adventure', 'Luxury', 'Honeymoon', 'Family', 'Cultural', 'Beach & Island', 'Wildlife', 'Wellness', 'Backpacking'];
const budgets = ['Under ₹50,000', '₹50,000 – ₹1,00,000', '₹1,00,000 – ₹2,00,000', '₹2,00,000 – ₹5,00,000', 'Above ₹5,00,000', 'Flexible / Not sure'];
const accommodations = ['Luxury Resort / 5-star', 'Boutique Hotel', 'Heritage Property', 'Beach Villa / Private Villa', 'Standard Hotel (3–4 star)', 'No Preference'];
const activities = ['Sightseeing & Heritage', 'Beach & Water Sports', 'Adventure & Trekking', 'Food & Cooking', 'Spa & Wellness', 'Wildlife Safari', 'Photography', 'Cultural Experiences'];

const initialForm = {
  name: '', email: '', phone: '',
  destination: '', travelDates: '', travellers: '2 People',
  budget: '', travelStyle: '', accommodation: '',
  activities: [] as string[],
  additionalRequirements: '',
};

export function PlanYourTrip() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.destination) e.destination = 'Required';
    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: '' }));
  };

  const toggleActivity = (act: string) => {
    setForm((f) => ({
      ...f,
      activities: f.activities.includes(act)
        ? f.activities.filter((a) => a !== act)
        : [...f.activities, act],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="plan-success-page">
        <div className="plan-success-card">
          <CheckCircle2 size={56} color="var(--teal)" />
          <h1>Your trip request is in!</h1>
          <p>
            Thank you, <strong>{form.name}</strong>. One of our travel planners will reach out to you at <strong>{form.email}</strong> within 24 hours with a personalised itinerary.
          </p>
          <p style={{ fontSize: '14px', opacity: 0.7 }}>Meanwhile, explore our packages for inspiration.</p>
          <div className="plan-success-actions">
            <Link to="/packages" className="btn-primary-dark">
              Explore Packages <ArrowRight size={14} />
            </Link>
            <Link to="/" className="btn-secondary-dark">Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="plan-trip-page">
      <PageHero
        image="https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1800&q=85"
        title="Plan Your Perfect Trip"
        subtitle="Tell us about your dream journey and we'll design it for you — down to every detail."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Plan Your Trip' }]}
        overlay="dark"
        align="center"
      />

      <section className="section">
        <div className="container">
          <div className="plan-trip-layout">
            {/* Form */}
            <div className="plan-trip-form-wrap">
              <form onSubmit={handleSubmit} noValidate>
                {/* Contact */}
                <div className="plan-form-block">
                  <h3 className="plan-block-title">
                    <Users size={18} /> About You
                  </h3>
                  <div className="plan-form-row">
                    <div className="plan-field">
                      <label>Your Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" className={errors.name ? 'error' : ''} />
                      {errors.name && <span className="plan-field-error">{errors.name}</span>}
                    </div>
                    <div className="plan-field">
                      <label>Email *</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com" className={errors.email ? 'error' : ''} />
                      {errors.email && <span className="plan-field-error">{errors.email}</span>}
                    </div>
                  </div>
                  <div className="plan-form-row">
                    <div className="plan-field">
                      <label>Phone</label>
                      <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" />
                    </div>
                    <div className="plan-field">
                      <label>Number of Travellers</label>
                      <select name="travellers" value={form.travellers} onChange={handleChange}>
                        {['Solo', '2 People', '3–4 People', '5–8 People', '8+ People'].map((o) => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Trip Details */}
                <div className="plan-form-block">
                  <h3 className="plan-block-title">
                    <MapPin size={18} /> Trip Details
                  </h3>
                  <div className="plan-form-row">
                    <div className="plan-field">
                      <label>Destination *</label>
                      <select name="destination" value={form.destination} onChange={handleChange} className={errors.destination ? 'error' : ''}>
                        <option value="">Choose destination…</option>
                        {destinations.map((d) => <option key={d}>{d}</option>)}
                      </select>
                      {errors.destination && <span className="plan-field-error">{errors.destination}</span>}
                    </div>
                    <div className="plan-field">
                      <label>Travel Dates</label>
                      <input name="travelDates" value={form.travelDates} onChange={handleChange} placeholder="e.g. Dec 10–18, 2025" />
                    </div>
                  </div>
                </div>

                {/* Budget */}
                <div className="plan-form-block">
                  <h3 className="plan-block-title">
                    <Wallet size={18} /> Budget per Person
                  </h3>
                  <div className="plan-chips-grid">
                    {budgets.map((b) => (
                      <button
                        type="button"
                        key={b}
                        className={`plan-chip ${form.budget === b ? 'active' : ''}`}
                        onClick={() => setForm((f) => ({ ...f, budget: b }))}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Travel Style */}
                <div className="plan-form-block">
                  <h3 className="plan-block-title">
                    <Palmtree size={18} /> Travel Style
                  </h3>
                  <div className="plan-chips-grid">
                    {styles.map((s) => (
                      <button
                        type="button"
                        key={s}
                        className={`plan-chip ${form.travelStyle === s ? 'active' : ''}`}
                        onClick={() => setForm((f) => ({ ...f, travelStyle: s }))}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Accommodation */}
                <div className="plan-form-block">
                  <h3 className="plan-block-title">
                    <Home size={18} /> Accommodation Preference
                  </h3>
                  <div className="plan-chips-grid">
                    {accommodations.map((a) => (
                      <button
                        type="button"
                        key={a}
                        className={`plan-chip ${form.accommodation === a ? 'active' : ''}`}
                        onClick={() => setForm((f) => ({ ...f, accommodation: a }))}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Activities */}
                <div className="plan-form-block">
                  <h3 className="plan-block-title">
                    <Calendar size={18} /> Activities (select all that apply)
                  </h3>
                  <div className="plan-chips-grid">
                    {activities.map((a) => (
                      <button
                        type="button"
                        key={a}
                        className={`plan-chip ${form.activities.includes(a) ? 'active' : ''}`}
                        onClick={() => toggleActivity(a)}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Additional */}
                <div className="plan-form-block">
                  <h3 className="plan-block-title">Additional Requirements</h3>
                  <textarea
                    name="additionalRequirements"
                    value={form.additionalRequirements}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Any special requests, dietary needs, accessibility requirements, or anything else we should know…"
                  />
                </div>

                <button type="submit" className="plan-submit-btn" disabled={loading}>
                  {loading ? 'Creating your plan…' : 'Create My Trip'}
                  {!loading && <ArrowRight size={16} />}
                </button>
              </form>
            </div>

            {/* Sidebar */}
            <aside className="plan-trip-sidebar">
              <div className="plan-sidebar-card">
                <h4>What happens next?</h4>
                <ol className="plan-steps">
                  <li>
                    <span>1</span>
                    <div>
                      <strong>We review your plan</strong>
                      <p>A dedicated travel planner will read your requirements carefully.</p>
                    </div>
                  </li>
                  <li>
                    <span>2</span>
                    <div>
                      <strong>We design your itinerary</strong>
                      <p>Within 24 hours, you'll receive a personalised itinerary by email.</p>
                    </div>
                  </li>
                  <li>
                    <span>3</span>
                    <div>
                      <strong>We refine together</strong>
                      <p>Revise as many times as needed until it's exactly right.</p>
                    </div>
                  </li>
                  <li>
                    <span>4</span>
                    <div>
                      <strong>Book & travel</strong>
                      <p>Once confirmed, we handle every detail. You just show up.</p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="plan-sidebar-contact">
                <p>Prefer to speak directly?</p>
                <a href="tel:+917669931399" className="plan-sidebar-phone">
                  +91 76699 31399
                </a>
                <a href="mailto:Outdoorvacationz@gmail.com" className="plan-sidebar-email">
                  Outdoorvacationz@gmail.com
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
