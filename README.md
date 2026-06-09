# Green Leaves

Pitch & planning site for **Green Leaves** — a 24/7 highway restaurant + EV charging station on
the East–West Highway between Butwal and Sunwal, Nepal. It works as a pitch to lenders/partners,
a plan of the offering and attractions, and a tracker for build milestones and budget.

Built with **React + Vite + Tailwind CSS v4**.

## Develop

```bash
bun install      # install dependencies
bun run dev      # start dev server → http://localhost:5173
bun run build    # production build → dist/
bun run preview  # preview the production build
```

(`npm` works too — `npm install`, `npm run dev`, etc.)

## Editing content

All copy lives in one file: **`src/data/plan.js`**.

- `BUSINESS` — name, tagline, location, pitch. **Rename the business by changing `BUSINESS.name`.**
- `OFFERINGS`, `OPPORTUNITY`, `EXPERIENCE`, `ATTRACTIONS`, `LOCATION_OPTIONS` — marketing content.
- `SEED_MILESTONES` — the roadmap checklist (items with `phase: 'future'` show greyed and don't
  count toward progress).
- `BUDGET` — default cost line items for the admin cost tracker.

## Admin cost tracker

The budget tracker is **not linked in the main nav**. Reach it at:

```
http://localhost:5173/#admin
```

(There's also a discreet "Admin" link in the footer.) It asks for a PIN before showing costs.

- Change the PIN via **`ADMIN_PIN`** in `src/data/plan.js`.
- Budget edits and milestone ticks are saved in the browser (`localStorage`).

> ⚠️ **Security note:** the PIN gate runs in the browser. It hides the cost section from casual
> viewers, but the numbers are present in the page source and are **not truly private**. If the
> budget must stay confidential, don't deploy it publicly — keep it on your local machine, or move
> it behind a real backend.

## Deploy (free)

The build output in `dist/` is static and can be hosted on **GitHub Pages** or **Netlify**:

- **Netlify:** build command `bun run build` (or `npm run build`), publish directory `dist`.
- **GitHub Pages:** push `dist/` (or use an action). If serving from a subpath, set Vite's `base`
  in `vite.config.js`.
