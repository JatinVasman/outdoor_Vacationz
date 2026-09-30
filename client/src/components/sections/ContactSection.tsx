import { useState, type FormEvent } from 'react';
import { Send, CheckCircle, User, Mail, Phone, MapPin, Calendar, Users, MessageSquare } from 'lucide-react';
import type { EnquiryPayload } from '../../types';
import { submitEnquiry } from '../../utils/api';
import './ContactSection.css';

const initialForm: EnquiryPayload = {
  name: '',
  email: '',
  phone: '',
  destination: '',
  travelDates: '',
  travellers: '',
  message: '',
};

const popularDestinations = [
  'Kerala (5N/6D)',
  'Vietnam — Phu Quoc & Da Nang (5N/6D)',
  'Singapore (4N/5D)',
  'Singapore with Cruise (6N/7D)',
  'Malaysia — KL & Langkawi (6N/7D)',
  'Malaysia & Singapore (5N/6D)',
  'North East Meghalaya (5N/6D)',
  'Custom Itinerary',
];

export function ContactSection() {
  const [form, setForm] = useState<EnquiryPayload>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (serverError) setServerError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setServerError(null);

    const result = await submitEnquiry({
      ...form,
      source: 'Home Page Contact Section',
    });

    setLoading(false);
    if (result.success) {
      setSubmitted(true);
      setForm(initialForm);
    } else {
      setServerError(
        result.error ||
          'Failed to send enquiry. Please contact us directly at contact.outdoorvacationz@gmail.com'
      );
    }
  };

  if (submitted) {
    return (
      <section className="section contact-section" id="contact">
        <div className="container">
          <div className="contact-success" data-reveal>
            <CheckCircle size={56} color="var(--teal)" />
            <h2 className="heading-lg">Enquiry Sent!</h2>
            <p>
              Thank you for reaching out. Our travel planner will get back to you within 24 hours with a personalised quote.
            </p>
            <button className="btn-primary" onClick={() => setSubmitted(false)}>
              Send Another Enquiry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="contact-layout">
          {/* Info */}
          <div className="contact-info" data-reveal>
            <span className="eyebrow">✦ Let's Plan Together</span>
            <h2 className="heading-lg" style={{ marginTop: '12px', marginBottom: '16px' }}>
              Start planning your dream trip
            </h2>
            <p className="text-soft" style={{ lineHeight: '1.7', marginBottom: '36px' }}>
              Fill in the form and our dedicated travel planner will reach out within 24 hours with a completely personalised itinerary and quote — no spam, ever.
            </p>

            <div className="contact-details">
              <a href="tel:+917669931399" className="contact-detail-item">
                <span className="contact-detail-icon"><Phone size={16} /></span>
                <div>
                  <b>Call us</b>
                  <span>+91 76699 31399</span>
                </div>
              </a>
              <a href="mailto:contact.outdoorvacationz@gmail.com" className="contact-detail-item">
                <span className="contact-detail-icon"><Mail size={16} /></span>
                <div>
                  <b>Email us</b>
                  <span>contact.outdoorvacationz@gmail.com</span>
                </div>
              </a>
              <a
                href="https://www.instagram.com/outdoor_vacationz/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-detail-item"
              >
                <span className="contact-detail-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                  </svg>
                </span>
                <div>
                  <b>Instagram</b>
                  <span>@outdoor_vacationz</span>
                </div>
              </a>
              <a
                href="https://www.facebook.com/Outdoorvacationz766/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-detail-item"
              >
                <span className="contact-detail-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </span>
                <div>
                  <b>Facebook</b>
                  <span>Outdoorvacationz766</span>
                </div>
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-wrap" data-reveal data-reveal-delay="2">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="name">
                    <User size={13} /> Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    required
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="email">
                    <Mail size={13} /> Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="phone">
                    <Phone size={13} /> Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="destination">
                    <MapPin size={13} /> Destination
                  </label>
                  <input
                    id="destination"
                    name="destination"
                    type="text"
                    placeholder="Where do you want to go?"
                    list="contact-dest-list"
                    value={form.destination}
                    onChange={handleChange}
                  />
                  <datalist id="contact-dest-list">
                    {popularDestinations.map((d) => <option key={d} value={d} />)}
                  </datalist>
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="travelDates">
                    <Calendar size={13} /> Travel Dates
                  </label>
                  <input
                    id="travelDates"
                    name="travelDates"
                    type="text"
                    placeholder="e.g. Dec 15 – Dec 22, 2025"
                    value={form.travelDates}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="travellers">
                    <Users size={13} /> Number of Travellers
                  </label>
                  <select
                    id="travellers"
                    name="travellers"
                    value={form.travellers}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="1">Solo traveller</option>
                    <option value="2">2 adults</option>
                    <option value="3-4">3–4 people</option>
                    <option value="5-8">5–8 people</option>
                    <option value="9+">9+ people (group)</option>
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="message">
                  <MessageSquare size={13} /> Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell us about your dream trip — interests, budget, special requirements..."
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              {serverError && (
                <div style={{ padding: '12px 14px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.25)', color: '#f87171', fontSize: '13px', lineHeight: '1.5' }}>
                  {serverError}
                </div>
              )}

              <button type="submit" className="contact-submit" disabled={loading}>
                {loading ? (
                  <span className="contact-loading">Sending…</span>
                ) : (
                  <>
                    <Send size={16} /> Send Enquiry
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
