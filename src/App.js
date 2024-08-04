// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MarketMaps from './components/MarketMaps';
import MarketMapDetail from './components/MarketMapDetail'; // Import MarketMapDetail component
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/market-maps" element={<MarketMaps />} />
            <Route path="/market-maps/:id" element={<MarketMapDetail />} /> {/* Route for MarketMapDetail */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

const HomePage = () => (
  <main>
    <h2>Welcome to Marchitecture</h2>
    <p>Your community-oriented web app for market maps.</p>
  </main>
);

export default App;