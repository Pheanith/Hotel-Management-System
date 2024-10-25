import db from '../utils/db.js';

// Get all reservations
export const getAllReservations = async () => {
    try {
        const query = `
            SELECT reservations.*, rooms.room_number 
            FROM reservations 
            LEFT JOIN rooms ON reservations.room_id = rooms.room_id
            ORDER BY reservations.created_at DESC;
        `;
        const [results] = await db.query(query);
        return results;
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
};

// Get a reservation by ID
export const getReservationById = async (id) => {
    try {
        const query = `
            SELECT reservations.*, rooms.room_number 
            FROM reservations 
            LEFT JOIN rooms ON reservations.room_id = rooms.room_id
            WHERE reservations.reservation_id = ?;
        `;
        const [results] = await db.query(query, [id]);
        return results[0];
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
};

// Add a new reservation
export const addReservation = async (reservation) => {
    const { room_id, guest_name, check_in_date, check_out_date, status } = reservation;

    try {
        const insertQuery = `
            INSERT INTO reservations (room_id, guest_name, check_in_date, check_out_date, status) 
            VALUES (?, ?, ?, ?, ?);
        `;
        const [insertResult] = await db.query(insertQuery, [room_id, guest_name, check_in_date, check_out_date, status]);
        return insertResult.insertId;
    } catch (error) {
        console.error('Error in addReservation function:', error.message);
        throw error;
    }
};

// Update a reservation
export const updateReservation = async (id, updates) => {
    const { room_id, guest_name, check_in_date, check_out_date, status } = updates;

    try {
        const query = `
            UPDATE reservations 
            SET room_id = ?, guest_name = ?, check_in_date = ?, check_out_date = ?, status = ?
            WHERE reservation_id = ?;
        `;
        const [result] = await db.query(query, [room_id, guest_name, check_in_date, check_out_date, status, id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
};

// Delete a reservation by ID
export const deleteReservation = async (id) => {
    try {
        const [result] = await db.query('DELETE FROM reservations WHERE reservation_id = ?', [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
};
