import { createClient } from '@supabase/supabase-js';

// Environment variables
const supabaseUrl = process.env['REACT_APP_SUPABASE_URL'];
const supabaseKey = process.env['REACT_APP_SUPABASE_KEY'];

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL and Key are required');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Fetch all market maps
export const fetchMarketMaps = async () => {
  const { data, error } = await supabase
    .from('market_maps')
    .select('*');
  if (error) throw error;
  return data;
};

// Fetch sections for a specific market map
export const fetchSections = async (marketMapId) => {
  const { data, error } = await supabase
    .from('sections')
    .select('*')
    .eq('market_map_id', marketMapId);
  if (error) throw error;
  return data;
};

// Fetch subcategories for a specific section
export const fetchSubcategories = async (sectionId) => {
  const { data, error } = await supabase
    .from('subcategories')
    .select('*')
    .eq('section_id', sectionId);
  if (error) throw error;
  return data;
};

// Fetch companies for a specific subcategory
export const fetchCompanies = async (subcategoryId) => {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .eq('subcategory_id', subcategoryId);
  if (error) throw error;
  return data;
};