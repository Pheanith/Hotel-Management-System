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
        db.query('SELECT * FROM guests WHERE id = ?', [id], (err, results) =>{
            if (err) {
                console.error('Database error:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
};

//Add a new guest
export const addGuest = (guest) => {
    const {
        firstName,
        lastName,
        phoneNumber,
        email,
        address
    } = guest;
    
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO guests (firstName, lastName, phoneNumber, email, address) VALUES (?, ?, ?, ?, ?)',
            [firstName, lastName, phoneNumber, email, address],
            (err, results) => {
                if (err) {
                    console.error('Database error:', err);
                    return reject(err);
                }
                if (results && results.insertId !== undefined) {
                    resolve(results.insertId);
                } else {
                    reject(new Error('Insert result dose not contain insertId'));
                }
            }
        );
    });
};

//Update a guest by ID 
export const updateGuest = (id, updates) => {
    const {
        firstName,
        lastName,
        phoneNumber,
        email,
        address
    } = updates;

    return new Promise ((resolve, reject) => {
        db.query(
            'UPDATE guests SET firstName = ?, lastName = ?, phoneNumber = ?, email = ?, address = ?',
            [firstName, lastName, phoneNumber, email, address, id],
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
            'DELETE FROM guests WHERE id =?', [id], (err, results) => {
                if (err) {
                    console.error('Database error:', err);
                    return reject(err);
                }
                resolve(results.affectedRows > 0);
            }
        );
    });
};