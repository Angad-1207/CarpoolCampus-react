import { Link, NavLink, useNavigate } from 'react-router-dom';
import { initials } from '../utils/format';

// NavLink gives us `isActive` from the current URL, so the highlighted item always matches the route.
const linkClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`;

export default function Navbar({ app }) {
  const { user, theme, toggleTheme, openModal } = app;
  const navigate = useNavigate();

  return (
    <header className="site-header">
      <div className="container navbar">
        <Link to="/" className="nav-brand">
          <div className="brand-title">Carpool<span>Campus</span></div>
          <div className="brand-sub">Chitkara University &bull; Punjab</div>
        </Link>
        <nav className="nav-links">
          <NavLink to="/" end className={linkClass}><i className="fa-solid fa-house"></i><span>Home</span></NavLink>
          <NavLink to="/find-ride" className={linkClass}><i className="fa-solid fa-magnifying-glass"></i><span>Find Ride</span></NavLink>
          <NavLink to="/offer-ride" className={linkClass}><i className="fa-solid fa-circle-plus"></i><span>Offer Ride</span></NavLink>
          <NavLink to="/dashboard" className={linkClass}><i className="fa-solid fa-gauge-high"></i><span>Dashboard</span></NavLink>
          <NavLink to="/profile" className={linkClass}><i className="fa-solid fa-id-card"></i><span>Profile</span></NavLink>
          <NavLink to="/about" className={linkClass}><i className="fa-solid fa-circle-info"></i><span>About</span></NavLink>
        </nav>
        <div className="nav-actions">
          <button className="icon-btn theme-toggle" id="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode" title="Toggle dark mode">
            <i className={theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'}></i>
          </button>
          <button className="icon-btn sos-btn" onClick={() => openModal('sos')} aria-label="Emergency contacts" title="Emergency contacts"><i className="fa-solid fa-shield-halved"></i></button>
          {user ? (
            <button className="user-chip" id="user-chip" style={{ display: 'inline-flex' }} onClick={() => navigate('/profile')} title="Open your profile">
              <span className="uc-avatar">{initials(user.name)}</span>
              <span id="user-chip-name">{String(user.name || '').trim().split(' ')[0]}</span>
            </button>
          ) : (
            <>
              <button className="btn btn-primary btn-sm" onClick={() => openModal('login')}>Login</button>
              <button className="btn btn-secondary btn-sm" onClick={() => openModal('signup')}>Sign Up</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
