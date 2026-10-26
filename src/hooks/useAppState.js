import { useEffect, useState } from 'react';
import { Store, save, initStorage } from '../utils/storage';
import { STORAGE_KEYS, USERS_KEY, THEME_KEY, INITIAL_RIDES } from '../data/seed';
import { formatPhone } from '../utils/format';

// ONE hook that holds the data shared by several pages (user, rides, bookings, theme, toasts, open modal).
// App.jsx calls it once and passes the result to the pages as the `app` prop.
// NOTE: login is a FRONT-END DEMO (users + plain-text passwords in localStorage, like the original site). Not secure.
const withoutPassword = (u) => { const { password, ...safe } = u; return safe; };
let toastId = 0;

export default function useAppState() {
  const [rides, setRides] = useState(() => { initStorage(); return Store.get(STORAGE_KEYS.RIDES, INITIAL_RIDES); });
  const [bookings, setBookings] = useState(() => Store.get(STORAGE_KEYS.BOOKINGS, []));
  const [user, setUser] = useState(() => Store.get(STORAGE_KEYS.CURRENT_USER, null));
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'light');
  const [toasts, setToasts] = useState([]);
  const [activeModal, setActiveModal] = useState(null); // 'login' | 'signup' | 'sos' | null

  useEffect(() => { document.documentElement.setAttribute('data-theme', theme); }, [theme]);

  // ---- UI helpers ----
  const notify = (message, type = 'success') => { toastId += 1; setToasts((prev) => [...prev, { id: toastId, message, type }]); };
  const dismissToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));
  const openModal = (name) => setActiveModal(name);
  const closeModal = () => setActiveModal(null);
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try { localStorage.setItem(THEME_KEY, next); } catch { /* ignore */ }
  };

  // ---- account (throw an Error with a readable message; the form shows it) ----
  const login = (emailRaw, password) => {
    const email = emailRaw.trim().toLowerCase();
    const found = Store.get(USERS_KEY, []).find((u) => u.email === email);
    if (!found) throw new Error('No account found for this email. Please sign up first.');
    if (found.password !== password) throw new Error('Incorrect password. Please try again.');
    const safe = withoutPassword(found);
    save(STORAGE_KEYS.CURRENT_USER, safe);
    setUser(safe);
    return safe;
  };

  const signup = ({ name, email: emailRaw, studentId, dept, year, phone, password }) => {
    const email = emailRaw.trim().toLowerCase();
    const users = Store.get(USERS_KEY, []);
    if (users.some((u) => u.email === email)) throw new Error('An account with this email already exists. Please log in.');
    const created = { name: name.trim(), email, studentId: studentId.trim(), dept, year, phone: formatPhone(phone), password };
    save(USERS_KEY, [...users, created]);
    const safe = withoutPassword(created);
    save(STORAGE_KEYS.CURRENT_USER, safe);
    setUser(safe);
    return safe;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    setUser(null);
  };

  const updateProfile = ({ name, studentId, dept, year, phone }) => {
    if (!user) throw new Error('Please sign in first.');
    const updated = { ...user, name: name.trim(), studentId: studentId.trim(), dept, year, phone: formatPhone(phone) };
    const users = Store.get(USERS_KEY, []);
    const i = users.findIndex((u) => u.email === user.email);
    if (i > -1) { users[i] = { ...users[i], name: updated.name, studentId: updated.studentId, dept: updated.dept, year: updated.year, phone: updated.phone }; save(USERS_KEY, users); }
    save(STORAGE_KEYS.CURRENT_USER, updated);
    setUser(updated);
    return updated;
  };

  // ---- rides ----
  const addRide = (ride) => { const next = [ride, ...rides]; save(STORAGE_KEYS.RIDES, next); setRides(next); };
  const deleteRide = (rideId) => { const next = rides.filter((r) => r.id !== rideId); save(STORAGE_KEYS.RIDES, next); setRides(next); };

  // ---- bookings ----
  const bookRide = (rideId) => {
    if (!user) throw new Error('Please sign in to book a ride.');
    const ride = rides.find((r) => r.id === rideId);
    if (!ride) throw new Error('This ride is no longer available.');
    if (ride.seats <= 0) throw new Error('Sorry, this ride is already full.');
    const nextRides = rides.map((r) => (r.id === rideId ? { ...r, seats: r.seats - 1 } : r));
    const booking = { id: 'bk-' + Date.now(), user: user.email, rideId: ride.id, driver: ride.driver, phone: ride.phone, origin: ride.origin, dest: ride.dest, time: ride.time, price: ride.price };
    const nextBookings = [booking, ...bookings];
    try {
      save(STORAGE_KEYS.RIDES, nextRides);
      save(STORAGE_KEYS.BOOKINGS, nextBookings);
    } catch (err) {
      Store.set(STORAGE_KEYS.RIDES, rides); // undo the seat change if the booking could not be saved
      throw err;
    }
    setRides(nextRides);
    setBookings(nextBookings);
    return booking;
  };

  const cancelBooking = (bookingId) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) throw new Error('This booking no longer exists.');
    const nextBookings = bookings.filter((b) => b.id !== bookingId);
    const nextRides = rides.map((r) => (r.id === booking.rideId ? { ...r, seats: r.seats + 1 } : r));
    save(STORAGE_KEYS.BOOKINGS, nextBookings);
    save(STORAGE_KEYS.RIDES, nextRides);
    setBookings(nextBookings);
    setRides(nextRides);
  };

  const myBookings = user ? bookings.filter((b) => b.user === user.email) : [];

  return {
    user, rides, bookings, myBookings, theme, toasts, activeModal,
    notify, dismissToast, openModal, closeModal, toggleTheme,
    login, signup, logout, updateProfile, addRide, deleteRide, bookRide, cancelBooking,
  };
}
