//guestController.js
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
        // console.log("guest information:", guests);
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
        console.log("new guest:",newGuest);
    } catch (error) {
        console.error('Error adding guest:', error);
        res.status(500).json({ error: 'Server Error'});
    }
    // console.log("new guest:",newGuest);
};

// Update a guest by ID
export const updateGuestById = async (req, res) => {
    try {
        const updated = await updateGuest(req.params.id, req.body);
        if (updated) {
            // console.log("success:", updated);
            res.json({ message: 'Guest updated successfully'});
        } else {
            res.status(500).json({ error: 'Server Error'});
        } 
    } catch (error) {
        console.error('Error updating guest:', error);
        res.status(500).json({ error: 'Server Error'});
    }
    // console.log("update guest:",req.body);
};

//Delete a guest by ID
export const deleteguestById = async (req, res) => {
    try {
        const deleted = await deleteGuest(req.params.id);
        if (deleted) {
            // console.log("deleted guest:",deleted);
            res.json({ message: 'Guest deleted successfully' });
        } else {
            res.status(404).json({ message: 'Guest not found 123' });
        }
    } catch (error) {
        console.error('Error deleting guest:', error);
        res.status(500).json({ error: 'Server Error' });
    }
    // console.log("Deleted guest id: ",req.params.id);
};