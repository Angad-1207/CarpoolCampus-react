import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initials } from '../utils/format';

function StatCard({ icon, value, label }) {
  return (
    <div className="stat-card"><span className="stat-ico"><i className={`fa-solid ${icon}`}></i></span><div><div className="stat-val">{value}</div><div className="stat-lbl">{label}</div></div></div>
  );
}

export default function Dashboard({ app }) {
  const navigate = useNavigate();
  const { user, rides, myBookings, notify, openModal, cancelBooking, deleteRide } = app;
  const [tab, setTab] = useState('overview'); // local UI state: which tab is showing

  if (!user) {
    return (
      <main id="view-dashboard" className="view-section active">
        <div className="container">
          <div className="guest-prompt">
            <i className="fa-solid fa-lock"></i>
            <h3>Sign in to view your dashboard</h3>
            <p>Log in with your Chitkara University email to see your overview, bookings and rides you've offered.</p>
            <div className="guest-btns"><button className="btn btn-primary" onClick={() => openModal('login')}>Login</button><button className="btn btn-secondary" onClick={() => openModal('signup')}>Sign Up</button></div>
          </div>
        </div>
      </main>
    );
  }

  // Derived data – computed from shared context state, not stored again
  const offered = rides.filter((r) => r.owner === user.email);
  const saved = myBookings.reduce((s, b) => s + Math.max(0, 150 - b.price), 0);
  const next = myBookings[0];
  // Run an action (cancel / delete); show a toast on success or on failure
  const run = (task, okMsg) => {
    try { task(); notify(okMsg); } catch (err) { notify(err.message || 'Something went wrong.', 'error'); }
  };

  return (
    <main id="view-dashboard" className="view-section active">
      <div className="container">
        <div id="dash-authed">
          <div className="dash-banner">
            <div className="dash-id">
              <div className="dash-avatar" id="dash-avatar">{initials(user.name)}</div>
              <div>
                <h2 id="dash-name" style={{ fontSize: '1.7rem', lineHeight: 1.2 }}>Welcome, {user.name}!</h2>
                <p id="dash-info" style={{ fontSize: '0.9rem', opacity: 0.92, marginTop: '4px' }}>{user.dept || 'Chitkara University'} • ID: {user.studentId || user.roll || '-'} • Chitkara University</p>
              </div>
            </div>
          </div>

          <div className="dash-tabs">
            <div className={`dash-tab${tab === 'overview' ? ' active' : ''}`} onClick={() => setTab('overview')}><i className="fa-solid fa-chart-pie"></i>Overview</div>
            <div className={`dash-tab${tab === 'bookings' ? ' active' : ''}`} onClick={() => setTab('bookings')}><i className="fa-solid fa-ticket"></i>My Bookings ( <span id="tab-count-bookings">{myBookings.length}</span> )</div>
            <div className={`dash-tab${tab === 'offered' ? ' active' : ''}`} onClick={() => setTab('offered')}><i className="fa-solid fa-car"></i>My Offered Rides ( <span id="tab-count-offered">{offered.length}</span> )</div>
          </div>

            {tab === 'overview' && (
              <div className="dash-content active" id="dashcontent-overview">
                <div className="ov-stats" id="ov-stats">
                  <StatCard icon="fa-car" value={myBookings.length} label="Total Rides Taken" />
                  <StatCard icon="fa-indian-rupee-sign" value={'₹' + saved.toLocaleString('en-IN')} label="Personal Fuel Saved" />
                  <StatCard icon="fa-star" value="4.9 / 5" label="Commuter Reputation" />
                  <StatCard icon="fa-leaf" value={(myBookings.length * 2.7).toFixed(1) + ' Kg'} label="Personal CO₂ Offset" />
                </div>
                <div className="ov-grid">
                  <div className="search-card"><h3><i className="fa-solid fa-clock" style={{ color: 'var(--primary)' }}></i> Your Next Ride</h3>
                    <div id="ov-next">
                      {next ? (
                        <>
                          <div className="route-bar"><span><i className="fa-solid fa-location-dot" style={{ color: 'var(--primary)' }}></i> {next.origin}</span> &rarr; <span><i className="fa-solid fa-flag-checkered" style={{ color: 'var(--accent)' }}></i> {next.dest}</span></div>
                          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}><i className="fa-regular fa-clock"></i> {next.time} &bull; Driver: <strong style={{ color: 'var(--text)' }}>{next.driver}</strong> &bull; ₹{next.price}</p>
                        </>
                      ) : (
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>No upcoming rides yet. Use Find a Ride to book your first seat.</p>
                      )}
                    </div>
                  </div>
                  <div className="search-card">
                    <h3><i className="fa-solid fa-bolt" style={{ color: 'var(--primary)' }}></i> Quick Actions</h3>
                    <div className="quick-list">
                      <button className="btn btn-primary" onClick={() => navigate('/find-ride')}><i className="fa-solid fa-magnifying-glass"></i> Find a Ride</button>
                      <button className="btn btn-secondary" onClick={() => navigate('/offer-ride')}><i className="fa-solid fa-circle-plus"></i> Offer a Ride</button>
                      <button className="btn btn-secondary" onClick={() => navigate('/profile')}><i className="fa-solid fa-id-card"></i> Edit Profile</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {tab === 'bookings' && (
              <div className="dash-content active" id="dashcontent-bookings">
                <div className="rides-list" id="my-bookings-list">
                  {myBookings.length === 0 ? (
                    <div className="state-box">No active reservations. Visit "Find Ride" to book.</div>
                  ) : myBookings.map((b) => (
                    <div className="ride-card" key={b.id}>
                      <div className="ride-header">
                        <div><span className="badge badge-success">Confirmed Reservation</span><h4 style={{ marginTop: '4px' }}>{b.origin} &rarr; {b.dest}</h4></div>
                        <strong style={{ color: 'var(--primary)', fontSize: '1.15rem' }}>₹{b.price}</strong>
                      </div>
                      <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '8px' }}><i className="fa-regular fa-clock"></i> {b.time} &bull; Driver: <strong>{b.driver}</strong></p>
                      <div style={{ background: 'var(--success-soft)', padding: '8px 12px', borderRadius: '6px', fontSize: '0.84rem', marginBottom: '10px' }}>
                        <strong>Unlocked Driver Contact:</strong> <a href={`tel:${b.phone}`} style={{ color: 'var(--primary)', fontWeight: 700 }}>{b.phone}</a>
                      </div>
                      <div className="ride-footer" style={{ borderTop: 'none', paddingTop: 0, justifyContent: 'flex-end' }}>
                        <button className="btn btn-sm btn-danger" onClick={() => run(() => cancelBooking(b.id), 'Booking cancelled and seat released.')}>
                          <i className="fa-solid fa-xmark"></i> Cancel Seat
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'offered' && (
              <div className="dash-content active" id="dashcontent-offered">
                <div className="rides-list" id="my-offered-list">
                  {offered.length === 0 ? (
                    <div className="state-box">You haven't posted a ride yet. Visit "Offer Ride" to publish one.</div>
                  ) : offered.map((r) => (
                    <div className="ride-card" key={r.id}>
                      <div className="ride-header">
                        <div><span className="badge badge-primary">Active Listing</span><h4 style={{ marginTop: '4px' }}>{r.origin} &rarr; {r.dest}</h4></div>
                        <div style={{ textAlign: 'right' }}><strong style={{ color: 'var(--primary)', fontSize: '1.15rem' }}>₹{r.price}</strong><small style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)' }}>per seat</small></div>
                      </div>
                      <div className="route-bar"><span><i className="fa-regular fa-clock"></i> {r.time} ({r.date})</span><span style={{ marginLeft: 'auto' }}>{r.seats} seat{r.seats === 1 ? '' : 's'} open</span></div>
                      <div className="ride-footer">
                        <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Vehicle: <strong>{r.model}</strong></span>
                        <button className="btn btn-sm btn-danger" onClick={() => run(() => deleteRide(r.id), 'Listing deleted.')}>
                          <i className="fa-solid fa-trash"></i> Delete Listing
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      </div>
    </main>
  );
}
