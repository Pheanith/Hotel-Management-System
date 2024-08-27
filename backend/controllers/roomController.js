//roomController.js
import {
    getAllRooms,
    getRoomById as fetchRoomById,  // Renamed to avoid conflict
    addRoom,
    updateRoom,
    deleteRoom
} from '../models/roomModel.js';

// Get all rooms
export const getRoom = async (req, res) => {  // Fixed: Added `req` parameter
    try {
        const rooms = await getAllRooms();
        res.json(rooms);
    } catch (error) {
        console.error('Error fetching rooms:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// Get a room by ID
export const getRoomById = async (req, res) => {
    try {
        const room = await fetchRoomById(req.params.id);
        if (room) {
            res.json(room);
        } else {
            res.status(404).json({ message: 'Room not found' });
        }
    } catch (error) {
        console.error('Error fetching room by ID:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// Add a new room
export const createRoom = async (req, res) => {
    try {
        const newRoom = req.body;
        const roomId = await addRoom(newRoom);
        res.status(201).json({ message: 'Room added successfully', roomId });
    } catch (error) {
        console.error('Error adding room:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// Update a room by ID
export const updateRoomById = async (req, res) => {
    try {
        const updated = await updateRoom(req.params.id, req.body);
        if (updated) {
            res.json({ message: 'Room updated successfully' });
        } else {
            res.status(404).json({ message: 'Room not found' });
        }
    } catch (error) {
        console.error('Error updating room:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// Delete a room by ID
export const deleteRoomById = async (req, res) => {
    try {
        const deleted = await deleteRoom(req.params.id);
        if (deleted) {
            res.json({ message: 'Room deleted successfully' });
        } else {
            res.status(404).json({ message: 'Room not found' });
        }
    } catch (error) {
        console.error('Error deleting room:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};
