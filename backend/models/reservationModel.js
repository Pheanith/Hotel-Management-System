// models/reservationModel.js
import db from '../utils/db.js'; // Adjust path to your database connection module

// Get a reservation by ID
export const getReservationById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM reservations WHERE id = ?', [id], (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return reject(err);
            }
            resolve(results[0]);
        });
    });
};

// Create a new reservation
export const createReservation = (reservation) => {
    const { firstName, lastName, email, phoneNumber, roomType, numberOfGuests, address, checkIn, checkOut, price, paymentMethods, specialRequest, status, reserveDate, checkInStatus, roomNo } = reservation;
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO reservations (firstName, lastName, email, phoneNumber, roomType, numberOfGuests, address, checkIn, checkOut, price, paymentMethods, specialRequest, status, reserveDate, checkInStatus, roomNo)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [firstName, lastName, email, phoneNumber, roomType, numberOfGuests, address, checkIn, checkOut, price, JSON.stringify(paymentMethods), specialRequest, status, reserveDate, checkInStatus, roomNo];
        
        db.query(query, values, (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return reject(err);
            }
            resolve(results.insertId);
        });
    });
};

// Update a reservation by ID
export const updateReservationById = (id, updatedReservation) => {
    const { firstName, lastName, email, phoneNumber, roomType, numberOfGuests, address, checkIn, checkOut, price, paymentMethods, specialRequest, status, reserveDate, checkInStatus, roomNo } = updatedReservation;
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE reservations
            SET firstName = ?, lastName = ?, email = ?, phoneNumber = ?, roomType = ?, numberOfGuests = ?, address = ?, checkIn = ?, checkOut = ?, price = ?, paymentMethods = ?, specialRequest = ?, status = ?, reserveDate = ?, checkInStatus = ?, roomNo = ?
            WHERE id = ?
        `;
        const values = [firstName, lastName, email, phoneNumber, roomType, numberOfGuests, address, checkIn, checkOut, price, JSON.stringify(paymentMethods), specialRequest, status, reserveDate, checkInStatus, roomNo, id];
        
        db.query(query, values, (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return reject(err);
            }
            resolve(results.affectedRows);
        });
    });
};

// Delete a reservation by ID
export const deleteReservationById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM reservations WHERE id = ?', [id], (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return reject(err);
            }
            resolve(results.affectedRows);
        });
    });
};

// Get all reservations
export const getAllReservations = () => {
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
