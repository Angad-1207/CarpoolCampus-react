export function initials(name) {
  return String(name || '?').trim().substring(0, 2).toUpperCase();
}

// "08:15 AM" / "7:40 PM" -> minutes since midnight (used for sorting)
export function toMinutes(t) {
  const m = String(t || '').match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if (!m) return 0;
  let h = +m[1];
  const ap = (m[3] || '').toUpperCase();
  if (ap === 'PM' && h < 12) h += 12;
  if (ap === 'AM' && h === 12) h = 0;
  return h * 60 + +m[2];
}

// "08:15" (24h input value) -> "08:15 AM"
export function fmtTime(t24) {
  const [h, m] = String(t24).split(':').map(Number);
  return `${String(h % 12 || 12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
}

export function tomorrowISO() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

export function todayISO() {
  return new Date().toISOString().split('T')[0];
}

// Keeps only 10 digits (drops a leading 91) – same rule as the original site
export function phoneDigits(raw) {
  return String(raw || '').replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '');
}

export function formatPhone(raw) {
  const d = phoneDigits(raw);
  return `+91 ${d.slice(0, 5)} ${d.slice(5)}`;
}

// 0..4 password strength (same scoring as the original)
export function passScore(p) {
  let s = 0;
  if (p.length >= 8) s++;
  if (/[a-z]/.test(p) && /[A-Z]/.test(p)) s++;
  if (/\d/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return s;
}
