// "Why CarpoolCampus" + "How it works" + mini stats. routes / fares are derived from shared ride + booking state.
export default function FeaturesPanel({ routes, fares }) {
  return (
<section className="dark-panel">
      <div className="container">
        <span className="dark-eyebrow">Features</span>
        <h2>Why CarpoolCampus</h2>
        <div className="dark-feature-grid reveal-stagger">
          <div className="dark-feature-card"><i className="fa-solid fa-user-check"></i><h4>Verified Students Only</h4><p>Every account is authenticated through a verified university email. Your ride pool is students who share your campus and route, not the open internet.</p></div>
          <div className="dark-feature-card"><i className="fa-solid fa-eye-slash"></i><h4>Privacy First</h4><p>Your number stays hidden and is only shared once a driver accepts your booking request.</p></div>
          <div className="dark-feature-card"><i className="fa-solid fa-leaf"></i><h4>Eco-Friendly</h4><p>Fewer cars on the same NH-64 stretch means less traffic and a smaller footprint for every trip you share.</p></div>
          <div className="dark-feature-card"><i className="fa-solid fa-car-side"></i><h4>Easy Carpooling</h4><p>Post your route once. CarpoolCampus matches you with students already heading the same way.</p></div>
          <div className="dark-feature-card"><i className="fa-solid fa-user-group"></i><h4>Commute Groups</h4><p>Find the same faces on your daily route and turn a one-off ride into a regular carpool.</p></div>
          <div className="dark-feature-card"><i className="fa-solid fa-indian-rupee-sign"></i><h4>Affordable Travel</h4><p>Fares are set per seat by the driver and split fairly. No cash confusion, no "so how much do I owe you."</p></div>
        </div>
        <div style={{ marginTop: '36px' }}>
          <span className="dark-eyebrow">Process</span>
          <div className="process-row"><h2 style={{ marginBottom: '0' }}>How It Works</h2><span className="sub">Three steps. That's it.</span></div>
          <div className="steps-grid reveal-stagger" style={{ marginTop: '20px' }}>
            <div className="step-card"><div className="step-num">01</div><i className="fa-solid fa-envelope"></i><h4>Sign Up</h4><p>Join with your @chitkara.edu.in email. Verified in under 2 minutes.</p></div>
            <div className="step-card"><div className="step-num">02</div><i className="fa-solid fa-route"></i><h4>Post or Find</h4><p>Set your daily route on Offer Ride, or find someone already driving it on Find Ride.</p></div>
            <div className="step-card"><div className="step-num">03</div><i className="fa-solid fa-car"></i><h4>Ride &amp; Split</h4><p>Book a verified seat and split the fare directly with your driver.</p></div>
          </div>
        </div>
        <div className="mini-stats-grid reveal">
          <div className="mini-stat"><div className="val" id="mini-stat-students">520+</div><div className="lbl">Registered Students</div></div>
          <div className="mini-stat"><div className="val" id="mini-stat-routes">{routes}+</div><div className="lbl">Campus Routes Posted</div></div>
          <div className="mini-stat"><div className="val" id="mini-stat-fares">₹{fares.toLocaleString('en-IN')}</div><div className="lbl">Fares Split Across Campus</div></div>
        </div>
      </div>
    </section>
  );
}
