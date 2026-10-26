import { Link } from 'react-router-dom';

// Shown by <Route path="*"> for any URL that matches no other route. Reuses the .guest-prompt card style.
export default function NotFound() {
  return (
    <main id="view-not-found" className="view-section active">
      <div className="container">
        <div className="guest-prompt">
          <i className="fa-solid fa-triangle-exclamation"></i>
          <h3>Page not found</h3>
          <p>We couldn't find the page you were looking for. It may have been moved, or the address may be mistyped.</p>
          <div className="guest-btns">
            <Link to="/" className="btn btn-primary"><i className="fa-solid fa-house"></i> Back to Home</Link>
            <Link to="/find-ride" className="btn btn-secondary"><i className="fa-solid fa-magnifying-glass"></i> Find a Ride</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
