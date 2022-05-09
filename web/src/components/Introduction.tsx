import React from 'react';

export function Introduction() {
  return (
    <div
      style={{
        background: 'white',
        fontSize: 'min(12vw, 86px)',
        lineHeight: 0.75,
      }}
    >
      <h2
        style={{
          position: 'absolute',
          top: '40vh',
          left: '50vw',
          transform: 'translateX(-50%)',
          color: 'var(--subPrimary)',
          margin: 0,
        }}
      >
        Methereum
      </h2>
      <h2
        style={{
          position: 'absolute',
          top: '130vh',
          left: '50vw',
          transform: 'translateX(-65%)',
          color: '#e11584',
          margin: 0,
        }}
      >
        Auction Market
      </h2>
      <h2
        style={{
          position: 'absolute',
          top: '230vh',
          left: '50vw',
          transform: 'translateX(-50%)',
          color: '#673ab7',
          margin: 0,
        }}
      >
        Now Start!
      </h2>
      <h3
        style={{
          position: 'absolute',
          top: '330vh',
          left: '30vw',
          transform: 'translateX(-50%)',
          color: '#FFDAB9',
          margin: 0,
        }}
      >
        Introduction
      </h3>
    </div>
  );
}
