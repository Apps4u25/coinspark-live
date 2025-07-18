import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import your page components
import LandingPage from './components/LandingPage';
import PricingPage from './components/PricingPage';
import LoginPage from './components/LoginPage';
import MainApp from './components/MainApp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The Landing Page will be the homepage */}
        <Route path="/" element={<LandingPage />} />

        {/* Additional pages */}
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* This is the main tool, which we'll imagine is protected */}
        <Route path="/app" element={<MainApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;