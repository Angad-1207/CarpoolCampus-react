import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { initials, toMinutes } from '../utils/format';

const DEFAULT_FILTERS = { city: 'all', maxPrice: 100, vehicle: 'all', minSeats: 0, ladies: false, hideFull: true, sortBy: 'time' };
const CITIES = ['Chandigarh', 'Mohali', 'Zirakpur', 'Panchkula', 'Ambala', 'Patiala', 'Rajpura'];

export default function FindRide({ app }) {
  const { user, rides, bookRide, notify, openModal } = app;
  const isLoggedIn = !!user;

  // The search text lives in the URL (?q=Mohali) so Home chips / corridor cards / footer links can set it.
  const [params, setParams] = useSearchParams();
  const search = params.get('q') || '';
  const setSearch = (value) => setParams(value ? { q: value } : {}, { replace: true });

  // All other filters are local UI state – only this page needs them.
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const setFilter = (key, value) => setFilters((f) => ({ ...f, [key]: value }));

  // Derived list: recalculated only when rides/filters/search change
  const filtered = useMemo(() => {
    const terms = search.toLowerCase().split(',').map((t) => t.trim()).filter(Boolean);
    const list = rides.filter((r) => {
      const o = r.origin.toLowerCase();
      if (r.price > filters.maxPrice) return false;
      if (filters.vehicle !== 'all' && r.vehicle !== filters.vehicle) return false;
      if (filters.hideFull && r.seats <= 0) return false;
      if (filters.minSeats > 0 && r.seats < filters.minSeats) return false;
      if (filters.ladies && !(r.amen || []).includes('Ladies Only')) return false;
      if (filters.city !== 'all' && !o.includes(filters.city.toLowerCase())) return false;
      if (terms.length && !terms.some((t) => o.includes(t))) return false;
      return true;
    });
    return [...list].sort((a, b) => (filters.sortBy === 'fare' ? a.price - b.price
      : filters.sortBy === 'rating' ? (b.rating || 0) - (a.rating || 0)
      : (String(a.date || '').localeCompare(String(b.date || '')) || toMinutes(a.time) - toMinutes(b.time))));
  }, [rides, filters, search]);

  const resetFilters = () => { setFilters(DEFAULT_FILTERS); setSearch(''); };

  const handleBook = (ride) => {
    if (!isLoggedIn) { notify('Please sign in to book a ride.'); openModal('login'); return; }
    try {
      const b = bookRide(ride.id);
      notify(`Seat reserved with ${b.driver}! Phone unlocked in Dashboard.`);
    } catch (err) {
      notify(err.message || 'Could not book this ride.', 'error');
    }
  };

  const countLabel = `Showing ${filtered.length} verified campus commute${filtered.length === 1 ? '' : 's'}`;

  return (
    <main id="view-find-ride" className="view-section active">
      <div className="container find-layout">
        <aside className="filter-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <strong style={{ fontSize: '0.95rem' }}><i className="fa-solid fa-filter"></i> Filters</strong>
            <button className="btn btn-sm btn-secondary" onClick={resetFilters}>Reset</button>
          </div>
          <div className="form-group"><label className="form-label" htmlFor="filter-search-input">Search Corridor</label>
            <input type="text" id="filter-search-input" className="form-control" placeholder="Origin or Stop..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>
          <div className="form-group">
            <label className="form-label" htmlFor="filter-city">City</label>
            <select id="filter-city" className="form-control" value={filters.city} onChange={(e) => setFilter('city', e.target.value)}>
              <option value="all">All Cities</option>
              {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group"><label className="form-label" htmlFor="filter-price">Max Price: <span id="price-val" style={{ color: 'var(--primary)' }}>₹{filters.maxPrice}</span></label>
            <input type="range" id="filter-price" min="40" max="150" value={filters.maxPrice} style={{ width: '100%', accentColor: 'var(--primary)' }} onChange={(e) => setFilter('maxPrice', parseInt(e.target.value, 10))} /></div>
          <div className="form-group">
            <label className="form-label" htmlFor="filter-vehicle">Vehicle Category</label>
            <select id="filter-vehicle" className="form-control" value={filters.vehicle} onChange={(e) => setFilter('vehicle', e.target.value)}>
              <option value="all">All Vehicles</option><option value="Car">Four Wheeler</option><option value="Bike">Two-Wheeler (Bike)</option>
            </select>
          </div>
          <div className="filter-divider"></div>
          <div className="form-group">
            <label className="form-label">Seats Remaining</label>
            {[[0, 'Any Seats'], [2, '2+ Seats Remaining'], [3, '3+ Seats Remaining']].map(([val, text]) => (
              <label className="radio-option" key={val}><input type="radio" name="seats-filter" value={val} checked={filters.minSeats === val} onChange={() => setFilter('minSeats', val)} /> {text}</label>
            ))}
          </div>
          <div className="filter-divider"></div>
          <div className="form-group" style={{ marginBottom: '12px' }}>
            <label className="chk-row"><input type="checkbox" id="filter-ladies" checked={filters.ladies} onChange={(e) => setFilter('ladies', e.target.checked)} /> <i className="fa-solid fa-person-dress"></i> Ladies Only Commute</label>
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', fontWeight: 600, cursor: 'pointer' }}><input type="checkbox" id="filter-hide-full" checked={filters.hideFull} onChange={(e) => setFilter('hideFull', e.target.checked)} style={{ accentColor: 'var(--primary)' }} /> <i className="fa-solid fa-eye-slash"></i> Auto-hide full rides</label>
          </div>
        </aside>

        <section>
          <div className="rides-head">
            <div><h2 style={{ fontSize: '1.9rem', lineHeight: 1.2 }}>Available University Carpools</h2><div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }} id="rides-count-label">{countLabel}</div></div>
            <div className="sort-wrap"><label htmlFor="sort-by">Sort By:</label>
              <select id="sort-by" className="form-control" value={filters.sortBy} onChange={(e) => setFilter('sortBy', e.target.value)}>
                <option value="time">Earliest Departure</option><option value="fare">Lowest Fare (₹)</option><option value="rating">Highest Driver Rating</option>
              </select>
            </div>
          </div>
          <div className="rides-list" id="rides-container">
              {filtered.length === 0 ? (
                <div className="state-box">No matching campus carpools found.</div>
              ) : filtered.map((r) => {
                return (
                  <div className="ride-card" key={r.id}>
                    <div className="ride-header">
                      <div className="driver-meta">
                        <div className="avatar-circle">{initials(r.driver)}</div>
                        <div>
                          <div className="drv-name">{r.driver} <i className="fa-solid fa-circle-check"></i></div>
                          <div className="drv-sub">{r.rating ? <><span className="star">★ {Number(r.rating).toFixed(1)}</span> • </> : 'New driver • '}{r.model} ({r.vehicle})</div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}><div className="price-big">₹{r.price}</div><small style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>per passenger seat</small></div>
                    </div>
                    <div className="route-bar">
                      <span><i className="fa-solid fa-location-dot" style={{ color: 'var(--primary)' }}></i> {r.origin}</span>
                      <i className="fa-solid fa-arrow-right rb-arrow"></i>
                      <span><i className="fa-solid fa-flag-checkered" style={{ color: 'var(--accent)' }}></i> {r.dest}</span>
                      <span className="rb-time"><i className="fa-regular fa-clock"></i> {r.time} • {r.date}</span>
                    </div>
                    {r.amen && r.amen.length > 0 && (
                      <div className="amen-row">{r.amen.map((a) => <span className="amen" key={a}><i className="fa-solid fa-check"></i>{a}</span>)}</div>
                    )}
                    <div className="ride-footer">
                      <span style={{ fontSize: '0.88rem', fontWeight: 700, color: r.seats > 0 ? 'var(--success)' : 'var(--danger)' }}><i className="fa-solid fa-chair"></i> {r.seats > 0 ? `${r.seats} seat${r.seats === 1 ? '' : 's'} remaining` : 'Full'}</span>
                      <button className="btn btn-sm btn-primary btn-book" onClick={() => handleBook(r)} disabled={r.seats <= 0}>
                        <i className="fa-solid fa-ticket"></i> {r.seats > 0 ? 'Book Seat' : 'Full'}
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
      </div>
    </main>
  );
}
