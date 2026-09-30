import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Instagram, Facebook, CheckCircle2 } from 'lucide-react';
import { PageHero } from '../components/layout/PageHero';
import { submitEnquiry } from '../utils/api';
import './ContactPage.css';

const contactDetails = [
  { icon: <Phone size={20} />, label: 'Phone', value: '+91 76699 31399', href: 'tel:+917669931399' },
  { icon: <Mail size={20} />, label: 'Email', value: 'contact.outdoorvacationz@gmail.com', href: 'mailto:contact.outdoorvacationz@gmail.com' },
  { icon: <MapPin size={20} />, label: 'Location', value: 'India', href: undefined },
  { icon: <Clock size={20} />, label: 'Hours', value: 'Mon–Sat, 9am–7pm IST', href: undefined },
  { icon: <Instagram size={20} />, label: 'Instagram', value: '@outdoor_vacationz', href: 'https://www.instagram.com/outdoor_vacationz/' },
  { icon: <Facebook size={20} />, label: 'Facebook', value: 'Outdoorvacationz766', href: 'https://www.facebook.com/Outdoorvacationz766/' },
];

const initialForm = {
  name: '', email: '', phone: '', destination: '', travelDates: '', travellers: '', message: '',
};

export function Contact() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: '' }));
    if (serverError) setServerError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setServerError(null);

    const result = await submitEnquiry({
      ...form,
      source: 'Contact Page (/contact)',
    });

    setLoading(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      setServerError(
        result.error ||
          'Failed to send enquiry. Please contact us directly at contact.outdoorvacationz@gmail.com'
      );
    }
  };

  return (
    <div className="contact-page">
      <PageHero
        image="https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1800&q=85"
        title="Let's Plan Your Journey"
        subtitle="Reach out and a dedicated travel planner will respond within 24 hours."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
        overlay="dark"
        align="center"
      />

      <section className="section">
        <div className="container">
          <div className="contact-page-layout">
            {/* Left — Info */}
            <div className="contact-page-info">
              <h2 className="heading-md">Get in Touch</h2>
              <p className="text-soft" style={{ marginBottom: 28 }}>
                Whether you have a destination in mind or just a feeling — we'll turn it into the trip you've been imagining.
              </p>

              <div className="contact-page-details">
                {contactDetails.map((d) => (
                  <div key={d.label} className="contact-page-detail-item">
                    <span className="contact-page-detail-icon">{d.icon}</span>
                    <div>
                      <b>{d.label}</b>
                      {d.href ? (
                        <a
                          href={d.href}
                          target={d.href.startsWith('http') ? '_blank' : undefined}
                          rel={d.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {d.value}
                        </a>
                      ) : (
                        <span>{d.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Form */}
            <div className="contact-page-form-wrap">
              {submitted ? (
                <div className="contact-success">
                  <CheckCircle2 size={48} color="var(--teal)" />
                  <h3>Enquiry Received!</h3>
                  <p>Thank you, <strong>{form.name}</strong>. Our team will get back to you within 24 hours at <strong>{form.email}</strong>.</p>
                </div>
              ) : (
                <>
                  <h3 className="contact-form-title">Send an Enquiry</h3>
                  <form onSubmit={handleSubmit} noValidate className="contact-form-body">
                    <div className="contact-form-row">
                      <div className="contact-form-field">
                        <label>Name *</label>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className={errors.name ? 'error' : ''}
                        />
                        {errors.name && <span className="contact-field-error">{errors.name}</span>}
                      </div>
                      <div className="contact-form-field">
                        <label>Email *</label>
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@email.com"
                          className={errors.email ? 'error' : ''}
                        />
                        {errors.email && <span className="contact-field-error">{errors.email}</span>}
                      </div>
                    </div>
                    <div className="contact-form-row">
                      <div className="contact-form-field">
                        <label>Phone Number *</label>
                        <input
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className={errors.phone ? 'error' : ''}
                        />
                        {errors.phone && <span className="contact-field-error">{errors.phone}</span>}
                      </div>
                      <div className="contact-form-field">
                        <label>Destination (Flexible)</label>
                        <input name="destination" value={form.destination} onChange={handleChange} placeholder="e.g. Kerala, Vietnam, Singapore (or flexible)" />
                      </div>
                    </div>
                    <div className="contact-form-row">
                      <div className="contact-form-field">
                        <label>Travel Date (Flexible)</label>
                        <input
                          name="travelDates"
                          type="date"
                          min={new Date().toISOString().split('T')[0]}
                          value={form.travelDates}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="contact-form-field">
                        <label>Travellers (Flexible)</label>
                        <select name="travellers" value={form.travellers} onChange={handleChange}>
                          <option value="">Flexible / Choose travellers…</option>
                          {['Solo', '2 People', '3–4 People', '5–8 People', '8+ People'].map((o) => (
                            <option key={o}>{o}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="contact-form-field">
                      <label>Message</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Tell us about your ideal trip…"
                      />
                    </div>
                    {serverError && (
                      <div style={{ padding: '12px 14px', borderRadius: '8px', background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', fontSize: '13px', lineHeight: '1.5', marginTop: '12px' }}>
                        {serverError}
                      </div>
                    )}
                    <button type="submit" className="contact-submit-btn" disabled={loading}>
                      {loading ? 'Sending…' : 'Send Enquiry'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
