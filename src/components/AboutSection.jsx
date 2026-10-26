// About + Campus Safety Directory. Used by the Home page (as in the original) AND the /about route.
export default function AboutSection({ compact = false }) {
  return (
<section id="about-section" className="section-block" style={{ marginTop: compact ? 0 : '56px' }}>
      <div className="container">
        <div className="section-heading-wrap reveal">
          <span className="badge badge-primary"><i className="fa-solid fa-shield-heart"></i> Campus Safety First</span>
          <h2>Built for Chitkara University Commuters</h2>
          <p>CarpoolCampus is a student-founded initiative uniting everyday travelers along National Highway 64. Our goal is 100% peer transparency, safer rides, and measurable carbon offsets.</p>
        </div>
        <div className="about-feature-grid reveal-stagger">
          <div className="about-feature-card"><i className="fa-solid fa-envelope-circle-check"></i><h4>Chitkara Email Only</h4><p>Zero external commercial drivers. Registration and sign-in strictly require a verified @chitkara.edu.in mailbox.</p></div>
          <div className="about-feature-card"><i className="fa-solid fa-eye-slash"></i><h4>Privacy Phone Shield</h4><p>Driver phone numbers remain locked and only unlock inside your Dashboard once a seat is mutually confirmed.</p></div>
          <div className="about-feature-card"><i className="fa-solid fa-car-side"></i><h4>Verified Vehicle Records</h4><p>Every ride is posted with the driver's vehicle model and plate number, so you always know exactly who's picking you up.</p></div>
          <div className="about-feature-card"><i className="fa-solid fa-chair"></i><h4>Real-Time Seat Tracking</h4><p>Seats update the moment someone books, and full rides auto-hide from Find Ride so you never chase a seat that's gone.</p></div>
        </div>
      </div>
      <div className="container" id="safety-directory" style={{ marginTop: '32px', textAlign: 'center' }}>
        <span className="badge badge-primary">Emergency Contacts</span>
        <h2 style={{ fontSize: '1.8rem', margin: '8px 0 20px 0' }}>Campus 24x7 Safety Directory</h2>
        <div className="safety-contact-grid reveal-stagger">
          <div className="safety-contact-card"><i className="fa-solid fa-shield"></i><h4>Campus Security Control</h4><p>Main Gate Security &amp; Quick Response</p><div className="contact-number">01762-507084</div><span className="badge badge-success">24x7 Active</span></div>
          <div className="safety-contact-card"><i className="fa-solid fa-truck-medical"></i><h4>University Dispensary</h4><p>Campus Ambulance &amp; Medical Room</p><div className="contact-number">01762-507000</div><span className="badge badge-warn">Emergency Room</span></div>
          <div className="safety-contact-card"><i className="fa-solid fa-person-shelter"></i><h4>Women Safety Helpline</h4><p>Punjab Police Special Cell</p><div className="contact-number">1091 / 112</div><span className="badge badge-success">Direct Dial</span></div>
        </div>
      </div>
    </section>
  );
}
