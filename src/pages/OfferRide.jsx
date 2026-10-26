import { useNavigate } from 'react-router-dom';
import useForm from '../hooks/useForm';
import { FormInput, FormSelect, SubmitButton } from '../components/FormField';
import { FormError } from '../components/FormError';
import { required, minLength, validTime, dateNotInPast, intBetween } from '../utils/validators';
import { fmtTime, initials, tomorrowISO } from '../utils/format';

const AMENITIES = ['AC On', 'Music Allowed', 'Backpack Space', 'Quiet Companion GPS', 'Ladies Only'];
const VEHICLES = [{ value: 'Car', label: 'Four Wheeler' }, { value: 'Bike', label: 'Two-Wheeler (Bike)' }];

// One schema = all the rules for this form. Each field has an array of reusable rule functions.
const schema = {
  origin: [required('Leaving from'), minLength(3, 'Enter at least 3 characters.')],
  dest: [required('Going to'), minLength(3, 'Enter at least 3 characters.')],
  time: [required('Departure time'), validTime],
  date: [required('Departure date'), dateNotInPast('Departure date')],
  model: [required('Vehicle model & plate'), minLength(3, 'Enter the vehicle model and plate.')],
  seats: [required('Available seats'), intBetween(1, 6, 'Seats')],
  price: [required('Price per seat'), intBetween(20, 150, 'Price')],
};

const defaults = () => ({
  origin: '', dest: 'Chitkara Rajpura Campus (NH-64)', time: '08:15', date: tomorrowISO(),
  vehicle: 'Car', model: '', seats: 3, price: 65, amen: ['AC On'],
});

export default function OfferRide({ app }) {
  const navigate = useNavigate();
  const { user, addRide, notify, openModal } = app;

  const form = useForm({
    initialValues: defaults(),
    schema,
    onSubmit: (v) => {
      if (!user) { notify('Please sign in to offer a ride.', 'error'); openModal('login'); return; }
      addRide({
        id: 'rd-' + Date.now(), driver: user.name, origin: v.origin.trim(), dest: v.dest.trim(), time: fmtTime(v.time),
        date: v.date, vehicle: v.vehicle, model: v.model.trim(), price: parseInt(v.price, 10), seats: parseInt(v.seats, 10),
        phone: user.phone || '', owner: user.email, rating: null, amen: AMENITIES.filter((a) => v.amen.includes(a)),
      });
      notify('Ride posted to campus board!');
      form.reset(defaults());
      navigate('/find-ride');
    },
  });

  const { values: v, errors, handleChange, handleBlur } = form;
  const field = (name) => ({ name, value: v[name], onChange: handleChange, onBlur: handleBlur, error: errors[name] });
  const toggleAmenity = (a) => form.setValues((prev) => ({ ...prev, amen: prev.amen.includes(a) ? prev.amen.filter((x) => x !== a) : [...prev.amen, a] }));
  const previewName = user ? user.name : 'Guest Student';

  return (
    <main id="view-offer-ride" className="view-section active">
      <div className="container offer-layout">
        <div className="search-card">
          <h2 style={{ fontSize: '1.35rem', marginBottom: '4px' }}>Offer an Empty Seat</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', marginBottom: '18px' }}>Share your highway route with fellow Chitkara students and split petrol costs.</p>
          {!user && <div id="offer-login-notice" className="badge badge-primary" style={{ marginBottom: '14px' }}><i className="fa-solid fa-lock"></i>&nbsp; Sign in required to publish a ride</div>}
          <FormError message={form.submitError} />
          <form id="offer-form" onSubmit={form.handleSubmit} noValidate>
            <div className="form-row">
              <FormInput id="offer-origin" type="text" placeholder="e.g. Mohali Phase 7" label={<><i className="fa-solid fa-location-dot" style={{ color: 'var(--primary)' }}></i> Leaving From</>} {...field('origin')} />
              <FormInput id="offer-dest" type="text" label={<><i className="fa-solid fa-flag-checkered" style={{ color: 'var(--accent)' }}></i> Going To</>} {...field('dest')} />
            </div>
            <div className="form-row">
              <FormInput id="offer-time" type="time" label="Departure Time" {...field('time')} />
              <FormInput id="offer-date" type="date" label="Departure Date" {...field('date')} />
            </div>
            <div className="form-row">
              <FormSelect id="offer-vehicle" label="Vehicle Type" options={VEHICLES} {...field('vehicle')} />
              <FormInput id="offer-model" type="text" placeholder="e.g. Hyundai i20 (CH 01 AB 1234)" label="Vehicle Model & Plate" {...field('model')} />
            </div>
            <div className="form-row">
              <FormInput id="offer-seats" type="number" min="1" max="6" label="Available Seats" {...field('seats')} />
              <FormInput id="offer-price" type="number" min="20" max="150" label="Price per Seat (₹)" {...field('price')} />
            </div>
            <div className="form-group"><span className="form-label">Amenities</span>
              <div className="amen-grid">
                {AMENITIES.map((a) => (
                  <label key={a}><input type="checkbox" name="offer-amen" value={a} checked={v.amen.includes(a)} onChange={() => toggleAmenity(a)} /> {a}</label>
                ))}
              </div>
            </div>
            <SubmitButton className="btn-block" loading={form.submitting} loadingText="Publishing..."><i className="fa-solid fa-plus-circle"></i> Publish Campus Ride</SubmitButton>
          </form>
        </div>
        <div>
          <h3 style={{ fontSize: '1.05rem', marginBottom: '12px' }}><i className="fa-solid fa-eye" style={{ color: 'var(--primary)' }}></i> Live Passenger Preview</h3>
          {/* The preview reads the SAME form state, so it updates on every keystroke with no extra code */}
          <div className="ride-card">
            <div className="ride-header">
              <div className="driver-meta">
                <div className="avatar-circle" id="prev-avatar">{initials(previewName)}</div>
                <div><strong id="prev-name">{previewName}</strong><div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }} id="prev-vehicle">{v.model || 'Car'}</div></div>
              </div>
              <div style={{ textAlign: 'right' }}><span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary)' }} id="prev-price">₹{v.price || '65'}</span><small style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)' }}>per seat</small></div>
            </div>
            <div className="route-bar"><span id="prev-origin">{v.origin || 'Origin'}</span> &rarr; <span id="prev-dest">{v.dest || 'Chitkara'}</span></div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--success)' }} id="prev-seats">{v.seats || 3} seats available</div>
          </div>
        </div>
      </div>
    </main>
  );
}
