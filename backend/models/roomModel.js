// models/roomModel.js
import db from '../utils/db.js';

// Fetch all rooms with their types and accommodation types
export const fetchAllRooms = async () => {
    try {
        const [rooms] = await db.query(`
            SELECT rooms.*, 
                   room_types.type_name AS room_type, 
                   accommodation_types.type_name AS accommodation_type
            FROM rooms
            JOIN room_types ON rooms.room_type_id = room_types.id
            JOIN accommodation_types ON rooms.accommodation_type_id = accommodation_types.id
        `);
        return rooms.length ? rooms : []; // Ensure it always returns an array
    } catch (error) {
        console.error("Error fetching all rooms:", error);
        throw new Error("Failed to retrieve rooms");
    }
};

// Fetch a single room by ID with type and accommodation type details
export const fetchRoomById = async (id) => {
    try {
        const [room] = await db.query(`
            SELECT rooms.*, room_types.type_name AS room_type, accommodation_types.type_name AS accommodation_type
            FROM rooms
            JOIN room_types ON rooms.room_type_id = room_types.id
            JOIN accommodation_types ON rooms.accommodation_type_id = accommodation_types.id
            WHERE rooms.id = ?
        `, [id]);
        return room[0] || null; // Return null if room not found
    } catch (error) {
        console.error("Error fetching room by ID:", error);
        throw new Error("Failed to retrieve room details");
    }
};

// Create a new room entry
export const createRoom = async (roomData, imageUrl) => {
    const { room_number, floor, room_type_id, accommodation_type_id, price, status } = roomData;
    const imageUrlValue = imageUrl || null; // Use null if imageUrl is not provided
    try {
        const [result] = await db.query(`
            INSERT INTO rooms (room_number, floor, room_type_id, accommodation_type_id, price, status, image_url, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        `, [room_number, floor, room_type_id, accommodation_type_id, price, status, imageUrlValue]);
        return result.insertId;
    } catch (error) {
        console.error("Error creating room:", error);
        throw new Error("Failed to create room");
    }
};

// Update an existing room
export const updateRoomById = async (id, roomData, imageUrl) => {
    const { room_number, floor, room_type_id, accommodation_type_id, price, status } = roomData;
    const imageUrlValue = imageUrl || null; // Use null if imageUrl is not provided
    try {
        const [result] = await db.query(`
            UPDATE rooms 
            SET room_number = ?, floor = ?, room_type_id = ?, accommodation_type_id = ?, price = ?, status = ?, image_url = ?, updated_at = NOW()
            WHERE id = ?
        `, [room_number, floor, room_type_id, accommodation_type_id, price, status, imageUrlValue, id]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error updating room by ID:", error);
        throw new Error("Failed to update room details");
    }
};

// Delete a room by ID
export const deleteRoomById = async (id) => {
    try {
        const [result] = await db.query('DELETE FROM rooms WHERE id = ?', [id]);
        return result.affectedRows;
    } catch (error) {
        console.error("Error deleting room by ID:", error);
        throw new Error("Failed to delete room");
    }
};
