import React from 'react';

type View = 'landing' | 'game' | 'snap-fit' | 'policies';

interface LandingProps {
  onSelectView: (view: View) => void;
}

const games = [
  {
    id: 'furniture-game',
    title: 'Furniture Sales Training Game',
    description:
      'Practice real-world sales scenarios, explore the product catalog, and sharpen your policy knowledge with quick feedback.',
    action: 'Start Training',
    view: 'game' as View,
    duration: '15-20 min',
    focus: ['Customer discovery', 'Objection handling'],
  },
  {
    id: 'snap-fit',
    title: 'Room Designer — Snap Fit',
    description: 'Drag and snap furniture into place, beat the timer, and chase the Showroom Pro badge with zero mistakes.',
    action: 'Open Snap Fit',
    view: 'snap-fit' as View,
    duration: '5-10 min',
    focus: ['Spatial planning', 'Quick accuracy'],
  },
  {
    id: 'policy-library',
    title: 'Policy Library',
    description: 'Review quick-reference policies to back up your recommendations and stay compliant during conversations.',
    action: 'Open Policies',
    view: 'policies' as View,
    duration: '5 min',
    focus: ['Returns', 'Delivery expectations'],
  },
];

const highlights = [
  {
    title: 'Progress at a Glance',
    body: 'Track your score, chase a new high score, and return to any scenario to keep improving.',
  },
  {
    title: 'Built for Coaching',
    body: 'Use the detailed feedback to reinforce best practices and share product talking points.',
  },
  {
    title: 'Expandable Catalog',
    body: 'Easily extend the experience with new games or learning modules as the library grows.',
  },
];

const stats = [
  { label: 'Scenario drills', value: '12', detail: 'Role-play prompts with instant feedback' },
  { label: 'Products covered', value: '18', detail: 'Catalog items with talking points' },
  { label: 'Policies', value: '6', detail: 'Quick references to back up your guidance' },
];

const steps = [
  {
    title: 'Warm up with policies',
    detail: 'Skim returns, delivery, and warranty guidelines so you can speak with confidence.',
  },
  {
    title: 'Run a game session',
    detail: 'Jump into scenarios, choose your responses, and review the coaching notes after each turn.',
  },
  {
    title: 'Review the catalog',
    detail: 'Open product details and practice explaining why each item fits different customer needs.',
  },
];

const roadmap = [
  { title: 'Financing pathfinder', detail: 'Guide customers through approvals and set expectations.', status: 'Planned' },
  { title: 'Delivery day prep', detail: 'Handle scheduling, access checks, and common delays.', status: 'Planned' },
  { title: 'Merchandising mini-game', detail: 'Pair products and style bundles to boost ticket size.', status: 'In design' },
];

const Landing: React.FC<LandingProps> = ({ onSelectView }) => {
  return (
    <div className="landing-page">
      <section className="hero py-5">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-7 text-start">
              <div className="d-inline-flex align-items-center gap-2 hero-pill mb-3">
                <span className="dot" aria-hidden="true"></span>
                <span className="fw-semibold">Training hub</span>
                <span className="divider" aria-hidden="true">•</span>
                <span className="text-muted">Updated daily</span>
              </div>
              <h1 className="display-5 fw-bold mb-3">FD Games keeps your floor ready to win</h1>
              <p className="lead text-muted mb-4">
                Launch into focused training games, refresh policy details, and get coaching tips before your next customer
                conversation—all from one landing page.
              </p>
              <div className="d-flex flex-wrap gap-3 mb-4">
                <button className="btn btn-primary btn-lg" onClick={() => onSelectView('game')}>
                  Start the Furniture Game
                </button>
                <button className="btn btn-outline-light btn-lg text-dark" onClick={() => onSelectView('policies')}>
                  Review Policies
                </button>
              </div>
              <div className="d-flex flex-wrap gap-3 hero-stats">
                {stats.map((stat) => (
                  <div className="stat-card" key={stat.label}>
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                    <p className="stat-detail mb-0">{stat.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-5">
              <div className="card shadow-sm border-0 landing-card">
                <div className="card-body text-start">
                  <p className="text-uppercase text-muted fw-semibold mb-2">Session starter</p>
                  <h3 className="h4 mb-3">Plan a focused 15-minute refresh</h3>
                  <ul className="list-unstyled checklist mb-4">
                    <li>
                      <span className="check">✓</span>
                      Choose a scenario track and set a goal for your score.
                    </li>
                    <li>
                      <span className="check">✓</span>
                      Keep the policy library open for quick lookups mid-game.
                    </li>
                    <li>
                      <span className="check">✓</span>
                      Bookmark product cards you want to pitch this week.
                    </li>
                  </ul>
                  <div className="d-flex align-items-center gap-3">
                    <div className="avatar" aria-hidden="true">🎯</div>
                    <div>
                      <p className="mb-0 fw-semibold">Ready to start?</p>
                      <small className="text-muted">Jump in now or share this hub with a teammate.</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="section-header">
          <div>
            <p className="text-uppercase text-muted fw-semibold mb-1">Game lineup</p>
            <h2 className="h3 mb-0">Pick your practice path</h2>
          </div>
          <button className="btn btn-link p-0" onClick={() => onSelectView('game')}>
            View all scenarios →
          </button>
        </div>
        <div className="row g-4">
          {games.map((game) => (
            <div className="col-md-6" key={game.id}>
              <div className="card h-100 shadow-sm landing-card">
                <div className="card-body d-flex flex-column text-start">
                  <p className="text-uppercase text-muted fw-semibold mb-2">Game</p>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h3 className="h4 mb-0">{game.title}</h3>
                    <span className="badge bg-light text-dark">{game.duration}</span>
                  </div>
                  <p className="text-muted flex-grow-1">{game.description}</p>
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {game.focus.map((item) => (
                      <span className="badge rounded-pill bg-primary-subtle text-primary fw-semibold" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                  <button className="btn btn-primary align-self-start" onClick={() => onSelectView(game.view)}>
                    {game.action}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container py-5">
        <div className="row g-4 align-items-center">
          <div className="col-lg-6 text-start">
            <p className="text-uppercase text-muted fw-semibold mb-1">How it works</p>
            <h2 className="h3 mb-3">Make the most of each session</h2>
            <p className="text-muted mb-4">
              Follow this quick flow to prep, play, and apply what you learn on the sales floor. Keep a policy tab open and revisit
              any scenario with your manager for coaching moments.
            </p>
            <div className="timeline">
              {steps.map((step, index) => (
                <div className="timeline-item" key={step.title}>
                  <span className="timeline-index">{index + 1}</span>
                  <div>
                    <h4 className="h6 mb-1">{step.title}</h4>
                    <p className="text-muted mb-0">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card shadow-sm border-0 landing-card h-100">
              <div className="card-body text-start">
                <p className="text-uppercase text-muted fw-semibold mb-2">Highlights</p>
                <div className="row g-3">
                  {highlights.map((highlight, index) => (
                    <div className="col-sm-6" key={index}>
                      <div className="mini-card h-100">
                        <h4 className="h6 mb-1">{highlight.title}</h4>
                        <p className="text-muted mb-0">{highlight.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="policy-cta mt-4 p-3 rounded">
                  <div>
                    <p className="fw-semibold mb-1">Need a fast policy check?</p>
                    <p className="text-muted mb-2">Open the library in a new tab while you play and keep details handy.</p>
                    <button className="btn btn-outline-primary btn-sm" onClick={() => onSelectView('policies')}>
                      Open policy library
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-5">
        <div className="section-header mb-4">
          <div>
            <p className="text-uppercase text-muted fw-semibold mb-1">Roadmap</p>
            <h2 className="h4 mb-0">Upcoming practice modules</h2>
          </div>
          <span className="badge bg-primary-subtle text-primary fw-semibold">More to come</span>
        </div>
        <div className="row g-3">
          {roadmap.map((item) => (
            <div className="col-md-4" key={item.title}>
              <div className="card h-100 border-0 shadow-sm landing-card text-start">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h4 className="h6 mb-0">{item.title}</h4>
                    <span className="badge bg-light text-dark">{item.status}</span>
                  </div>
                  <p className="text-muted flex-grow-1 mb-0">{item.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-strip py-4">
        <div className="container d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3">
          <div className="text-start">
            <p className="text-uppercase text-muted fw-semibold mb-1">Ready to practice?</p>
            <h3 className="h5 mb-0">Start a scenario now or keep the policy library open during your next conversation.</h3>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-primary" onClick={() => onSelectView('game')}>
              Launch a scenario
            </button>
            <button className="btn btn-outline-light text-dark" onClick={() => onSelectView('policies')}>
              Open policies
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
