import db from '../utils/db.js';

// Get all rooms
export const getAllRooms = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM rooms', (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
};

// Get a room by ID
export const getRoomById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM rooms WHERE id = ?', [id], (err, results) => {
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
    const { building, accomodationType, roomType, floorNumber, roomNumber, price, status, availableFrom, availableTo, description } = room;
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO rooms (building, accomodationType, roomType, floorNumber, roomNumber, price, status, availableFrom, availableTo, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [building, accomodationType, roomType, floorNumber, roomNumber, price, status, availableFrom, availableTo, description], 
            (err, result) => {
                if (err) {
                    console.error('Database error:', err);
                    return reject(err);
                }
                if (result && result.insertId !== undefined) {
                    resolve(result.insertId);
                } else {
                    reject(new Error('Insert result does not contain insertId'));
                }
            }
        );
    });
};

// Update a room by ID
export const updateRoom = (id, updates) => {
    const { building, accomodationType, roomType, floorNumber, roomNumber, price, status, availableFrom, availableTo, description } = updates;
    return new Promise((resolve, reject) => {
        db.query('UPDATE rooms SET building = ?, accomodationType = ?, roomType = ?, floorNumber = ?, roomNumber = ?, price = ?, status = ?, availableFrom = ?, availableTo = ?, description = ? WHERE id = ?', 
            [building, accomodationType, roomType, floorNumber, roomNumber, price, status, availableFrom, availableTo, description, id], 
            (err, result) => {
                if (err) {
                    console.error('Database error:', err);
                    return reject(err);
                }
                resolve(result.affectedRows > 0);
            }
        );
    });
};

// Delete a room by ID
export const deleteRoom = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM rooms WHERE id = ?', [id], (err, result) => {
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

        if (checkIn && checkOut) {
            // Query for filtering rooms based on the checkIn and checkOut dates
            query = `
                SELECT * FROM rooms
                WHERE status = 'Available'
                AND availableFrom <= ?
                AND availableTo >= ?
                ORDER BY roomNumber ASC;
            `;
            params = [checkOut, checkIn];
        } else {
            // Query for showing all available rooms
            query = `
                SELECT * FROM rooms
                WHERE status = 'Available'
                ORDER BY roomNumber ASC;
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
