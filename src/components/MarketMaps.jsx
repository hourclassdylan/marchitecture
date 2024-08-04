// src/components/MarketMaps.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useMarketMapsData } from '../hooks/useMarketMapsData';
import './MarketMaps.css';

const MarketMaps = () => {
  const { marketMaps } = useMarketMapsData();

  return (
    <div>
      <h2>Market Maps</h2>
      <div className="market-maps-container">
        {marketMaps.map((map) => (
          <Link to={`/market-maps/${map.id}`} key={map.id} className="market-map-box">
            <h3>{map.name}</h3>
            <p>{map.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MarketMaps;