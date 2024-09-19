import db from '../utils/db.js';

// Get all accommodation types
export const getAllAccommodationTypes = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM accommodation_types', (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
};

// Get accommodation type by ID
export const getAccommodationTypeById = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM accommodation_types WHERE accommodation_type_id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return reject(err);
            }
            resolve(results[0]);
        });
    });
};

// Add a new accommodation type
export const addAccommodationType = (accommodationType) => {
    const { name, description } = accommodationType;
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO accommodation_types (name, description) VALUES (?, ?)';
        db.query(query, [name, description], (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return reject(err);
            }
            resolve(result.insertId);
        });
    });
};

// Update accommodation type by ID
export const updateAccommodationType = (id, updates) => {
    const { name, description } = updates;
    return new Promise((resolve, reject) => {
        const query = 'UPDATE accommodation_types SET name = ?, description = ? WHERE accommodation_type_id = ?';
        db.query(query, [name, description, id], (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return reject(err);
            }
            resolve(result.affectedRows > 0);
        });
    });
};

// Delete accommodation type by ID
export const deleteAccommodationType = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM accommodation_types WHERE accommodation_type_id = ?', [id], (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return reject(err);
            }
            resolve(result.affectedRows > 0);
        });
    });
};
