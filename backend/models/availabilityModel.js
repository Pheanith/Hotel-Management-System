// models/availabilityModel.js
import db from '../utils/db.js';

class AvailabilityModel {
    // Get all room availability
    static async getAll() {
        try {
            const query = `
                SELECT * FROM room_availability
                LEFT JOIN rooms ON room_availability.room_id = rooms.room_id
            `;
            const [results] = await db.query(query);
            return results;
        } catch (error) {
            console.error('Error fetching all room availability:', error);
            throw error;
        }
    }

    // Get availability by room ID
    static async getByRoomId(roomId) {
        try {
            const query = `
                SELECT * FROM room_availability
                WHERE room_id = ?
            `;
            const [results] = await db.query(query, [roomId]);
            return results;
        } catch (error) {
            console.error('Error fetching availability by room ID:', error);
            throw error;
        }
    }

    // Add room availability
    static async create(availability) {
        const { room_id, available_date, is_available } = availability;

        try {
            const insertQuery = `
                INSERT INTO room_availability (room_id, available_date, is_available)
                VALUES (?, ?, ?)
            `;
            const [insertResult] = await db.query(insertQuery, [room_id, available_date, is_available]);
            return insertResult.insertId;
        } catch (error) {
            console.error('Error adding room availability:', error);
            throw error;
        }
    }

    // Update room availability
    static async update(id, updates) {
        const { room_id, available_date, is_available } = updates;

        try {
            const query = `
                UPDATE room_availability
                SET room_id = ?, available_date = ?, is_available = ?
                WHERE availability_id = ?
            `;
            const [result] = await db.query(query, [room_id, available_date, is_available, id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error updating room availability:', error);
            throw error;
        }
    }

    // Delete room availability by ID
    static async delete(id) {
        try {
            const [result] = await db.query('DELETE FROM room_availability WHERE availability_id = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error deleting room availability:', error);
            throw error;
        }
    }
}

export default AvailabilityModel;
