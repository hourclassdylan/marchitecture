// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo.webp'; // Adjust the import path as necessary

const Header = () => (
  <header className="header">
    <div className="header-content">
      <img src={logo} alt="Marchitecture logo" className="logo" />
      <h1>Marchitecture</h1>
    </div>
    <div className="header-right">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/market-maps">Market Maps</Link></li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;