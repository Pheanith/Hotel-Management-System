import {
    getAllGuests,
    getGuestByID,
    addGuest,
    updateGuest,
    deleteGuest
} from '../models/guestModel.js';

// Get all guests
export const getGuests = async (req, res) => {
    try {
        const guests = await getAllGuests();
        if (guests.length === 0) {
            return res.status(404).json({ message: 'No guests found' });
        }
        res.json(guests);
    } catch (error) {
        console.error('Error fetching guests:', error);
        res.status(500).json({ error: 'Failed to retrieve guests' });
    }
};

// Get a guest by ID
export const getAGuest = async (req, res) => {
    try {
        const guest = await getGuestByID(req.params.id);
        if (!guest) { // Changed from guest.length === 0
            return res.status(404).json({ message: 'Guest not found' });
        }
        res.json(guest);
    } catch (error) {
        console.error('Error fetching guest by ID:', error);
        res.status(500).json({ error: 'Failed to retrieve guest' });
    }
};

// Add a new guest
export const createGuest = async (req, res) => {
    try {
        const newGuest = req.body;
        const guestId = await addGuest(newGuest);
        res.status(201).json({ message: 'Guest added successfully', guestId });
    } catch (error) {
        console.error('Error adding guest:', error);
        res.status(500).json({ error: 'Failed to add guest' });
    }
};

// Update a guest by ID
export const updateGuestById = async (req, res) => {
    try {
        const updated = await updateGuest(req.params.id, req.body);
        if (updated) {
            res.json({ message: 'Guest updated successfully' });
        } else {
            res.status(404).json({ message: 'Guest not found' });
        }
    } catch (error) {
        console.error('Error updating guest:', error);
        res.status(500).json({ error: 'Failed to update guest' });
    }
};

// Delete a guest by ID
export const deleteGuestById = async (req, res) => {
    try {
        const deleted = await deleteGuest(req.params.id);
        if (deleted) {
            res.json({ message: 'Guest deleted successfully' });
        } else {
            res.status(404).json({ message: 'Guest not found' });
        }
    } catch (error) {
        console.error('Error deleting guest:', error);
        res.status(500).json({ error: 'Failed to delete guest' });
    }
};
