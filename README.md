# FD Games Training Hub

A static landing page for the FD Games collection. The root `index.html` renders the full hub without any dev server — just open the file in a browser to explore the training lineup, roadmap, and checklists.

## Features
- **Landing page:** Hero messaging, lineup cards for every kiosk game, roadmap, and a daily checklist with local persistence (no backend required).
- **Game skeletons:** Static HTML/CSS/JS shells for every title live in `games/` and open directly from the landing cards.
- **Game briefs:** `start/` includes stubs for each game with gameplay, controls, scoring, and branding hooks.
- **Furniture Sales Training Game:** Scenario-based multiple choice with scoring, feedback, and a product catalog modal (React source remains in `src`).
- **Policy Library:** Accordion-style references for common customer-facing policies (React source remains in `src`).

## Getting started
- Quick view: open `index.html` directly in your browser. No build or server needed. Use the lineup buttons to launch each game skeleton.
- React build (optional):
  1. Install dependencies: `npm install`
  2. Run locally: `npm run dev`
  3. Build for production: `npm run build`

## Game catalog
Starter briefs live in `start/` for the following titles:

1. Couch Stack (balance/placement)
2. Room Rush (timed design puzzle)
3. Find the Deal (hidden-object showroom)
4. Memory Match: Furniture Edition
5. Swipe Sort: Bedroom vs Living Room
6. Price Is Right (Furniture Edition)
7. Delivery Dash (lane runner)
8. Rug Runner (endless runner)
9. Build-a-Room: Before/After
10. Sofa Tetris

## Game build checklist
Track progress as we expand the library.

- [x] Static landing page in `index.html` (HTML/CSS/JS only)
- [x] Static skeleton pages for each game in `games/`
- [x] Furniture Sales Training Game prototype with scorekeeping
- [x] Policy reference view linked from the landing page
- [x] Dedicated `start/` folder with per-game briefs
- [ ] Game-specific assets and prototypes added per title
- [ ] Leaderboard + session tracking design

## Project notes
- The landing hub runs entirely on static assets. Lineup buttons now open each game skeleton directly.
- React components and styles are still available in `src` if you want to resume the interactive build later.
