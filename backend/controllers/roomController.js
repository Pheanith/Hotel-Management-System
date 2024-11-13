// controllers/roomController.js
import { fetchAllRooms, fetchRoomById, createRoom, updateRoomById, deleteRoomById } from '../models/roomModel.js';

export const getRooms = async (req, res) => {
    try {
        const rooms = await fetchAllRooms();
        console.log(rooms); // Log the fetched rooms to verify the output
        res.status(200).json(rooms);
    } catch (error) {
        console.error('Failed to retrieve rooms:', error);
        res.status(500).json({ error: 'Failed to retrieve rooms' });
    }
};

export const getRoomById = async (req, res) => {
    const { id } = req.params;
    try {
        const room = await fetchRoomById(id);
        if (room) {
            res.status(200).json(room);
        } else {
            res.status(404).json({ error: 'Room not found' });
        }
    } catch (error) {
        console.error('Failed to retrieve room details:', error);
        res.status(500).json({ error: 'Failed to retrieve room details' });
    }
};

export const addRoom = async (req, res) => {
    const roomData = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const roomId = await createRoom(roomData, imageUrl);
        res.status(201).json({ message: 'Room created successfully', roomId, imageUrl });
    } catch (error) {
        console.error('Failed to create room:', error);
        res.status(500).json({ error: 'Failed to create room' });
    }
};

export const updateRoom = async (req, res) => {
    const { id } = req.params;
    const roomData = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const rowsAffected = await updateRoomById(id, roomData, imageUrl);
        if (rowsAffected > 0) {
            res.status(200).json({ message: 'Room updated successfully' });
        } else {
            res.status(404).json({ error: 'Room not found' });
        }
    } catch (error) {
        console.error('Failed to update room:', error);
        res.status(500).json({ error: 'Failed to update room' });
    }
};

export const deleteRoom = async (req, res) => {
    const { id } = req.params;

    try {
        const rowsAffected = await deleteRoomById(id);
        if (rowsAffected > 0) {
            res.status(200).json({ message: 'Room deleted successfully' });
        } else {
            res.status(404).json({ error: 'Room not found' });
        }
    } catch (error) {
        console.error('Failed to delete room:', error);
        res.status(500).json({ error: 'Failed to delete room' });
    }
};
