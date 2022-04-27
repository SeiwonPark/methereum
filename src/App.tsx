import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './layouts/LandingPage';
import { MarketPage } from './layouts/MarketPage';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="market" element={<MarketPage />} />
      </Routes>
    </Router>
  );
}
