const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseKey ? 'Key present' : 'No key provided');

const supabase = createClient(supabaseUrl, supabaseKey);

const addDataToTable = async () => {
  const { data, error } = await supabase
    .from('your_table_name')
    .insert([
      { column1: 'value1', column2: 'value2' },
    ]);
  if (error) {
    console.error('Error adding data:', error.message);
  } else {
    console.log('Data added:', data);
  }
};

const updateDataInTable = async (id, newValues) => {
  const { data, error } = await supabase
    .from('your_table_name')
    .update(newValues)
    .eq('id', id);
  if (error) {
    console.error('Error updating data:', error.message);
  } else {
    console.log('Data updated:', data);
  }
};

const deleteDataFromTable = async (id) => {
  const { data, error } = await supabase
    .from('your_table_name')
    .delete()
    .eq('id', id);
  if (error) {
    console.error('Error deleting data:', error.message);
  } else {
    console.log('Data deleted:', data);
  }
};

const runUpdates = async () => {
  console.log('Starting updates...');
  await addDataToTable();
  console.log('Add data operation complete.');
  await updateDataInTable(1, { column1: 'new value' });
  console.log('Update data operation complete.');
  await deleteDataFromTable(2);
  console.log('Delete data operation complete.');
};

runUpdates().catch((error) => {
  console.error('Unexpected error:', error.message);
});