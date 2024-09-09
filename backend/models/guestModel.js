//guestModel.js
import db from '../utils/db.js';

// Get all guests
export const getAllGuests = () => {
    return new Promise ((resolve, reject) => {
        db.query('SELECT * FROM guests', (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
};

// Get a guest by ID
export const getGuestByID = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM guests WHERE guest_id = ?', [id], (err, results) =>{
            if (err) {
                console.error('Database error:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
};

// Add a new guest
export const addGuest = (guest) => {
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
    
    // Trim and capitalize 'sex' to match 'Male' or 'Female'
    const validSex = sex.trim().toLowerCase() === 'female' ? 'Female' : 'Male';

    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO guests (firstName, lastName, sex, phoneNumber, email, address, identity_type, identity_no) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [firstName, lastName, validSex, phoneNumber, email, address, identity_type, identity_no],
            (err, results) => {
                if (err) {
                    console.error('Database error:', err);
                    return reject(err);
                }
                if (results && results.insertId !== undefined) {
                    resolve(results.insertId);
                } else {
                    reject(new Error('Insert result does not contain insertId'));
                }
            }
        );
    });
};


// Update a guest by ID 
export const updateGuest = (id, updates) => {
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

    // Trim and capitalize 'sex' to match 'Male' or 'Female'
    const validSex = sex.trim().toLowerCase() === 'female' ? 'Female' : 'Male';

    return new Promise ((resolve, reject) => {
        db.query(
            'UPDATE guests SET firstName = ?, lastName = ?, sex = ?, phoneNumber = ?, email = ?, address = ?, identity_type = ?, identity_no = ? WHERE guest_id = ?',
            [firstName, lastName, validSex, phoneNumber, email, address, identity_type, identity_no, id],
            (err, results) => {
                if (err) {
                    console.error('Database error:', err);
                    return reject(err);
                }
                resolve(results.affectedRows > 0);
            }
        );
    });
};

// Delete a guest by ID
export const deleteGuest = (id) => {
    return new Promise((resolve, reject) => {
        db.query(
            'DELETE FROM guests WHERE guest_id = ?', [id], (err, results) => {
                if (err) {
                    console.error('Database error:', err);
                    return reject(err);
                }
                resolve(results.affectedRows > 0);
            }
        );
    });
};
