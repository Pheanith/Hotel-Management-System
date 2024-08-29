//reservationModel.js
import db from '../utils/db.js';

// Get all reservations
export const getAllReservation = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM reservations', (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
};