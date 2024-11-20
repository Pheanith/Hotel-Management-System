import db from '../utils/db.js';

// Create a new room type
export const createRoomType = (type_name, description, capacity, bed_configuration, room_size, image_url) => {
    const query = 'INSERT INTO room_types (type_name, description, capacity, bed_configuration, room_size, image_url) VALUES (?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
        db.query(query, [type_name, description, capacity, bed_configuration, room_size, image_url], (error, results) => {
            if (error) return reject(error);
            resolve({
                id: results.insertId,
                type_name,
                description,
                capacity,
                bed_configuration,
                room_size,
                image_url
            });
        });
    });
};

// Get all room types
export const getRoomTypes = () => {
    const query = 'SELECT * FROM room_types';
    return new Promise((resolve, reject) => {
        db.query(query, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

// Update an existing room type
export const updateRoomType = (id, type_name, description, capacity, bed_configuration, room_size, image_url) => {
    const query = 'UPDATE room_types SET type_name = ?, description = ?, capacity = ?, bed_configuration = ?, room_size = ?, image_url = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
        db.query(query, [type_name, description, capacity, bed_configuration, room_size, image_url, id], (error, results) => {
            if (error) return reject(error);
            resolve({
                id,
                type_name,
                description,
                capacity,
                bed_configuration,
                room_size,
                image_url
            });
        });
    });
};

// Delete a room type by ID
export const deleteRoomType = (id) => {
    const query = 'DELETE FROM room_types WHERE id = ?';
    return new Promise((resolve, reject) => {
        db.query(query, [id], (error, results) => {
            if (error) return reject(error);
            resolve({ message: 'Room type deleted successfully' });
        });
    });
};
