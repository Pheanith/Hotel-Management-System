import express from 'express';
import {
    fetchRoomTypes,
    fetchRoomTypeById,
    createRoomType,
    updateRoomTypeById,
    deleteRoomTypeById
} from '../controllers/roomTypeController.js';

const router = express.Router();

// Get all room types
router.get('/', fetchRoomTypes);

// Get a room type by ID
router.get('/:id', fetchRoomTypeById);

// Add a new room type
router.post('/', createRoomType);

// Update a room type by ID
router.put('/:id', updateRoomTypeById);

// Delete a room type by ID
router.delete('/:id', deleteRoomTypeById);

export default router;
