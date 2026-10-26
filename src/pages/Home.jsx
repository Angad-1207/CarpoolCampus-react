import { useNavigate } from 'react-router-dom';
import { FormInput, SubmitButton } from '../components/FormField';
import useForm from '../hooks/useForm';
import { required } from '../utils/validators';
import AboutSection from '../components/AboutSection';
import FeaturesPanel from '../components/FeaturesPanel';
import ReviewsSection from '../components/ReviewsSection';
import FaqSection from '../components/FaqSection';

const CHIPS = [
  ['ISBT 43', 'Chandigarh Sector 43 ISBT'],
  ['Mohali Phase 7', 'Mohali Phase 7'],
  ['Zirakpur', 'Zirakpur VIP Road'],
  ['Panchkula', 'Panchkula Sec 5'],
  ['Ambala', 'Ambala Cantt'],
  ['Patiala', 'Patiala Bus Stand'],
];

export default function Home({ app }) {
  const navigate = useNavigate();
  const { user, rides, bookings, openModal, notify } = app;
  const isLoggedIn = !!user;

  // Search terms travel in the URL (?q=...), so FindRide reads them with useSearchParams.
  const goSearch = (q) => navigate('/find-ride?q=' + encodeURIComponent(q));

  const quick = useForm({
    initialValues: { origin: '', dest: 'Chitkara Rajpura Campus (NH-64)' },
    schema: { origin: [required('Leaving from')], dest: [required('Going to')] },
    onSubmit: (v) => goSearch(v.origin.trim()),
  });

  // Derived values for the "mini stats" (computed from shared state, never stored separately)
  const routes = rides.length;
  const fares = bookings.reduce((sum, b) => sum + b.price, 0) + 2400;

  return (
    <main id="view-home" className="view-section active">
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="hero-pill hero-badge-float" style={{ marginBottom: '16px' }}><i className="fa-solid fa-graduation-cap"></i> Exclusively for Chitkara University Students &amp; Faculty</span>
            <h1>Ride Together, <br /><span>Save Together.</span></h1>
            <p>The student carpooling network connecting Chitkara Rajpura Campus with Chandigarh, Mohali, Panchkula, Zirakpur, Ambala and Patiala.</p>
            <div className="hero-btn-row" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => navigate('/find-ride')}><i className="fa-solid fa-magnifying-glass"></i> Find a Ride</button>
              <button className="btn btn-secondary" onClick={() => navigate('/offer-ride')}><i className="fa-solid fa-car"></i> Offer Seats</button>
            </div>
          </div>
          <div className="search-card">
            <h3 style={{ marginBottom: '12px' }}><i className="fa-solid fa-route" style={{ color: 'var(--primary)' }}></i> Quick Commute Search</h3>
            <form onSubmit={quick.handleSubmit} noValidate>
              <FormInput id="quick-origin" name="origin" type="text" placeholder="e.g. Chandigarh ISBT 43 or Mohali Phase 7"
                label={<><i className="fa-solid fa-location-dot" style={{ color: 'var(--primary)' }}></i> Leaving From</>}
                value={quick.values.origin} onChange={quick.handleChange} onBlur={quick.handleBlur} error={quick.errors.origin} />
              <FormInput id="quick-dest" name="dest" type="text"
                label={<><i className="fa-solid fa-flag-checkered" style={{ color: 'var(--accent)' }}></i> Going To</>}
                value={quick.values.dest} onChange={quick.handleChange} onBlur={quick.handleBlur} error={quick.errors.dest} />
              <SubmitButton className="btn-block" loading={quick.submitting}>Search Campus Rides</SubmitButton>
            </form>
            <div className="chips">
              {CHIPS.map(([label, value]) => <span className="chip" key={label} onClick={() => goSearch(value)}>{label}</span>)}
            </div>
          </div>
        </div>
      </section>

      <div className="container">

      <div className="stats-grid reveal-stagger stagger-pop">
        <div className="stat-card"><span className="stat-ico"><i className="fa-solid fa-road"></i></span><div><div className="stat-val">1,42,800+</div><div className="stat-lbl">Kilometers Carpooled</div></div></div>
        <div className="stat-card"><span className="stat-ico"><i className="fa-solid fa-indian-rupee-sign"></i></span><div><div className="stat-val">₹14.8 Lakhs</div><div className="stat-lbl">Student Fuel Money Saved</div></div></div>
        <div className="stat-card"><span className="stat-ico"><i className="fa-solid fa-users"></i></span><div><div className="stat-val">520+</div><div className="stat-lbl">Verified Student Drivers</div></div></div>
        <div className="stat-card"><span className="stat-ico"><i className="fa-solid fa-tree"></i></span><div><div className="stat-val">9.8 Tons</div><div className="stat-lbl">Carbon Dioxide Offset</div></div></div>
      </div>

      
      <div className="cor-head reveal">
        <div className="cor-eyebrow">Chitkara Commute Corridors</div>
        <h2>Major Daily Highway Routes</h2>
        <p>Drivers leave daily between 7:30 AM &ndash; 8:30 AM to campus, returning at 4:30 PM.</p>
      </div>
      <div className="cor-grid reveal-stagger">
        <div className="cor-card" onClick={() => goSearch('Chandigarh')}>
          <div className="cor-ico"><i className="fa-solid fa-landmark"></i></div>
          <h3>Chandigarh Corridor</h3>
          <p>ISBT 43 &bull; Sec 35 &bull; Tribune Chowk &bull; NH-64 Toll &bull; Chitkara</p>
          <div className="cor-foot"><span className="pill pill-km">~38 Km</span><span className="pill pill-price">₹60 - ₹75 / seat</span></div>
        </div>
        <div className="cor-card" onClick={() => goSearch('Mohali')}>
          <div className="cor-ico"><i className="fa-solid fa-laptop-code"></i></div>
          <h3>Mohali Tech Corridor</h3>
          <p>Phase 7 &bull; Phase 3B2 &bull; Sohana Gurdwara &bull; Airport Rd &bull; Chitkara</p>
          <div className="cor-foot"><span className="pill pill-km">~32 Km</span><span className="pill pill-price">₹50 - ₹65 / seat</span></div>
        </div>
        <div className="cor-card" onClick={() => goSearch('Zirakpur,Panchkula')}>
          <div className="cor-ico"><i className="fa-solid fa-signs-post"></i></div>
          <h3>Zirakpur / Panchkula</h3>
          <p>Panchkula Sec 5 &bull; VIP Road Zirakpur &bull; Banur &bull; Chitkara Rajpura</p>
          <div className="cor-foot"><span className="pill pill-km">~29 Km</span><span className="pill pill-price">₹50 - ₹60 / seat</span></div>
        </div>
        <div className="cor-card" onClick={() => goSearch('Patiala,Ambala')}>
          <div className="cor-ico"><i className="fa-solid fa-compass"></i></div>
          <h3>Patiala &amp; Ambala</h3>
          <p>Patiala Bus Stand &bull; Bahadurgarh &bull; Ambala Cantt &bull; Ambala City &bull; Rajpura Bypass &bull; Chitkara</p>
          <div className="cor-foot"><span className="pill pill-km">~27 Km</span><span className="pill pill-price">₹45 - ₹65 / seat</span></div>
        </div>
      </div>
    </div>

      <AboutSection />

      <FeaturesPanel routes={routes} fares={fares} />

      <ReviewsSection user={user} notify={notify} />

      <FaqSection />

      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner reveal">
            <div className="cta-eyebrow">Get Started</div>
            <h2>Your Next Ride Leaves Soon.</h2>
            <p>Create your account with your Chitkara University email and start splitting fares on your daily NH-64 commute today.</p>
            <button className="cta-get-started-btn" onClick={() => (isLoggedIn ? navigate('/dashboard') : openModal('signup'))}>Get Started <i className="fa-solid fa-arrow-right"></i></button>
          </div>
        </div>
      </section>
    </main>
  );
}
