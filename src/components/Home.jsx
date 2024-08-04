// src/components/Home.jsx
import React from 'react';
import './Home.css';

const Home = () => (
  <div className="home">
    <h2>Welcome to Marchitecture</h2>
    <div className="purpose-section">
      <p>
        The Marchitecture website is designed to provide an interactive view of various market maps, their sections, subcategories, and the companies within them.
        Our goal is to help businesses and individuals navigate market landscapes more effectively.
      </p>
    </div>
    <h2>Contribute</h2>
    <div className="contribute-section">
      <div className="contribute-box">
        <h3>Add</h3>
        <button>Add Market Map</button>
        <button>Add Section</button>
        <button>Add Subcategory</button>
        <button>Add Company</button>
      </div>
      <div className="contribute-box">
        <h3>Edit</h3>
        <button>Edit Market Map</button>
        <button>Edit Section</button>
        <button>Edit Subcategory</button>
        <button>Edit Company</button>
      </div>
      <div className="contribute-box">
        <h3>Delete</h3>
        <button>Delete Market Map</button>
        <button>Delete Section</button>
        <button>Delete Subcategory</button>
        <button>Delete Company</button>
      </div>
    </div>
  </div>
);

export default Home;