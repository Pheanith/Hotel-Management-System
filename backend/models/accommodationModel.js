import db from '../utils/db.js';

const accommodationModel = {
  // Create a new accommodation type
  createAccommodationType: async (type_name, description, image) => {
    const [result] = await db.execute(
      'INSERT INTO accommodation_types (type_name, description, image) VALUES (?, ?, ?)',
      [type_name, description, image]
    );
    return result.insertId;
  },

  // Get all accommodation types
  getAllAccommodationTypes: async () => {
    const [rows] = await db.execute('SELECT * FROM accommodation_types');
    return rows;
  },

  // Get accommodation type by ID
  getAccommodationTypeById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM accommodation_types WHERE id = ?', [id]);
    return rows[0];
  },

  // Update an accommodation type
  updateAccommodationType: async (id, type_name, description, image) => {
    return await db.execute(
      'UPDATE accommodation_types SET type_name = ?, description = ?, image = ? WHERE id = ?',
      [type_name, description, image, id]
    );
  },

  // Delete an accommodation type
  deleteAccommodationType: async (id) => {
    return await db.execute('DELETE FROM accommodation_types WHERE id = ?', [id]);
  }
};

export default accommodationModel;
