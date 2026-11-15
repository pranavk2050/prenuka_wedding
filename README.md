# Pranav & Renuka Wedding — Management App 💍

A full wedding management dashboard for **Pranav Dnyaneshwar Kulkarni & Renuka Pandurang Kulkarni**  
**12 February 2027 · Coco Resort, Punawale, Pune**  
Marathi Deshasth Rigvedi · Vivah Sohala

---

## Features

- **Countdown Timer** — Live animated countdown to the wedding day
- **Dashboard** — Progress overview with charts (guests, tasks, budget)
- **Schedule** — Full programme for Feb 11 (Srimant Pujan & Sangeet) and Feb 12 (Vivah Sohala)
- **Guest Manager** — Dual-side lists (Pranav's 50 / Renuka's 50 stay guests + 350 wedding day)
- **Task Checklist** — 48 pre-seeded Marathi wedding tasks across 10 categories
- **Budget Tracker** — Category-wise spending with ₹25L pre-configured
- **Vendor Manager** — 10 vendor categories (catering, photography, decor, priest, etc.)
- **Venue Info** — Coco Resort details, room allocation, map

---

## Edit & Sync (Both Sides)

1. Click **Edit** in the top-right navbar to unlock all edit controls
2. Add guests, tick tasks, update budget — all changes save automatically to your browser
3. To share updates with the other side:
   - Click **Export** (navbar) → saves `pranav-renuka-wedding-YYYY-MM-DD.json`
   - Share the file via WhatsApp/email
   - Other person clicks **Import** → loads your data into their browser

---

## Deploy to GitHub Pages

### First-time setup (run once)

```bash
# From the prenuka_wedding folder:
git init
git add .
git commit -m "Pranav & Renuka wedding app — initial"
git remote add origin https://github.com/YOUR_USERNAME/prenuka_wedding.git
git push -u origin main
```

Then in GitHub:
1. Go to **Settings → Pages**
2. Source → **GitHub Actions**
3. Wait ~2 minutes → live at `https://YOUR_USERNAME.github.io/prenuka_wedding/`

Share this URL with Renuka!

### After that — auto-deploy

Any push to `main` automatically rebuilds and deploys the site.

---

## Run locally

```bash
npm install
npm run dev
# Open http://localhost:5173/prenuka_wedding/
```

---

## Tech stack

React 18 · Vite 5 · Tailwind CSS 3 · Framer Motion · Recharts · Zustand · React Router (HashRouter)
