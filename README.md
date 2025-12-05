# FD Games Training Hub

A static landing page for the FD Games collection. The root `index.html` now renders the full hub without any dev server — just open the file in a browser to explore the training lineup and checklist.

## Features
- **Landing page:** Hero messaging, lineup cards, roadmap, and a daily checklist with local persistence (no backend required).
- **Furniture Sales Training Game:** Scenario-based multiple choice with scoring, feedback, and a product catalog modal (React source remains in `src`).
- **Policy Library:** Accordion-style references for common customer-facing policies (React source remains in `src`).

## Getting started
- Quick view: open `index.html` directly in your browser. No build or server needed.
- React build (optional):
  1. Install dependencies: `npm install`
  2. Run locally: `npm run dev`
  3. Build for production: `npm run build`

## Game checklist
Track progress as we expand the library.

- [x] Static landing page in `index.html` (HTML/CSS/JS only)
- [x] Furniture Sales Training Game prototype with scorekeeping
- [x] Policy reference view linked from the landing page
- [ ] Dedicated `start/` folder with per-game assets
- [ ] Game-specific README files and content briefs
- [ ] Additional training games and scenarios

## Project notes
- The landing hub runs entirely on static assets. Buttons in the lineup are placeholders for now; use the checklist to plan sessions.
- React components and styles are still available in `src` if you want to resume the interactive build later.
