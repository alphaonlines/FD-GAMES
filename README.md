# FD Games Training Hub

A React + TypeScript + Vite landing experience for the FD Games collection. The root `index.html` hosts a home screen that routes
into the Furniture Sales Training Game and quick policy references.

## Features
- **Landing page:** Hero messaging with quick-start buttons and feature highlights for the current training experiences.
- **Furniture Sales Training Game:** Scenario-based multiple choice training with scoring, feedback, and a product catalog modal.
- **Policy Library:** Accordion-style references for common customer-facing policies.

## Getting started
1. Install dependencies: `npm install`
2. Run locally: `npm run dev`
3. Build for production: `npm run build`

## Game checklist
Track progress as we expand the library.

- [x] Landing page entry point in `index.html` and React UI
- [x] Furniture Sales Training Game prototype with scorekeeping
- [x] Policy reference view linked from the landing page
- [ ] Dedicated `start/` folder with per-game assets
- [ ] Game-specific README files and content briefs
- [ ] Additional training games and scenarios

## Project notes
- The landing view is the default route and uses the top navigation to jump into the existing game and policy views.
- Styling uses Bootstrap 5 plus light custom theming in `src/App.css`.
