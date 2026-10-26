import { useState } from 'react';

const FAQS = [
  { q: "How does CarpoolCampus work?", a: "Search for a ride or offer your own, match with a fellow Chitkara student on the same route, and book or publish a seat. Sign up, find or post a route, then ride and split the fare directly with your driver." },
  { q: "How do I verify I'm a Chitkara student?", a: "Sign up and sign in require an official university mailbox ending in @chitkara.edu.in. Accounts created with any other email domain are rejected, keeping the network limited to verified Chitkara students." },
  { q: "Can I offer my own ride?", a: "Yes. Head to Offer Ride, add your route, timing, vehicle model and plate, seats and price per seat, and your listing appears on Find Ride for other students to book. You can delete it anytime from your Dashboard." },
  { q: "How is the fare per seat decided?", a: "Drivers set their own price per seat when they publish a ride, typically based on distance and fuel cost split across passengers along the route." },
  { q: "Can I cancel a booking?", a: "Yes. Open Dashboard → My Bookings and tap Cancel Seat. The seat is returned to the listing immediately so another student can book it." },
  { q: "Why can't I see the driver's phone number before booking?", a: "This is the Privacy Phone Shield. Contact details stay hidden on Find Ride and only unlock inside your Dashboard once you've reserved a seat, so numbers are never exposed to browsing users." },
];

// Local state: which FAQ is open (only this component cares, so it is NOT global).
export default function FaqSection() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq-section" className="section-block">
      <div className="container" style={{ maxWidth: '780px', margin: '0 auto' }}>
        <div className="section-heading-wrap reveal" style={{ marginBottom: '26px' }}>
          <span className="badge badge-primary">Got Questions?</span>
          <h2>Frequently Asked Questions</h2>
        </div>
        {FAQS.map((f, i) => (
          <div className={`faq-item${open === i ? ' open' : ''}`} key={f.q}>
            <div className="faq-question" onClick={() => setOpen(open === i ? -1 : i)}>{f.q} <i className="fa-solid fa-chevron-down"></i></div>
            <div className="faq-answer">{f.a}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
