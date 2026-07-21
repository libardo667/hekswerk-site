import React, {useEffect, useRef, useState} from 'react';

import styles from './WorldWeaverDependencyAtlas.module.css';

const VIEWS = {
  overview: {label: 'Whole system', box: [0, 0, 3300, 1500]},
  clients: {label: 'People and clients', box: [50, 45, 1100, 733]},
  engine: {label: 'World engine', box: [1100, 45, 1100, 733]},
  federation: {label: 'Federation', box: [2150, 45, 1100, 733]},
  resident: {label: 'Resident host', box: [50, 765, 1100, 733]},
  gym: {label: 'Resident gym', box: [1100, 765, 1100, 733]},
  review: {label: 'Review shelf', box: [2150, 765, 1100, 733]},
};

const ANIMATION_MS = 420;

function easeInOut(value) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

export default function WorldWeaverDependencyAtlas({Graphic, staticHref}) {
  const [view, setView] = useState('overview');
  const [box, setBox] = useState(VIEWS.overview.box);
  const boxRef = useRef(VIEWS.overview.box);

  useEffect(() => {
    const start = boxRef.current;
    const target = VIEWS[view].box;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      boxRef.current = target;
      setBox(target);
      return undefined;
    }
    const startedAt = performance.now();
    let frame;

    function animate(now) {
      const progress = Math.min(1, (now - startedAt) / ANIMATION_MS);
      const eased = easeInOut(progress);
      const next = start.map((value, index) =>
        value + (target[index] - value) * eased,
      );
      boxRef.current = next;
      setBox(next);
      if (progress < 1) frame = requestAnimationFrame(animate);
    }

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [view]);

  const isOverview = view === 'overview';

  return (
    <section className={styles.atlas} aria-label="Interactive WorldWeaver dependency atlas">
      <p className={styles.instructions}>
        Choose a part to zoom in. The buttons move through the same large map; they do not hide a second set
        of dependencies.
      </p>
      <div className={styles.controls} role="group" aria-label="Dependency map views">
        {Object.entries(VIEWS).map(([key, item]) => (
          <button
            className={view === key ? styles.activeButton : styles.button}
            key={key}
            onClick={() => setView(key)}
            type="button"
            aria-pressed={view === key}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className={styles.viewport}>
        <svg
          className={isOverview ? styles.overviewCanvas : styles.detailCanvas}
          viewBox={box.join(' ')}
          role="img"
          aria-label={`${VIEWS[view].label} view of the WorldWeaver dependency atlas`}
        >
          <Graphic x="0" y="0" width="3300" height="1500" />
        </svg>
      </div>
      <div className={styles.footerRow}>
        <strong>{VIEWS[view].label}</strong>
        <a href={staticHref} target="_blank" rel="noreferrer">Open the full-size static map</a>
      </div>
    </section>
  );
}
