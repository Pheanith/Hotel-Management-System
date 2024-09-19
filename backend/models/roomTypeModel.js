import db from '../utils/db.js';

// Get all room types
export const getAllRoomTypes = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM room_types', (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
};

// Get room type by ID
export const getRoomTypeById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM room_types WHERE room_type_id = ?', [id], (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return reject(err);
            }
            resolve(results[0]);
        });
    });
};

// Add a new room type
export const addRoomType = (roomType) => {
    const { name, description } = roomType;
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO room_types (name, description) VALUES (?, ?)';
        db.query(query, [name, description], (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return reject(err);
            }
            resolve(result.insertId);
        });
    });
};

// Update room type by ID
export const updateRoomType = (id, updates) => {
    const { name, description } = updates;
    return new Promise((resolve, reject) => {
        const query = 'UPDATE room_types SET name = ?, description = ? WHERE room_type_id = ?';
        db.query(query, [name, description, id], (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return reject(err);
            }
            resolve(result.affectedRows > 0);
        });
    });
};

// Delete room type by ID
export const deleteRoomType = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM room_types WHERE room_type_id = ?', [id], (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return reject(err);
            }
            resolve(result.affectedRows > 0);
        });
    });
};
