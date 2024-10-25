import {
    getAllRoomTypes,
    getRoomTypeById,
    addRoomType,
    updateRoomType,
    deleteRoomType
  } from '../models/roomTypeModel.js';
  
  // Get all room types
  export const fetchRoomTypes = async (req, res) => {
    try {
        const roomTypes = await getAllRoomTypes();
        res.json(roomTypes);
    } catch (error) {
        console.error('Error fetching room types:', error);
        res.status(500).json({ error: 'Server Error' });
    }
  };
  
  // Get a room type by ID
  export const fetchRoomTypeById = async (req, res) => {
    try {
        const roomType = await getRoomTypeById(req.params.id);
        if (roomType) {
            res.json(roomType);
        } else {
            res.status(404).json({ message: 'Room Type not found' });
        }
    } catch (error) {
        console.error('Error fetching room type by ID:', error);
        res.status(500).json({ error: 'Server Error' });
    }
  };
  
  // Add a new room type
  export const createRoomType = async (req, res) => {
    try {
        const newRoomType = req.body; // Expecting all room type fields
        const roomTypeId = await addRoomType(newRoomType);
        res.status(201).json({ message: 'Room type added successfully', roomTypeId });
    } catch (error) {
        console.error('Error adding room type:', error);
        res.status(500).json({ error: 'Server Error' });
    }
  };
  
  // Update a room type by ID
  export const updateRoomTypeById = async (req, res) => {
    try {
        const updated = await updateRoomType(req.params.id, req.body); // Expecting all updated fields
        if (updated) {
            res.json({ message: 'Room type updated successfully' });
        } else {
            res.status(404).json({ message: 'Room type not found' });
        }
    } catch (error) {
        console.error('Error updating room type:', error);
        res.status(500).json({ error: 'Server Error' });
    }
  };
  
  // Delete a room type by ID
  export const deleteRoomTypeById = async (req, res) => {
    try {
        const deleted = await deleteRoomType(req.params.id);
        if (deleted) {
            res.json({ message: 'Room type deleted successfully' });
        } else {
            res.status(404).json({ message: 'Room type not found' });
        }
    } catch (error) {
        console.error('Error deleting room type:', error);
        res.status(500).json({ error: 'Server Error' });
    }
  };
  