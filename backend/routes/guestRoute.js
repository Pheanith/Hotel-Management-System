// guestRoute.js
import express from 'express';
import {
    getGuest,
    getAGuest,
    createGuest,
    updateGuestById,
    deleteguestById,
} from '../controllers/guestController.js';

const router = express.Router();

// Get all guests
router.get('/', getGuest);

// Get guest by ID
router.get('/:id', getAGuest);

// Create a new guest
router.post('/', createGuest);

// Update guest by ID
router.put('/:id', updateGuestById);

// Delete a guest by ID
router.delete('/:id', deleteguestById);

export default router;