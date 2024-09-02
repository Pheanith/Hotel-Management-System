import {
    getAllGuests,
    getGuestByID,
    addGuest,
    updateGuest,
    deleteGuest
} from '../models/guestModel.js';

// Get all guests
export const getGuest = async (req, res) => {
    try {
        const guests = await getAllGuests();
        res.json(guests);
    } catch (error) {
        console.error('Error fetching guests:', error);
        res.status(500).json({error: 'Server Error'});
    }
};

// Get a guest by ID
export const getAGuest = async (req, res) => {
    try {
        const guests = await getGuestByID(req.params.id);
        if (guests) {
            res.json(guests);
        } else {
            res.status(404).json({message: 'Guest not found'});
        }
    } catch (error) {
        console.error('Error fetching room by ID:', error);
        res.status(500).json({error: 'Server Error'});
    }
};

// Add new guest 
export const createGuest = async (req, res) => {
    try {
        const newGuest = req.body;
        const guestId = await addGuest(newGuest);
        res.status(201).json({message: 'Guest added successfully', guestId});
    } catch (error) {
        console.error('Error adding guest:', error);
        res.status(500).json({ error: 'Server Error'});
    }
};

// Update a guest by ID
export const updateGuestById = async (req, res) => {
    try {
        const updated = await updateGuest(req.params.id, req.body);
        if (updated) {
            res.json({ message: 'Guest updated successfully'});
        } else {
            res.status(500).json({ error: 'Server Error'});
        } 
    } catch (error) {
        console.error('Error updating guest:', error);
        res.status(500).json({ error: 'Server Error'});
    }
};

//Delete a guest by ID
export const deleteguestById = async (req, res) => {
    try {
        const deleted = await deleteGuest(req.params.id);
        if (deleted) {
            res.json({ message: 'Guest deleted successfully' });
        } else {
            res.status(404).json({ message: 'Guest not found 123' });
        }
    } catch (error) {
        console.error('Error deleting guest:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};