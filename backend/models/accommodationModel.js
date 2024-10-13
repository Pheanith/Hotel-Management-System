import db from '../utils/db.js';

// Get all accommodation types
export const getAllAccommodationTypes = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM accommodation_types');
    return rows; // Return the rows from the query
  } catch (err) {
    console.error('Error fetching accommodation types:', err);
    throw err; // Re-throw to be handled in the controller
  }
};

// Get accommodation type by ID
export const getAccommodationTypeById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM accommodation_types WHERE accommodation_type_id = ?', [id]);
    return rows[0]; // Return the first result (or undefined if not found)
  } catch (err) {
    console.error('Error fetching accommodation type by ID:', err);
    throw err;
  }
};

// Add a new accommodation type
export const addAccommodationType = async (accommodationType) => {
  const { name, description } = accommodationType;
  try {
    const [result] = await db.query('INSERT INTO accommodation_types (name, description) VALUES (?, ?)', [name, description]);
    return result.insertId; // Return the insert ID
  } catch (err) {
    console.error('Error adding accommodation type:', err);
    throw err;
  }
};

// Update accommodation type by ID
export const updateAccommodationType = async (id, updates) => {
  const { name, description } = updates;
  try {
    const [result] = await db.query('UPDATE accommodation_types SET name = ?, description = ? WHERE accommodation_type_id = ?', [name, description, id]);
    return result.affectedRows > 0; // Return true if rows were affected
  } catch (err) {
    console.error('Error updating accommodation type:', err);
    throw err;
  }
};

// Delete accommodation type by ID
export const deleteAccommodationType = async (id) => {
  try {
    const [result] = await db.query('DELETE FROM accommodation_types WHERE accommodation_type_id = ?', [id]);
    return result.affectedRows > 0; // Return true if rows were deleted
  } catch (err) {
    console.error('Error deleting accommodation type:', err);
    throw err;
  }
};
