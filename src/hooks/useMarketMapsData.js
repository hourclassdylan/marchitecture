// src/hooks/useMarketMapsData.js
import { useState, useEffect } from 'react';
import { fetchMarketMaps, fetchSections, fetchSubcategories, fetchCompanies } from '../supabaseClient';

export const useMarketMapsData = () => {
  const [marketMaps, setMarketMaps] = useState([]);
  const [sections, setSections] = useState([]);
  const [subcategories, setSubcategories] = useState({});
  const [companies, setCompanies] = useState({});

  useEffect(() => {
    fetchMarketMaps().then(setMarketMaps).catch(console.error);
  }, []);

  const loadSections = (marketMapId) => {
    fetchSections(marketMapId).then(setSections).catch(console.error);
  };

  const loadSubcategories = (sectionId) => {
    fetchSubcategories(sectionId).then((data) => {
      setSubcategories((prev) => ({ ...prev, [sectionId]: data }));
    }).catch(console.error);
  };

  const loadCompanies = (subcategoryId) => {
    fetchCompanies(subcategoryId).then((data) => {
      setCompanies((prev) => ({ ...prev, [subcategoryId]: data }));
    }).catch(console.error);
  };

  return { marketMaps, sections, subcategories, companies, loadSections, loadSubcategories, loadCompanies };
};