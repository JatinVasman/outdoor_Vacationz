import { CheckCircle2, MessageCircle } from 'lucide-react';
import './WhyChooseUs.css';

const whyItems = [
  {
    title: 'Handpicked, not listed.',
    desc: 'Every package is vetted by planners who\'ve taken the route themselves. No random inventory dumps.',
  },
  {
    title: 'Customised itineraries.',
    desc: 'Swap days, upgrade rooms, add a private guide — live quotes in one quick call with our team.',
  },
  {
    title: 'Best price guarantee.',
    desc: 'Find a lower like-for-like price and we match it, then refund the difference. No questions asked.',
  },
  {
    title: '24/7 on-trip support.',
    desc: 'One WhatsApp thread from booking to landing back home. Real humans who answer, not bots.',
  },
];

const stats = [
  { value: '12,000+', label: 'Happy travellers' },
  { value: '7', label: 'Signature Tour Packages' },
  { value: '4.9★', label: 'Average rating' },
  { value: '10+', label: 'Years of craft' },
];

export function WhyChooseUs() {
  return (
    <section className="why-section" id="why-us">
      <div className="container">
        <div className="why-split" data-reveal>
          {/* Text side */}
          <div className="why-text">
            <span className="eyebrow" style={{ color: '#7fd6c4' }}>✦ Why Choose Us</span>
            <h2 className="heading-lg" style={{ color: '#fff', marginTop: '12px', marginBottom: '20px' }}>
              Booking should feel as good as the trip.
            </h2>
            <ul className="why-list">
              {whyItems.map((item) => (
                <li key={item.title} className="why-item">
                  <CheckCircle2 size={18} className="why-check" />
                  <div>
                    <b>{item.title}</b> {item.desc}
                  </div>
                </li>
              ))}
            </ul>

            {/* Stats */}
            <div className="why-stats">
              {stats.map((s) => (
                <div key={s.label} className="why-stat">
                  <b>{s.value}</b>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image side */}
          <div className="why-image">
            <img
              src="https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=900&q=80"
              alt="Happy travellers on adventure"
              loading="lazy"
            />
            {/* Floating card */}
            <div className="why-float-card">
              <span className="why-float-icon">
                <MessageCircle size={20} />
              </span>
              <div>
                <b>Avg. response: 4 min</b>
                <span>Across calls, chat & email</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
