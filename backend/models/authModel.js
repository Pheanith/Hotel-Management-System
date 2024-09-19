import db from '../utils/db.js';

// Find admin by username
export const findAdminByUsername = (username) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM admins WHERE username = ?';
        db.query(query, [username], (err, results) => {
            if (err) return reject(err);
            if (results.length > 0) {
                resolve(results[0]); // Ensure results[0] has the password field
            } else {
                resolve(null);
            }
        });
    });
};
