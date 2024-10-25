import db from '../utils/db.js';

// Get all room types
export const getAllRoomTypes = async () => {
    try {
        const [results] = await db.query('SELECT * FROM room_types');
        return results; // Return the results
    } catch (err) {
        console.error('Database error:', err);
        throw err; // Rethrow the error for handling in the controller
    }
};

// Get room type by ID
export const getRoomTypeById = async (id) => {
    try {
        const [results] = await db.query('SELECT * FROM room_types WHERE room_type_id = ?', [id]);
        return results[0]; // Return the first result
    } catch (err) {
        console.error('Database error:', err);
        throw err; // Rethrow the error for handling in the controller
    }
};

// Add a new room type
export const addRoomType = async (roomType) => {
    const { type_name, description, amenities, capacity, price, status, image_url } = roomType; // Extract new fields
    try {
        const query = 'INSERT INTO room_types (type_name, description, amenities, capacity, price, status, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const [result] = await db.query(query, [type_name, description, amenities, capacity, price, status, image_url]);
        return result.insertId; // Return the inserted ID
    } catch (err) {
        console.error('Database error:', err);
        throw err; // Rethrow the error for handling in the controller
    }
};

// Update room type by ID
export const updateRoomType = async (id, updates) => {
    const { type_name, description, amenities, capacity, price, status, image_url } = updates; // Extract new fields
    try {
        const query = 'UPDATE room_types SET type_name = ?, description = ?, amenities = ?, capacity = ?, price = ?, status = ?, image_url = ? WHERE room_type_id = ?';
        const [result] = await db.query(query, [type_name, description, amenities, capacity, price, status, image_url, id]);
        return result.affectedRows > 0; // Return true if any row was updated
    } catch (err) {
        console.error('Database error:', err);
        throw err; // Rethrow the error for handling in the controller
    }
};

// Delete room type by ID
export const deleteRoomType = async (id) => {
    try {
        const [result] = await db.query('DELETE FROM room_types WHERE room_type_id = ?', [id]);
        return result.affectedRows > 0; // Return true if any row was deleted
    } catch (err) {
        console.error('Database error:', err);
        throw err; // Rethrow the error for handling in the controller
    }
};
