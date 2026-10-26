import AboutSection from '../components/AboutSection';

// /about reuses the same About + Safety Directory component the Home page shows (no duplicated markup).
export default function About() {
  return (
    <main id="view-about" className="view-section active">
      <AboutSection compact />
    </main>
  );
}
