// guestRoute.js
import express from 'express';
import {
    getGuests,         // Make sure this matches your controller's export
    getAGuest,
    createGuest,
    updateGuestById,
    deleteGuestById,  // Ensure this matches the controller's export
} from '../controllers/guestController.js';

const router = express.Router();

// Get all guests
router.get('/', getGuests);  // Ensure function names match in the controller

// Get guest by ID
router.get('/:id', getAGuest);

// Create a new guest
router.post('/', createGuest);

// Update guest by ID
router.put('/:id', updateGuestById);

// Delete a guest by ID
router.delete('/:id', deleteGuestById); // Ensure function names match in the controller

export default router;
