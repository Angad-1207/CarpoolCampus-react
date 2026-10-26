# CarpoolCampus

**Student carpooling web platform for Chitkara University, Punjab** — *Ride Together, Save Together.*

CarpoolCampus connects verified Chitkara students who have empty seats with fellow students travelling the same NH-64 corridor (Chandigarh, Mohali, Zirakpur, Panchkula, Ambala, Patiala → Rajpura campus).

This repository holds the **React version** of the project (Front End Engineering-II, Project Evaluation-II). The original HTML + CSS + JavaScript version (Evaluation-I) is preserved under the Git tag [`evaluation-1`](../../tree/evaluation-1).

## Features

- **Verified access** – sign up and sign in with an official `@chitkara.edu.in` email.
- **Find Ride** – filter by corridor search, city, maximum price, vehicle type and seats remaining; ladies-only filter; hide full rides; sort by time, fare or rating.
- **Book a seat** – one click reserves a seat; the driver's phone number unlocks only after booking.
- **Offer Ride** – validated route form with a live passenger preview of the ride card.
- **Dashboard** – overview, My Bookings (cancel a seat) and My Offered Rides (delete a listing).
- **Profile** – commuter pass card and an editable, validated profile form.
- **Extras** – student reviews, FAQ, About and campus safety directory, emergency SOS contacts, light/dark theme.

## React topics demonstrated (Evaluation-II)

| Topic | Where in the code |
|---|---|
| Navigation layout and page structure | `src/layouts/MainLayout.jsx`, `src/components/Navbar.jsx`, `Footer.jsx` |
| Multi-page single-page application, React Router | `src/main.jsx` (`BrowserRouter`), `src/App.jsx` (`Routes`, `Route`), `NavLink`, `Outlet`, `useNavigate`, `useSearchParams` |
| Form handling and validation | `src/hooks/useForm.js`, `src/utils/validators.js` |
| Reusable input components | `src/components/FormField.jsx`, `FormError.jsx` |

## Routes

| URL | Page |
|---|---|
| `/` | Home |
| `/find-ride` | Find Ride (`?q=Mohali` pre-fills the search) |
| `/offer-ride` | Offer Ride |
| `/dashboard` | Dashboard (sign-in prompt when logged out) |
| `/profile` | Profile (sign-in prompt when logged out) |
| `/about` | About and Safety directory |
| any other URL | Not Found page |

## Tech stack

- React 18
- React Router v6
- Vite
- CSS (one stylesheet: `src/styles/style.css`)
- JavaScript (ES6+)
- Browser `localStorage` for saved data

## Getting started

Requires **Node.js 18 or newer**.

```bash
git clone https://github.com/Angad-1207/CarpoolCampus.git
cd CarpoolCampus
npm install
npm run dev
```

Open the address shown in the terminal (usually http://localhost:5173).

| Command | What it does |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |

## Project structure

```
src/
  main.jsx                 BrowserRouter + <App/>
  App.jsx                  Routes + the hook that holds the app data
  styles/style.css         All styles
  layouts/MainLayout.jsx   Navbar + Outlet + modals + toasts + footer
  pages/                   Home, FindRide, OfferRide, Dashboard, Profile, About, NotFound
  components/              Navbar, Footer, Toast, Modal, AuthModals, FormField, FormError,
                           AboutSection, FeaturesPanel, FaqSection, ReviewsSection
  hooks/                   useForm.js, useAppState.js
  utils/                   validators.js, format.js, storage.js
  data/seed.js             Starter rides and reviews
```

## How the data works

- `App.jsx` calls `useAppState()` once. It holds the user, rides, bookings, theme, toasts and the open dialog, and passes them to the pages as one `app` prop.
- State used by only one component (filters, active tab, form values, FAQ open item) stays inside that component.
- All data is saved in the browser's `localStorage`. The storage keys are the same as in the Evaluation-I version, so existing saved data keeps working.

## Form validation rules

Defined in `src/utils/validators.js` and reused by every form:

- required fields; minimum text length
- valid email and `@chitkara.edu.in` domain
- 10-digit phone number
- seats between 1 and 6; price between ₹20 and ₹150
- departure date not in the past; valid time
- password confirmation must match

## Hosting

The server must return `index.html` for every URL so that refreshing a page such as `/dashboard` works.
Vite's dev and preview servers already do this. For another host, add a rule that redirects all paths to `/index.html`
(for example `try_files $uri /index.html;` in Nginx).

## Limitations

- There is **no backend**. Data lives in each browser's `localStorage`, so it is not shared between users or devices.
- Login is a **front-end demonstration only**: accounts and passwords are stored in the browser, and passwords are not hashed. It is not secure authentication.
- Possible future work: a Node.js/Express API with a database, hashed passwords and tokens, automated tests, and real-time ride updates.

## Team

Submitted to: **Dr. Kirandeep Singh**

| Name | Roll number |
|---|---|
| Amya Khanna (Leader) | 2510990279 |
| Bavika Arora | 2510991167 |
| Jasmeet Kaur | 2510991052 |
| Angad Singh Walia | 2510990376 |

## Version history

- **Evaluation-I** – HTML, CSS and JavaScript version: Git tag `evaluation-1`.
- **Evaluation-II** – React version with React Router and form handling (this branch / `main`).
