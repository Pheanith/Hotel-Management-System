import db from '../utils/db.js';

// Get all accommodation types with pagination
export const getAllAccommodationTypes = async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit; // Calculate offset for pagination
    try {
        const [rows] = await db.query('SELECT * FROM accommodation_types LIMIT ? OFFSET ?', [limit, offset]);
        return rows;
    } catch (err) {
        console.error('Error fetching accommodation types:', err);
        throw err;
    }
};

// Get accommodation type by ID
export const getAccommodationTypeById = async (id) => {
    try {
        const [rows] = await db.query('SELECT * FROM accommodation_types WHERE accommodation_type_id = ?', [id]);
        return rows[0];
    } catch (err) {
        console.error('Error fetching accommodation type by ID:', err);
        throw err;
    }
};

// Add a new accommodation type
export const addAccommodationType = async (accommodationType) => {
    const { name, description, priceRange, numberOfUnits } = accommodationType;
    try {
        const [result] = await db.query('INSERT INTO accommodation_types (accommodation_name, description, price_range, number_of_units) VALUES (?, ?, ?, ?)', [name, description, priceRange, numberOfUnits]);
        return {
            accommodation_type_id: result.insertId,
            accommodation_name: name,
            description,
            price_range: priceRange,
            number_of_units: numberOfUnits,
        };
    } catch (err) {
        console.error('Error adding accommodation type:', err);
        throw err;
    }
};

// Update accommodation type by ID
export const updateAccommodationType = async (id, updates) => {
    const { name, description, priceRange, numberOfUnits } = updates;
    try {
        const [result] = await db.query('UPDATE accommodation_types SET accommodation_name = ?, description = ?, price_range = ?, number_of_units = ? WHERE accommodation_type_id = ?', [name, description, priceRange, numberOfUnits, id]);
        return result.affectedRows > 0;
    } catch (err) {
        console.error('Error updating accommodation type:', err);
        throw err;
    }
};

// Delete accommodation type by ID
export const deleteAccommodationType = async (id) => {
    try {
        const [result] = await db.query('DELETE FROM accommodation_types WHERE accommodation_type_id = ?', [id]);
        return result.affectedRows > 0;
    } catch (err) {
        console.error('Error deleting accommodation type:', err);
        throw err;
    }
};
