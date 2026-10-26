import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Toast from '../components/Toast';
import AuthModals from '../components/AuthModals';

// Shared page frame. Every route renders inside <Outlet />, so the navbar/footer are never reloaded.
export default function MainLayout({ app }) {
  const { pathname, hash } = useLocation();

  // new page -> scroll to top (as the original navigate() did); /about#safety-directory -> scroll to that section
  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => {
        const el = document.getElementById(hash.slice(1));
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
      return () => clearTimeout(t);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return undefined;
  }, [pathname, hash]);

  return (
    <>
      <div className="announcement-bar">
        <span><i className="fa-solid fa-leaf"></i> <strong>Chitkara University CarpoolCampus:</strong> Verified Peer Commute Network (NH-64)</span>
      </div>
      <Navbar app={app} />
      <Outlet />
      <AuthModals app={app} />
      <Toast app={app} />
      <Footer app={app} />
    </>
  );
}
