// controllers/roomController.js

import db from '../utils/db.js'; // Adjust this import based on your directory structure

// Get all rooms with room and accommodation type details
export const getAllRooms = async (req, res) => {
    try {
        const query = `
            SELECT rooms.*, 
                   room_types.type_name AS room_type_name, 
                   accommodation_types.accommodation_name AS accommodation_type_name
            FROM rooms
            LEFT JOIN room_types ON rooms.room_type_id = room_types.room_type_id
            LEFT JOIN accommodation_types ON rooms.accommodation_type_id = accommodation_types.accommodation_type_id
        `;
        const [rows] = await db.query(query);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching rooms:", error);
        res.status(500).json({ message: "Error fetching rooms" });
    }
};

// Get a room by ID
export const getRoomById = async (req, res) => {
    const { id } = req.params;
    try {
        const query = `
            SELECT rooms.*, 
                   room_types.type_name AS room_type_name, 
                   accommodation_types.accommodation_name AS accommodation_type_name
            FROM rooms
            LEFT JOIN room_types ON rooms.room_type_id = room_types.room_type_id
            LEFT JOIN accommodation_types ON rooms.accommodation_type_id = accommodation_types.accommodation_type_id
            WHERE room_id = ?
        `;
        const [rows] = await db.query(query, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Room not found" });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Error fetching room:", error);
        res.status(500).json({ message: "Error fetching room" });
    }
};

// Create a new room
export const createRoom = async (req, res) => {
    const { room_number, room_type_id, accommodation_type_id, price_per_night, status, floor_number, description } = req.body;
    try {
        const query = `
            INSERT INTO rooms (room_number, room_type_id, accommodation_type_id, price_per_night, status, floor_number, description)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const result = await db.query(query, [room_number, room_type_id, accommodation_type_id, price_per_night, status, floor_number, description]);
        res.status(201).json({ id: result.insertId, message: "Room created successfully" });
    } catch (error) {
        console.error("Error creating room:", error);
        res.status(500).json({ message: "Error creating room" });
    }
};

// Update a room by ID
export const updateRoom = async (req, res) => {
    const { id } = req.params;
    const { room_number, room_type_id, accommodation_type_id, price_per_night, status, floor_number, description } = req.body;
    try {
        const query = `
            UPDATE rooms
            SET room_number = ?, room_type_id = ?, accommodation_type_id = ?, price_per_night = ?, status = ?, floor_number = ?, description = ?
            WHERE room_id = ?
        `;
        await db.query(query, [room_number, room_type_id, accommodation_type_id, price_per_night, status, floor_number, description, id]);
        res.status(200).json({ message: "Room updated successfully" });
    } catch (error) {
        console.error("Error updating room:", error);
        res.status(500).json({ message: "Error updating room" });
    }
};

// Delete a room by ID
export const deleteRoom = async (req, res) => {
    const { id } = req.params;
    try {
        const query = `
            DELETE FROM rooms WHERE room_id = ?
        `;
        await db.query(query, [id]);
        res.status(200).json({ message: "Room deleted successfully" });
    } catch (error) {
        console.error("Error deleting room:", error);
        res.status(500).json({ message: "Error deleting room" });
    }
};
