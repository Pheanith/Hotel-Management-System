import { fetchAllRooms, fetchRoomById, createRoom, updateRoomById, deleteRoomById } from '../models/roomModel.js';

// Helper function to validate room data
const validateRoomData = (data) => {
    const { room_number, floor, room_type_id, accommodation_type_id, price, status } = data;
    if (!room_number || !floor || !room_type_id || !accommodation_type_id || !price || !status) {
        return 'All fields (room_number, floor, room_type_id, accommodation_type_id, price, status) are required.';
    }
    if (isNaN(price)) return 'Price must be a valid number.';
    if (!['available', 'occupied', 'maintenance'].includes(status.toLowerCase())) return 'Invalid room status.';
    return null;
};

// Get all rooms
export const getRooms = async (req, res) => {
    try {
        const rooms = await fetchAllRooms();
        res.status(200).json(rooms);
    } catch (error) {
        console.error('Failed to retrieve rooms:', error);
        res.status(500).json({ error: 'Failed to retrieve rooms' });
    }
};

// Get a room by ID
export const getRoomById = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'Room ID is required.' });

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

// Create a new room
export const addRoom = async (req, res) => {
    const roomData = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const validationError = validateRoomData(roomData);

    if (validationError) return res.status(400).json({ error: validationError });

    try {
        const roomId = await createRoom(roomData, imageUrl);
        res.status(201).json({ message: 'Room created successfully', roomId, imageUrl });
    } catch (error) {
        console.error('Failed to create room:', error);
        res.status(500).json({ error: 'Failed to create room' });
    }
};

// Update a room by ID
export const updateRoom = async (req, res) => {
    const { id } = req.params;
    const roomData = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const validationError = validateRoomData(roomData);

    if (!id) return res.status(400).json({ error: 'Room ID is required.' });
    if (validationError) return res.status(400).json({ error: validationError });

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

// Delete a room by ID
export const deleteRoom = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'Room ID is required.' });

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
