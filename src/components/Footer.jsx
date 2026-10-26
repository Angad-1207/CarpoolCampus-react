import { Link } from 'react-router-dom';

const corridor = (q) => `/find-ride?q=${encodeURIComponent(q)}`;

export default function Footer({ app }) {
  const { openModal } = app;
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link to="/" className="f-brand"><div className="brand-title">Carpool<span>Campus</span></div><div className="brand-sub">Chitkara University &bull; Punjab</div></Link>
            <p className="f-desc">Official campus carpooling platform for students and staff of Chitkara University, Punjab. Fostering highway travel safety, peer collaboration, and green campus goals.</p>
          </div>
          <div className="footer-col">
            <h4>Navigation</h4>
            <ul>
              <li><Link to="/">Home Hub</Link></li>
              <li><Link to="/find-ride">Find Available Ride</Link></li>
              <li><Link to="/offer-ride">Offer Empty Seats</Link></li>
              <li><Link to="/dashboard">Commute Dashboard</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Campus Corridors</h4>
            <ul>
              <li><Link to={corridor('Chandigarh')}>Chandigarh Route</Link></li>
              <li><Link to={corridor('Mohali')}>Mohali Phase 7</Link></li>
              <li><Link to={corridor('Zirakpur,Panchkula')}>Zirakpur &bull; VIP Road</Link></li>
              <li><Link to={corridor('Patiala,Ambala')}>Patiala &bull; Rajpura Bypass</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Helpline &amp; Safety</h4>
            <ul>
              <li><i className="fa-solid fa-phone"></i>Security: 01762-507084</li>
              <li><i className="fa-solid fa-truck-medical"></i>Medical: 01762-507000</li>
              <li><a onClick={() => openModal('sos')}><i className="fa-solid fa-shield-halved"></i>Emergency SOS Portal</a></li>
              <li><Link to="/about#safety-directory"><i className="fa-solid fa-circle-info"></i>Safety Guidelines</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 CarpoolCampus &bull; Chitkara University, Punjab.</span>
          <span>Designed with <i className="fa-solid fa-heart"></i> for Chitkarians</span>
        </div>
      </div>
    </footer>
  );
}
