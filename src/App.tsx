import React from 'react';
import { Canvas } from '@react-three/fiber';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './layouts/LandingPage';
import { MarketPage } from './layouts/MarketPage';

export function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={(
            <LandingPage />
          )}
        />
        <Route
          path="/market"
          element={(
            <Canvas
              fallback={null}
              camera={{ position: [0, -10, 80], fov: 50 }}
              dpr={[1, 2]}
            >
              <MarketPage />
            </Canvas>
          )}
        />
      </Routes>
    </Router>
  );
}
