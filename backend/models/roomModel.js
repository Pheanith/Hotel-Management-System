import db from '../utils/db.js';

// Get all rooms with room type and accommodation type
export const getAllRooms = async () => {
    try {
        const query = `
            SELECT rooms.*, room_types.type_name AS room_type_name, accommodation_types.accommodation_name AS accommodation_type_name
            FROM rooms
            LEFT JOIN room_types ON rooms.room_type_id = room_types.room_type_id
            LEFT JOIN accommodation_types ON rooms.accommodation_type_id = accommodation_types.accommodation_type_id
        `;
        const [results] = await db.query(query);
        return results;
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
};

// Get a room by ID with room type and accommodation type
export const getRoomById = async (id) => {
    try {
        const query = `
            SELECT rooms.*, room_types.type_name AS room_type_name, accommodation_types.accommodation_name AS accommodation_type_name
            FROM rooms
            LEFT JOIN room_types ON rooms.room_type_id = room_types.room_type_id
            LEFT JOIN accommodation_types ON rooms.accommodation_type_id = accommodation_types.accommodation_type_id
            WHERE rooms.room_id = ?
        `;
        const [results] = await db.query(query, [id]);
        return results[0];
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
};

// Add a new room
export const addRoom = async (room) => {
    const { accommodation_type_id, room_type_id, floor_number, room_number, price_per_night, status, description } = room;

    try {
        const checkQuery = 'SELECT room_number FROM rooms WHERE room_number = ?';
        const [result] = await db.query(checkQuery, [room_number]);

        if (result.length > 0) {
            throw new Error(`Room number ${room_number} already exists.`);
        }

        const insertQuery = `
            INSERT INTO rooms (accommodation_type_id, room_type_id, floor_number, room_number, price_per_night, status, description) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const [insertResult] = await db.query(insertQuery, [accommodation_type_id, room_type_id, floor_number, room_number, price_per_night, status, description]);
        return insertResult.insertId;
    } catch (error) {
        console.error('Error in addRoom function:', error.message);
        throw error;
    }
};

// Update room
export const updateRoom = async (id, updates) => {
    const { accommodation_type_id, room_type_id, floor_number, room_number, price_per_night, status, description } = updates;

    try {
        const query = `
            UPDATE rooms 
            SET accommodation_type_id = ?, room_type_id = ?, floor_number = ?, room_number = ?, price_per_night = ?, status = ?, description = ?
            WHERE room_id = ?
        `;
        const [result] = await db.query(query, [accommodation_type_id, room_type_id, floor_number, room_number, price_per_night, status, description, id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
};

// Delete a room by ID
export const deleteRoom = async (id) => {
    try {
        const [result] = await db.query('DELETE FROM rooms WHERE room_id = ?', [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
};

// Get available rooms
export const getAvailableRooms = async (checkIn, checkOut) => {
    let query;
    let params = [];

    try {
        if (checkIn && checkOut) {
            query = `
                SELECT rooms.*, room_types.type_name AS room_type_name, accommodation_types.accommodation_name AS accommodation_type_name
                FROM rooms
                LEFT JOIN room_types ON rooms.room_type_id = room_types.room_type_id
                LEFT JOIN accommodation_types ON rooms.accommodation_type_id = accommodation_types.accommodation_type_id
                WHERE rooms.status = 'available'
                AND rooms.room_id NOT IN (
                    SELECT room_id 
                    FROM reservation_details
                    INNER JOIN reservations ON reservations.reservation_id = reservation_details.reservation_id
                    WHERE reservations.checkin_date < ? AND reservations.checkout_date > ?
                )
                AND rooms.status != 'maintenance'
                ORDER BY rooms.room_number ASC;
            `;
            params = [checkOut, checkIn];
        } else {
            query = `
                SELECT rooms.*, room_types.type_name AS room_type_name, accommodation_types.accommodation_name AS accommodation_type_name
                FROM rooms
                LEFT JOIN room_types ON rooms.room_type_id = room_types.room_type_id
                LEFT JOIN accommodation_types ON rooms.accommodation_type_id = accommodation_types.accommodation_type_id
                WHERE rooms.status = 'available'
                AND rooms.status != 'maintenance'
                ORDER BY rooms.room_number ASC;
            `;
        }

        const [results] = await db.query(query, params);
        return results;
    } catch (error) {
        console.error('Error in getAvailableRooms function:', error.message);
        throw error;
    }
};

// Get all room types
export const getAllRoomTypes = async () => {
    try {
        const [results] = await db.query('SELECT * FROM room_types');
        return results;
    } catch (error) {
        console.error('Error fetching room types:', error);
        throw error;
    }
};

// Get all accommodation types
export const getAllAccommodationTypes = async () => {
    try {
        const [results] = await db.query('SELECT * FROM accommodation_types');
        return results;
    } catch (error) {
        console.error('Error fetching accommodation types:', error);
        throw error;
    }
};
