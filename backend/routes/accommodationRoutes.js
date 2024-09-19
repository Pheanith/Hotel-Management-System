import express from 'express';
import {
    fetchAccommodationTypes,
    getAccommodationTypeById,
    createAccommodationType,
    updateAccommodationTypeById,
    deleteAccommodationTypeById
} from '../controllers/accommodationController.js';

const router = express.Router();

// Get all accommodation types
router.get('/', fetchAccommodationTypes);

// Get a single accommodation type by ID
router.get('/:id', getAccommodationTypeById);

// Add a new accommodation type
router.post('/', createAccommodationType);

// Update an accommodation type by ID
router.put('/:id', updateAccommodationTypeById);

// Delete an accommodation type by ID
router.delete('/:id', deleteAccommodationTypeById);

export default router;
