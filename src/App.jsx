import { Routes, Route } from 'react-router-dom';
import useAppState from './hooks/useAppState';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import FindRide from './pages/FindRide';
import OfferRide from './pages/OfferRide';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import About from './pages/About';
import NotFound from './pages/NotFound';

// App owns the shared data (user, rides, bookings...) and hands it to pages through the `app` prop.
// MainLayout is the shared frame; each child route is drawn inside its <Outlet />.
export default function App() {
  const app = useAppState();
  return (
    <Routes>
      <Route element={<MainLayout app={app} />}>
        <Route index element={<Home app={app} />} />
        <Route path="find-ride" element={<FindRide app={app} />} />
        <Route path="offer-ride" element={<OfferRide app={app} />} />
        <Route path="dashboard" element={<Dashboard app={app} />} />
        <Route path="profile" element={<Profile app={app} />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
