// scripts/updateSupabase.js
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Example function to add data to a table
const addDataToTable = async () => {
  const { data, error } = await supabase
    .from('your_table_name')
    .insert([
      { column1: 'value1', column2: 'value2' },
    ]);
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Data added:', data);
  }
};

// Example function to update data in a table
const updateDataInTable = async (id, newValues) => {
  const { data, error } = await supabase
    .from('your_table_name')
    .update(newValues)
    .eq('id', id);
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Data updated:', data);
  }
};

// Example function to delete data from a table
const deleteDataFromTable = async (id) => {
  const { data, error } = await supabase
    .from('your_table_name')
    .delete()
    .eq('id', id);
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Data deleted:', data);
  }
};

// Main function to run the necessary updates
const runUpdates = async () => {
  await addDataToTable();
  await updateDataInTable(1, { column1: 'new value' });
  await deleteDataFromTable(2);
};

runUpdates();