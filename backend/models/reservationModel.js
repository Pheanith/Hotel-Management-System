import db from '../utils/db.js'; // Adjust path to your database connection module

// Helper function to update room status
const updateRoomStatus = (roomNumber, status="") => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE rooms SET availability_status = ? WHERE room_number = ?';
        db.query(query, [status, roomNumber], (err, results) => {
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
        db.query('SELECT * FROM reservations WHERE reservation_id = ?', [id], (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return reject(err);
            }
            resolve(results[0]);
        });
    });
};

export const createReservation = async (reservation) => {
    const { guest_id, checkin_date, checkout_date} = reservation;

    const q = "INSERT INTO reservations (guest_id, checkin_date, checkout_date) VALUES (?,?,?)";
    db.query(q, [reservation.guest_id, reservation.checkin_date, reservation.checkout_date], 
        (err, results)=>{
            if(!error){
                return err;
            }
            return results;
        })

    //return reservation.guest_id;
    //  return new Promise(async (resolve, reject) => {
    // //     // if (!guest_id || !checkin_date || !checkout_date) {
    //     //     return reject(new Error('Required fields are missing.'));
    //     // }

    //     const query = `
    //         INSERT INTO reservations (guest_id, checkin_date, checkout_date)
    //         VALUES (?,? , ? );
    //     `;
    //    // db.query(query, reservation,)
    //     const values = [guest_id, checkin_date, checkout_date];//, checkin_status || 'not_checked_in', checkout_status || 'not_checked_out', discount || 0];
        
    //     db.query(query, values, (err, results) => {
    //         if (err) {
    //             console.error('Database error:', err);
    //             return reject(new Error('Database error occurred.'));
    //         }
            

    //         // const reservationId = results.insertId;

    //         // try {
    //         //     for (const roomNumber of roomNumbers) {
    //         //         await updateRoomStatus(roomNumber, 'Unavailable');
    //         //     }
    //         //     resolve(reservationId);
    //         // } catch (updateError) {
    //         //     console.error('Failed to update room status:', updateError);
    //         //     reject(new Error('Failed to update room status.'));
    //         // }


    //     });
    // });
};


// Update a reservation by ID
export const updateReservationById = (id, updatedReservation) => {
    const { guest_id, checkin_date, checkout_date, checkin_status, checkout_status, discount } = updatedReservation;
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE reservations
            SET guest_id = ?, checkin_date = ?, checkout_date = ?, checkin_status = ?, checkout_status = ?, discount = ?
            WHERE reservation_id = ?
        `;
        const values = [guest_id, checkin_date, checkout_date, checkin_status, checkout_status, discount, id];
        
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
            // Get reservation to find associated room numbers
            const reservation = await getReservationById(id);
            if (!reservation) {
                return reject(new Error('Reservation not found'));
            }

            // Example: fetch associated rooms from reservation_details
            const rooms = []; // Fetch room numbers associated with this reservation

            // Delete reservation
            db.query('DELETE FROM reservations WHERE reservation_id = ?', [id], async (err, results) => {
                if (err) {
                    console.error('Database error:', err);
                    return reject(err);
                }

                // Update room status to Available
                try {
                    for (const room of rooms) {
                        await updateRoomStatus(room, 'Available');
                    }
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
