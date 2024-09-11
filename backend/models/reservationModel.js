//reservationModel.js
import db from '../utils/db.js'; // Adjust path to your database connection module

// Helper function to update room status
const updateRoomStatus = (roomNo, status) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE rooms SET status = ? WHERE roomNumber = ?';
        db.query(query, [status, roomNo], (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return reject(err);
            }
            resolve(results.affectedRows);
        });
    });
};

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
export const createReservation = async (reservation) => {
    const { firstName, lastName, email, phoneNumber, roomType, numberOfGuests, address, checkIn, checkOut, price, paymentMethods, specialRequest, status, reserveDate, checkInStatus, roomNo } = reservation;
    return new Promise(async (resolve, reject) => {
        const query = `
            INSERT INTO reservations (firstName, lastName, email, phoneNumber, roomType, numberOfGuests, address, checkIn, checkOut, price, paymentMethods, specialRequest, status, reserveDate, checkInStatus, roomNo)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [firstName, lastName, email, phoneNumber, roomType, numberOfGuests, address, checkIn, checkOut, price, JSON.stringify(paymentMethods), specialRequest, status, reserveDate, checkInStatus, roomNo];
        
        db.query(query, values, async (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return reject(err);
            }

            // Update room status to Unavailable
            try {
                await updateRoomStatus(roomNo, 'Unavailable');
                resolve(results.insertId);
            } catch (updateError) {
                console.error('Failed to update room status:', updateError);
                reject(updateError);
            }
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
export const deleteReservationById = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Get reservation to find room number
            const reservation = await getReservationById(id);
            if (!reservation) {
                return reject(new Error('Reservation not found'));
            }

            // Delete reservation
            db.query('DELETE FROM reservations WHERE id = ?', [id], async (err, results) => {
                if (err) {
                    console.error('Database error:', err);
                    return reject(err);
                }

                // Update room status to Available
                try {
                    await updateRoomStatus(reservation.roomNo, 'Available');
                    resolve(results.affectedRows);
                } catch (updateError) {
                    console.error('Failed to update room status:', updateError);
                    reject(updateError);
                }
            });
        } catch (error) {
            reject(error);
        }
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
