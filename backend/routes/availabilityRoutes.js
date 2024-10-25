// routes/availabilityRoutes.js
import express from 'express';
import {
    getAllRoomAvailability,
    getAvailabilityByRoomId,
    addRoomAvailability,
    updateRoomAvailability,
    deleteRoomAvailability,
} from '../controllers/availabilityController.js';

const router = express.Router();

// Define routes
router.get('/', getAllRoomAvailability); // Get all room availability
router.get('/:roomId', getAvailabilityByRoomId); // Get availability by room ID
router.post('/', addRoomAvailability); // Add room availability
router.put('/:id', updateRoomAvailability); // Update room availability
router.delete('/:id', deleteRoomAvailability); // Delete room availability

export default router;
