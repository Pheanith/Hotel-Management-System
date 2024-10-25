// controllers/availabilityController.js
import AvailabilityModel from '../models/availabilityModel.js';

// Get all room availability
export const getAllRoomAvailability = async (req, res) => {
    try {
        const availability = await AvailabilityModel.getAll();
        res.status(200).json(availability);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching room availability' });
    }
};

// Get availability by room ID
export const getAvailabilityByRoomId = async (req, res) => {
    const { roomId } = req.params;

    try {
        const availability = await AvailabilityModel.getByRoomId(roomId);
        res.status(200).json(availability);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching availability by room ID' });
    }
};

// Add room availability
export const addRoomAvailability = async (req, res) => {
    const availability = req.body;

    try {
        const newAvailabilityId = await AvailabilityModel.create(availability);
        res.status(201).json({ id: newAvailabilityId });
    } catch (error) {
        res.status(500).json({ message: 'Error adding room availability' });
    }
};

// Update room availability
export const updateRoomAvailability = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updated = await AvailabilityModel.update(id, updates);
        if (updated) {
            res.status(200).json({ message: 'Room availability updated' });
        } else {
            res.status(404).json({ message: 'Room availability not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating room availability' });
    }
};

// Delete room availability by ID
export const deleteRoomAvailability = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await AvailabilityModel.delete(id);
        if (deleted) {
            res.status(200).json({ message: 'Room availability deleted' });
        } else {
            res.status(404).json({ message: 'Room availability not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting room availability' });
    }
};
