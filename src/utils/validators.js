// Reusable validation rules.
// A rule is a function (value, allValues) => '' (valid) or 'error message'.
// A schema maps a field name to an array of rules; the first failing rule wins.
import { phoneDigits, todayISO } from './format';

export const required = (label) => (v) => (String(v ?? '').trim() ? '' : `${label} is required.`);

export const minLength = (n, message) => (v) => (String(v ?? '').trim().length >= n ? '' : message);

export const email = (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || '').trim()) ? '' : 'Enter a valid email address.');

export const chitkaraEmail = (v) =>
  String(v || '').trim().toLowerCase().endsWith('@chitkara.edu.in') ? '' : 'Must be an official @chitkara.edu.in university email.';

export const phone10 = (v) => (/^\d{10}$/.test(phoneDigits(v)) ? '' : 'Enter a valid 10-digit phone number.');

// whole number between min and max (seat counts, prices)
export const intBetween = (min, max, label) => (v) => {
  const s = String(v ?? '').trim();
  if (!/^-?\d+$/.test(s)) return `${label} must be a whole number.`;
  const n = parseInt(s, 10);
  return n >= min && n <= max ? '' : `${label} must be between ${min} and ${max}.`;
};

export const dateNotInPast = (label) => (v) => (String(v) >= todayISO() ? '' : `${label} cannot be in the past.`);

export const validTime = (v) => (/^([01]\d|2[0-3]):[0-5]\d$/.test(String(v || '')) ? '' : 'Enter a valid time.');

export const matchesField = (otherName, message) => (v, all) => (v === all[otherName] ? '' : message);

export function validateField(name, values, schema) {
  const rules = schema[name] || [];
  for (const rule of rules) {
    const msg = rule(values[name], values);
    if (msg) return msg;
  }
  return '';
}

export function validate(values, schema) {
  const errors = {};
  Object.keys(schema).forEach((name) => {
    const msg = validateField(name, values, schema);
    if (msg) errors[name] = msg;
  });
  return errors;
}
