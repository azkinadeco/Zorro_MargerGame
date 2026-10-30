import React from 'react';

export function FlyingRewards({ particles = [] }) {
  if (!particles.length) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 999 }}>
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.startX}px`,
            top: `${p.startY}px`,
            fontSize: `${p.size || 22}px`,
            animation: `flyToHeader 0.85s cubic-bezier(0.25, 1, 0.5, 1) forwards`,
            filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.2))'
          }}
        >
          {p.icon}
        </div>
      ))}
    </div>
  );
}
