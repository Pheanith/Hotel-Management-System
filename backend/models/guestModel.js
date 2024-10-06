import db from '../utils/db.js';

// Get all guests
export const getAllGuests = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM guests');
        return rows;
    } catch (err) {
        console.error('Database error:', err);
        throw err;
    }
};

// Get a guest by ID
export const getGuestByID = async (id) => {
    try {
        const [rows] = await db.query('SELECT * FROM guests WHERE guest_id = ?', [id]);
        return rows.length > 0 ? rows[0] : null;
    } catch (err) {
        console.error('Database error:', err);
        throw err;
    }
};

// Add a new guest
export const addGuest = async (guest) => {
    const {
        firstName,
        lastName,
        sex,
        phoneNumber,
        email,
        address,
        identity_type,
        identity_no
    } = guest;

    const validSex = sex.trim().toLowerCase() === 'female' ? 'Female' : 'Male';

    try {
        const [result] = await db.query(
            'INSERT INTO guests (firstName, lastName, sex, phoneNumber, email, address, identity_type, identity_no) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [firstName, lastName, validSex, phoneNumber, email, address, identity_type, identity_no]
        );
        return result.insertId;
    } catch (err) {
        console.error('Database error:', err);
        throw err;
    }
};

// Update a guest by ID
export const updateGuest = async (id, updates) => {
    const {
        firstName,
        lastName,
        sex,
        phoneNumber,
        email,
        address,
        identity_type,
        identity_no
    } = updates;

    const validSex = sex.trim().toLowerCase() === 'female' ? 'Female' : 'Male';

    try {
        const [result] = await db.query(
            'UPDATE guests SET firstName = ?, lastName = ?, sex = ?, phoneNumber = ?, email = ?, address = ?, identity_type = ?, identity_no = ? WHERE guest_id = ?',
            [firstName, lastName, validSex, phoneNumber, email, address, identity_type, identity_no, id]
        );
        return result.affectedRows > 0;
    } catch (err) {
        console.error('Database error:', err);
        throw err;
    }
};

// Delete a guest by ID
export const deleteGuest = async (id) => {
    try {
        const [result] = await db.query(
            'DELETE FROM guests WHERE guest_id = ?', [id]
        );
        return result.affectedRows > 0;
    } catch (err) {
        console.error('Database error:', err);
        throw err;
    }
};
