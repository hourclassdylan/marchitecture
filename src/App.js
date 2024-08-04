// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import MarketMaps from './components/MarketMaps';
import MarketMapDetail from './components/MarketMapDetail';
import './App.css';

const App = () => (
  <Router>
    <div className="App">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/market-maps" element={<MarketMaps />} />
          <Route path="/market-maps/:id" element={<MarketMapDetail />} />
        </Routes>
      </div>
      <Footer />
    </div>
  </Router>
);

export default App;