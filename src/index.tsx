import React from 'react';
import { createRoot } from 'react-dom/client';
import styled from 'styled-components';
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
    <App />
  </AppContainer>,

);

reportWebVitals();
