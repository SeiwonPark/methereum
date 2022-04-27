import React from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import styled from 'styled-components';
import * as THREE from 'three';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';


declare global {
  interface Window {
    ethereum: any;
  }
}

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

createRoot(document.getElementById('root') as HTMLElement).render(
  <AppContainer>
    <Canvas
      camera={{ position: [0, -10, 80], fov: 50 }}
      dpr={[1, 2]}
    >
      <App />
    </Canvas>
  </AppContainer>,

);

reportWebVitals();
