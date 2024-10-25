import db from '../utils/db.js';

// Get all room features
export const getAllRoomFeatures = async (req, res) => {
    try {
        const [features] = await db.query('SELECT * FROM room_features');
        res.json(features);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving room features', error });
    }
};

// Get a single room feature by ID
export const getRoomFeatureById = async (req, res) => {
    const { id } = req.params;
    try {
        const [feature] = await db.query('SELECT * FROM room_features WHERE id = ?', [id]);
        if (feature.length === 0) return res.status(404).json({ message: 'Room feature not found' });
        res.json(feature[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving room feature', error });
    }
};

// Create a new room feature
export const createRoomFeature = async (req, res) => {
    const { name } = req.body;
    try {
        await db.query('INSERT INTO room_features (name) VALUES (?)', [name]);
        res.status(201).json({ message: 'Room feature created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating room feature', error });
    }
};

// Update a room feature by ID
export const updateRoomFeature = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const [result] = await db.query('UPDATE room_features SET name = ? WHERE id = ?', [name, id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Room feature not found' });
        res.json({ message: 'Room feature updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating room feature', error });
    }
};

// Delete a room feature by ID
export const deleteRoomFeature = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM room_features WHERE id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Room feature not found' });
        res.json({ message: 'Room feature deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting room feature', error });
    }
};
