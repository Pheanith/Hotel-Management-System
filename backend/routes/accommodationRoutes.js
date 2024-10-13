import express from 'express';
import {
    fetchAccommodationTypes,
    createAccommodationType,
    // Import other controller functions as needed
} from '../controllers/accommodationController.js'; // Adjust path as necessary

const router = express.Router();

// Route for fetching all accommodation types
router.get('/', fetchAccommodationTypes);

// Route for adding a new accommodation type
router.post('/', createAccommodationType);

// Add other routes for updating and deleting as needed
// e.g., router.put('/:id', updateAccommodationType);
//      router.delete('/:id', deleteAccommodationType);

export default router;
