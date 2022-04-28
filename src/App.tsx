import React from 'react';
import { Canvas } from '@react-three/fiber';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { LandingPage } from './layouts/LandingPage';
import { MarketPage } from './layouts/MarketPage';
import { Navigator } from './components/Navigator';

export function App() {
  const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={(
            <AppContainer>
              <Navigator />
              <LandingPage />
            </AppContainer>
          )}
        />
        <Route
          path="/market"
          element={(
            <AppContainer>
              <Navigator />
              <Canvas
                fallback={null}
                camera={{ position: [0, -10, 80], fov: 50 }}
                dpr={[1, 2]}
              >
                <MarketPage />
              </Canvas>
            </AppContainer>
          )}
        />
      </Routes>
    </Router>
  );
}
