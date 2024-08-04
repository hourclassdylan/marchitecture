// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="header">
    <div className="logo">
      Marchitecture
    </div>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/market-maps">Market Maps</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;