import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { ethers } from 'ethers';
import { LandingPage } from './layouts/LandingPage';
import { MarketPage } from './layouts/MarketPage';
import { Navigator } from './components/Navigator';
import { Loader } from './components/Loader';
import { AdminPage } from './layouts/AdminPage';
import { ABIS } from './contracts/abi';

export function App() {
  const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const nftContract = new ethers.Contract(ABIS.NFT_TX_ADDRESS, ABIS.NFT, provider.getSigner());
    const marketContract = new ethers.Contract(ABIS.MARKET_TX_ADDRESS, ABIS.MARKET, provider.getSigner());
  });

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
                fallback={<Loader />}
                camera={{ position: [0, -10, 80], fov: 50 }}
                dpr={[1, 2]}
              >
                <MarketPage />
              </Canvas>
            </AppContainer>
          )}
        />
        <Route
          path="/admin"
          element={(
            <AppContainer>
              <Navigator />
              <AdminPage />
            </AppContainer>
          )}
        />
      </Routes>
    </Router>
  );
}
