// Tiny wrapper around localStorage (same behaviour as the original site) + first-run seeding.
import {
  STORAGE_KEYS, USERS_KEY, REVIEWS_KEY,
  INITIAL_RIDES, INITIAL_REVIEWS, DATA_VERSION, DATA_VERSION_KEY,
} from '../data/seed';

export const Store = {
  get(key, fallback) {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : fallback;
    } catch {
      return fallback;
    }
  },
  // returns true/false so callers can detect a failed write (quota full, private mode...)
  set(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
      return true;
    } catch {
      return false;
    }
  },
};

// Like Store.set but throws, so the UI can show an error message
export function save(key, value) {
  if (!Store.set(key, value)) throw new Error('Could not save to browser storage. It may be full or blocked.');
  return value;
}

// Same seeding / upgrade logic as the original initApp() + seedRides()
function seedRides() {
  const stored = Store.get(STORAGE_KEYS.RIDES, null);
  if (!stored) {
    Store.set(STORAGE_KEYS.RIDES, INITIAL_RIDES);
  } else if (localStorage.getItem(DATA_VERSION_KEY) !== DATA_VERSION) {
    const mine = stored.filter((r) => r.owner);
    const fresh = INITIAL_RIDES.map((i) => {
      const old = stored.find((r) => r.id === i.id);
      return old ? { ...i, seats: old.seats } : i;
    });
    Store.set(STORAGE_KEYS.RIDES, [...mine, ...fresh]);
  }
  try { localStorage.setItem(DATA_VERSION_KEY, DATA_VERSION); } catch { /* ignore */ }
}

export function initStorage() {
  seedRides();
  if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) Store.set(STORAGE_KEYS.BOOKINGS, []);
  if (!localStorage.getItem(REVIEWS_KEY)) Store.set(REVIEWS_KEY, INITIAL_REVIEWS);
  if (!localStorage.getItem(USERS_KEY)) Store.set(USERS_KEY, []);
}
