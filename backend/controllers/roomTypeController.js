import db from '../utils/db.js';

// Create a new room type
export const createRoomType = async (req, res) => {
    const { type_name, description, capacity, bed_configuration, room_size } = req.body;
    const image_url = req.file ? req.file.path : null; // Get the file path from the uploaded file

    try {
        const [result] = await db.query(
            'INSERT INTO room_types (type_name, description, capacity, bed_configuration, room_size, image_url) VALUES (?, ?, ?, ?, ?, ?)',
            [type_name, description, capacity, bed_configuration, room_size, image_url]
        );

        res.status(201).json({
            id: result.insertId,
            type_name,
            description,
            capacity,
            bed_configuration,
            room_size,
            image_url,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong!' });
    }
};

// Get all room types
export const getRoomTypes = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM room_types');
        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch room types' });
    }
};

// Get a specific room type by ID
export const getRoomTypeById = async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await db.query('SELECT * FROM room_types WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Room type not found' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong!' });
    }
};

// Update a specific room type by ID
export const updateRoomType = async (req, res) => {
    const { id } = req.params;
    const { type_name, description, capacity, bed_configuration, room_size } = req.body;
    const image_url = req.file ? req.file.path : null;

    try {
        const [existingRoomType] = await db.query('SELECT * FROM room_types WHERE id = ?', [id]);
        if (existingRoomType.length === 0) {
            return res.status(404).json({ error: 'Room type not found' });
        }

        const currentImageUrl = existingRoomType[0].image_url;
        const [result] = await db.query(
            `UPDATE room_types 
            SET 
                type_name = ?, 
                description = ?, 
                capacity = ?, 
                bed_configuration = ?, 
                room_size = ?, 
                image_url = ?, 
                updated_at = CURRENT_TIMESTAMP 
            WHERE id = ?`,
            [type_name, description, capacity, bed_configuration, room_size, image_url || currentImageUrl, id]
        );

        if (result.affectedRows === 0) {
            return res.status(400).json({ message: 'No changes were made. Please check your data.' });
        }

        res.status(200).json({
            id,
            type_name,
            description,
            capacity,
            bed_configuration,
            room_size,
            image_url: image_url || currentImageUrl,
            updated_at: new Date().toISOString()
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update room type' });
    }
};

// Delete a room type by ID
export const deleteRoomType = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('DELETE FROM room_types WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Room type not found' });
        }

        res.status(200).json({ message: 'Room type deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete room type' });
    }
};
