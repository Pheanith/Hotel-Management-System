//roomModel.js
import db from '../utils/db.js';



// Get all rooms with room_type and accommodation_type
export const getAllRooms = () => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT rooms.*, room_types.name AS room_type_name, accommodation_types.name AS accommodation_type_name
            FROM rooms
            JOIN room_types ON rooms.room_type_id = room_types.room_type_id
            JOIN accommodation_types ON rooms.accommodation_type_id = accommodation_types.accommodation_type_id
        `;

        db.query(query, (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
};

// Get a room by ID with room_type and accommodation_type
export const getRoomById = (id) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT rooms.*, room_types.name AS room_type_name, accommodation_types.name AS accommodation_type_name
            FROM rooms
            JOIN room_types ON rooms.room_type_id = room_types.room_type_id
            JOIN accommodation_types ON rooms.accommodation_type_id = accommodation_types.accommodation_type_id
            WHERE rooms.room_id = ?
        `;
        
        db.query(query, [id], (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return reject(err);
            }
            resolve(results[0]);
        });
    });
};


// Add a new room
export const addRoom = (room) => {
    const { accommodation_type_id, room_type_id, floor_number, room_number, price_per_night, availability_status, description } = room;
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO rooms (accommodation_type_id, room_type_id, floor_number, room_number, price_per_night, availability_status, description) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(query, [accommodation_type_id, room_type_id, floor_number, room_number, price_per_night, availability_status, description], (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return reject(err);
            }
            resolve(result.insertId);
        });
    });
};

// Update room
export const updateRoom = (id, updates) => {
    const { accommodation_type_id, room_type_id, floor_number, room_number, price_per_night, availability_status, description } = updates;
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE rooms 
            SET accommodation_type_id = ?, room_type_id = ?, floor_number = ?, room_number = ?, price_per_night = ?, availability_status = ?, description = ?
            WHERE room_id = ?
        `;
        
        db.query(query, [accommodation_type_id, room_type_id, floor_number, room_number, price_per_night, availability_status, description, id], (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return reject(err);
            }
            resolve(result.affectedRows > 0);
        });
    });
};


// Delete a room by ID
export const deleteRoom = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM rooms WHERE room_id = ?', [id], (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return reject(err);
            }
            resolve(result.affectedRows > 0);
        });
    });
};

// Get available rooms
export const getAvailableRooms = (checkIn, checkOut) => {
    return new Promise((resolve, reject) => {
        let query;
        let params = [];

        // Case 1: When check-in and check-out dates are provided
        if (checkIn && checkOut) {
            query = `
                SELECT rooms.*, 
                    room_types.name AS room_type_name, 
                    accommodation_types.name AS accommodation_type_name
                FROM rooms
                JOIN room_types ON rooms.room_type_id = room_types.room_type_id
                JOIN accommodation_types ON rooms.accommodation_type_id = accommodation_types.accommodation_type_id
                WHERE rooms.availability_status = 'Available'
                AND rooms.availability_status != 'Maintenance'
                AND NOT EXISTS (
                    SELECT 1
                    FROM reservation_details rd
                    JOIN reservations r ON rd.reservation_id = r.reservation_id
                    WHERE rd.room_id = rooms.room_id
                    AND r.checkin_date < ? 
                    AND r.checkout_date > ?
                )
                ORDER BY rooms.room_id ASC;

            `;
            params = [checkOut, checkIn];

        // Case 2: Default case without date filtering (just show available rooms excluding maintenance)
        } else {
            query = `
                SELECT rooms.*, room_types.name AS room_type_name, accommodation_types.name AS accommodation_type_name
                FROM rooms
                JOIN room_types ON rooms.room_type_id = room_types.room_type_id
                JOIN accommodation_types ON rooms.accommodation_type_id = accommodation_types.accommodation_type_id
                WHERE rooms.availability_status = 'Available'
                AND rooms.availability_status != 'Maintenance'
                ORDER BY rooms.room_number ASC;
            `;
        }

        db.query(query, params, (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
};


// Get room type 
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

// Get all accommodation types
export const getAllAccommodationTypes = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM accommodation_types', (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
};

export const updateRoomAvailability = (rooms) => {
    return Promise.all(rooms.map(room => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE rooms SET status = ? WHERE room_id = ?';
            db.query(query, ['Occupied', room.room_id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }));
};

