import React from 'react';

// FIXME: dirty & duplicated codes
export function Navigator() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      <nav
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <a
          href="/"
          style={{
            padding: '0.5rem',
            margin: '1rem',
            textDecoration: 'none',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: 'rgba(250, 250, 250, 0.7)',
            userSelect: 'none',
          }}
        >
          Home
        </a>
        <a
          href="/market"
          style={{
            padding: '0.5rem',
            margin: '1rem',
            textDecoration: 'none',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: 'rgba(250, 250, 250, 0.7)',
            userSelect: 'none',

          }}
        >
          Market
        </a>
        <a
          href="/admin"
          style={{
            padding: '0.5rem',
            margin: '1rem',
            textDecoration: 'none',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: 'rgba(250, 250, 250, 0.7)',
            userSelect: 'none',

          }}
        >
          Admin
        </a>
      </nav>
    </div>
  );
}
