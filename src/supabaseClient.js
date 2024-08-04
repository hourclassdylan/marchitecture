// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

export const fetchMarketMaps = async () => {
  const { data, error } = await supabase
    .from('market_maps')
    .select('*');
  if (error) throw error;
  return data;
};

export const fetchSections = async (marketMapId) => {
  const { data, error } = await supabase
    .from('sections')
    .select('*')
    .eq('market_map_id', marketMapId);
  if (error) throw error;
  return data;
};

export const fetchSubcategories = async (sectionId) => {
  const { data, error } = await supabase
    .from('subcategories')
    .select('*')
    .eq('section_id', sectionId);
  if (error) throw error;
  return data;
};

export const fetchCompanies = async (subcategoryId) => {
  const { data, error } = await supabase
    .from('companies')
    .select('id, name, description, year_founded, stage, total_funding, website, image_url')
    .eq('subcategory_id', subcategoryId);
  if (error) throw error;
  return data;
};