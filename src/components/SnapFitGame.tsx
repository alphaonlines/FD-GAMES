import React, { useEffect, useMemo, useRef, useState } from 'react';

interface SnapItem {
  id: string;
  name: string;
  goal: boolean;
  accent: string;
}

interface Zone {
  id: string;
  label: string;
  accepts: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

type Theme = 'Modern' | 'Rustic' | 'Coastal';

const themeSettings: Record<Theme, { background: string; canvas: string; zone: string; tray: string; accent: string }[]> = {
  Modern: [
    {
      background: '#eef2ff',
      canvas: '#f8fafc',
      zone: '#e0f2fe',
      tray: '#fff',
      accent: '#2563eb',
    },
  ],
  Rustic: [
    {
      background: '#f5f0e6',
      canvas: '#fbf6ec',
      zone: '#e3d5ca',
      tray: '#fffaf0',
      accent: '#92400e',
    },
  ],
  Coastal: [
    {
      background: '#e0f7f9',
      canvas: '#f5ffff',
      zone: '#d1fae5',
      tray: '#ffffff',
      accent: '#0ea5e9',
    },
  ],
};

const items: SnapItem[] = [
  { id: 'sofa', name: 'Sofa', goal: true, accent: '#2563eb' },
  { id: 'rug', name: 'Rug', goal: true, accent: '#f59e0b' },
  { id: 'coffee-table', name: 'Coffee Table', goal: true, accent: '#7c3aed' },
  { id: 'lamp', name: 'Lamp', goal: true, accent: '#22c55e' },
  { id: 'bed', name: 'Bed', goal: false, accent: '#14b8a6' },
  { id: 'dresser', name: 'Dresser', goal: false, accent: '#f97316' },
];

const zones: Zone[] = [
  { id: 'zone-sofa', label: 'Sofa Spot', accepts: 'sofa', x: 12, y: 40, width: 32, height: 16 },
  { id: 'zone-rug', label: 'Rug Center', accepts: 'rug', x: 30, y: 56, width: 45, height: 14 },
  { id: 'zone-table', label: 'Coffee Table', accepts: 'coffee-table', x: 40, y: 38, width: 20, height: 10 },
  { id: 'zone-lamp', label: 'Lamp Corner', accepts: 'lamp', x: 74, y: 24, width: 10, height: 16 },
];

const goalList = ['Sofa', 'Rug', 'Coffee Table', 'Lamp'];

const SnapFitGame: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('Modern');
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [message, setMessage] = useState('Drag a piece from the tray and place it near a matching zone.');
  const [completion, setCompletion] = useState<{
    finalScore: number;
    timeSeconds: number;
    perfect: boolean;
  } | null>(null);
  const [startTime, setStartTime] = useState(Date.now());
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const canvasRef = useRef<HTMLDivElement | null>(null);

  const palette = useMemo(() => themeSettings[theme][0], [theme]);

  useEffect(() => {
    if (completion) {
      return undefined;
    }
    const timer = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
    }, 500);
    return () => clearInterval(timer);
  }, [startTime, completion]);

  const placedItems = useMemo(() => Object.values(placements), [placements]);

  const resetGame = () => {
    setPlacements({});
    setScore(0);
    setMistakes(0);
    setMessage('Drag a piece from the tray and place it near a matching zone.');
    setCompletion(null);
    setStartTime(Date.now());
    setElapsedSeconds(0);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!canvasRef.current || completion) return;

    const itemId = event.dataTransfer.getData('text/plain');
    const item = items.find((entry) => entry.id === itemId);
    if (!item) return;

    const { clientX, clientY } = event;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;

    const snapThreshold = 18; // percent distance threshold

    const pointInsideZone = zones.find(
      (zone) => x >= zone.x && x <= zone.x + zone.width && y >= zone.y && y <= zone.y + zone.height,
    );

    const sortedZones = zones
      .map((zone) => {
        const centerX = zone.x + zone.width / 2;
        const centerY = zone.y + zone.height / 2;
        const distance = Math.hypot(centerX - x, centerY - y);
        return { zone, distance };
      })
      .sort((a, b) => a.distance - b.distance);

    const fallbackZone = sortedZones[0];
    const zone = pointInsideZone ?? fallbackZone?.zone;

    if (!zone || (!pointInsideZone && fallbackZone && fallbackZone.distance > snapThreshold)) {
      setMistakes((prev) => prev + 1);
      setScore((prev) => Math.max(0, prev - 4));
      setMessage('Out of bounds. Drop directly on a highlighted zone to place furniture.');
      return;
    }

    if (zone.accepts !== item.id) {
      setMistakes((prev) => prev + 1);
      setScore((prev) => Math.max(0, prev - 4));
      setMessage('That piece does not belong there. It snaps back to the tray.');
      return;
    }

    if (placements[zone.id]) {
      setMistakes((prev) => prev + 1);
      setScore((prev) => Math.max(0, prev - 2));
      setMessage('Zone already filled—choose a different spot.');
      return;
    }

    const updatedPlacements = { ...placements, [zone.id]: item.id };
    setPlacements(updatedPlacements);
    const nextScore = score + 12;
    setScore(nextScore);
    setMessage(`Snap! ${item.name} locked into place.`);

    const allGoalPlaced = goalList.every((goalItem) =>
      Object.values(updatedPlacements).some((placed) => placed === goalItem.toLowerCase().replace(' ', '-')),
    );

    if (allGoalPlaced) {
      const timeBonus = Math.max(0, 50 - elapsedSeconds);
      const styleBonus = theme === 'Coastal' ? 6 : theme === 'Rustic' ? 4 : 5;
      const finalScore = nextScore + timeBonus + styleBonus;
      setCompletion({
        finalScore,
        timeSeconds: elapsedSeconds,
        perfect: mistakes === 0,
      });
      setMessage('Room complete! Check your score and try a new theme for more style points.');
    }
  };

  const handleDragStart = (event: React.DragEvent<HTMLButtonElement>, itemId: string) => {
    event.dataTransfer.setData('text/plain', itemId);
  };

  const trayItems = items.filter((item) => !placedItems.includes(item.id));

  return (
    <div className="container">
      <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-3">
        <div>
          <p className="text-uppercase text-muted fw-semibold mb-1">Game 1: Room Designer — Snap Fit</p>
          <h1 className="h3 mb-1">Build a Cozy Living Room</h1>
          <p className="text-muted mb-0">Goal: Sofa + Rug + Coffee Table + Lamp. Snap pieces into place with the fewest mistakes.</p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="fw-semibold">Style theme:</span>
          {(['Modern', 'Rustic', 'Coastal'] as Theme[]).map((option) => (
            <button
              key={option}
              className={`btn btn-sm ${theme === option ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setTheme(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="snap-panel" style={{ background: palette.tray }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h2 className="h5 mb-1">Furniture tray</h2>
                <p className="text-muted mb-0">Drag items onto the canvas. Mistakes send them back here.</p>
              </div>
              <div className="badge bg-light text-dark fw-semibold">{trayItems.length} left</div>
            </div>
            <div className="d-grid gap-2">
              {trayItems.map((item) => (
                <button
                  key={item.id}
                  className="btn snap-item d-flex align-items-center justify-content-between"
                  draggable
                  onDragStart={(event) => handleDragStart(event, item.id)}
                  style={{ borderColor: item.accent }}
                >
                  <span className="fw-semibold">{item.name}</span>
                  <span className="badge" style={{ backgroundColor: item.accent }}>{item.goal ? 'Goal' : 'Extra'}</span>
                </button>
              ))}
              {trayItems.length === 0 && <div className="text-muted small">All pieces placed. Check your score!</div>}
            </div>
            <div className="mt-3 d-flex gap-2">
              <button className="btn btn-outline-secondary btn-sm" onClick={resetGame}>
                Restart layout
              </button>
              {completion && (
                <button className="btn btn-outline-primary btn-sm" onClick={() => setCompletion(null)}>
                  Keep practicing
                </button>
              )}
            </div>
            <div className="mt-3 p-3 rounded-3 bg-light border">
              <p className="fw-semibold mb-1">Scoring</p>
              <ul className="small text-muted mb-0 ps-3">
                <li>Snap success: +12 points</li>
                <li>Wrong zone or overlap: -4 points + mistake</li>
                <li>Time bonus: up to +50 points for speed</li>
                <li>Style bonus: higher with Coastal &gt; Modern &gt; Rustic</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="snap-canvas card border-0 shadow-sm" style={{ background: palette.canvas }}>
            <div className="card-body">
              <div
                className="canvas-area"
                ref={canvasRef}
                style={{ background: palette.background }}
                onDragOver={(event) => event.preventDefault()}
                onDrop={handleDrop}
              >
                {zones.map((zone) => {
                  const placed = placements[zone.id];
                  const placedItem = items.find((item) => item.id === placed);
                  return (
                    <div
                      key={zone.id}
                      className={`zone ${placed ? 'zone-filled' : ''}`}
                      style={{
                        left: `${zone.x}%`,
                        top: `${zone.y}%`,
                        width: `${zone.width}%`,
                        height: `${zone.height}%`,
                        background: placed ? '#dcfce7' : palette.zone,
                        borderColor: placed ? '#22c55e' : palette.accent,
                      }}
                    >
                      <div className="zone-label">
                        {placedItem ? `${placedItem.name} placed` : zone.label}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mt-3">
                <div>
                  <div className="fw-semibold">{message}</div>
                  <div className="text-muted small">Time: {elapsedSeconds}s • Mistakes: {mistakes}</div>
                </div>
                <div className="d-flex gap-3 align-items-center">
                  <div className="fw-bold">Score: {completion ? completion.finalScore : score}</div>
                  {completion && completion.perfect && <span className="badge bg-success">Showroom Pro</span>}
                </div>
              </div>
            </div>
          </div>

          {completion && (
            <div className="card mt-4 border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3">
                  <div>
                    <p className="text-uppercase text-muted fw-semibold mb-1">Results</p>
                    <h3 className="h5 mb-1">Room finished in {completion.timeSeconds}s</h3>
                    <p className="text-muted mb-0">
                      Mistakes: {mistakes} • Style: {theme} • Time bonus already applied
                    </p>
                  </div>
                  <div className="display-6 mb-0">{completion.finalScore} pts</div>
                </div>
                <div className="row g-3">
                  <div className="col-md-4">
                    <div className="summary-tile">
                      <p className="text-muted mb-1">Completion time</p>
                      <div className="fw-bold h5 mb-0">{completion.timeSeconds}s</div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="summary-tile">
                      <p className="text-muted mb-1">Mistakes</p>
                      <div className="fw-bold h5 mb-0">{mistakes}</div>
                      {completion.perfect && <span className="badge bg-success mt-2">Showroom Pro badge</span>}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="summary-tile">
                      <p className="text-muted mb-1">Style score</p>
                      <div className="fw-bold h5 mb-0">{theme === 'Coastal' ? '+6' : theme === 'Modern' ? '+5' : '+4'} pts</div>
                      <small className="text-muted">Theme bonus already included</small>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="fw-semibold mb-2">Leaderboard</p>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Casey — Modern</span>
                      <strong>118 pts</strong>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Jordan — Coastal</span>
                      <strong>126 pts</strong>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Avery — Rustic</span>
                      <strong>110 pts</strong>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <span>You — {theme}</span>
                      <strong>{completion.finalScore} pts</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SnapFitGame;
