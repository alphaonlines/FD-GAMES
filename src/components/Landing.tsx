import React from 'react';

type View = 'landing' | 'game' | 'policies';

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
  },
  {
    id: 'policy-library',
    title: 'Policy Library',
    description: 'Review quick-reference policies to back up your recommendations and stay compliant during conversations.',
    action: 'Open Policies',
    view: 'policies' as View,
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

const Landing: React.FC<LandingProps> = ({ onSelectView }) => {
  return (
    <div className="landing container py-5">
      <div className="row align-items-center mb-5">
        <div className="col-lg-7 text-start">
          <span className="badge bg-primary mb-3">Training Hub</span>
          <h1 className="display-5 fw-bold mb-3">FD Games: Your frontline practice arena</h1>
          <p className="lead text-muted mb-4">
            Launch into focused training games, refresh policy details, and prep for customer conversations—all from one landing
            page.
          </p>
          <div className="d-flex flex-wrap gap-3">
            <button className="btn btn-primary btn-lg" onClick={() => onSelectView('game')}>
              Start the Furniture Game
            </button>
            <button className="btn btn-outline-secondary btn-lg" onClick={() => onSelectView('policies')}>
              Review Policies
            </button>
          </div>
        </div>
        <div className="col-lg-5 mt-4 mt-lg-0">
          <div className="card shadow-sm border-0 landing-card">
            <div className="card-body">
              <p className="text-uppercase text-muted fw-semibold mb-2">What you can do</p>
              <ul className="list-unstyled mb-0">
                <li className="d-flex align-items-start mb-3">
                  <span className="me-3 text-primary fs-4">•</span>
                  <div>
                    <strong>Play scenarios</strong>
                    <p className="mb-0 text-muted">Test yourself with realistic customer situations.</p>
                  </div>
                </li>
                <li className="d-flex align-items-start mb-3">
                  <span className="me-3 text-primary fs-4">•</span>
                  <div>
                    <strong>Explore the catalog</strong>
                    <p className="mb-0 text-muted">Dig into product highlights before recommending them.</p>
                  </div>
                </li>
                <li className="d-flex align-items-start">
                  <span className="me-3 text-primary fs-4">•</span>
                  <div>
                    <strong>Check policies fast</strong>
                    <p className="mb-0 text-muted">Keep returns and delivery expectations handy.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {games.map((game) => (
          <div className="col-md-6" key={game.id}>
            <div className="card h-100 shadow-sm landing-card">
              <div className="card-body d-flex flex-column text-start">
                <p className="text-uppercase text-muted fw-semibold mb-2">Game</p>
                <h3 className="h4">{game.title}</h3>
                <p className="text-muted flex-grow-1">{game.description}</p>
                <button className="btn btn-primary align-self-start" onClick={() => onSelectView(game.view)}>
                  {game.action}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        {highlights.map((highlight, index) => (
          <div className="col-md-4" key={index}>
            <div className="card h-100 border-0 shadow-sm landing-card">
              <div className="card-body text-start">
                <h4 className="h5">{highlight.title}</h4>
                <p className="text-muted mb-0">{highlight.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Landing;
