import db from '../utils/db.js'; // Adjust path to your database connection module

function formatDate(date) {
    if (!date) return null;
    const dt = new Date(date);
    const day = String(dt.getDate()).padStart(2, '0');
    const month = String(dt.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = dt.getFullYear();
    return `${year}-${month}-${day}`;
}

// Function to query the reservation in the database based on ID, phone number, or guest name
export const getReservationById = (params) => {
    const { reservation_id, phoneNumber, guestName, checkinDate, checkoutDate } = params;

    let query = `
      SELECT r.*, g.phoneNumber, g.firstName, g.lastName
      FROM reservations r
      JOIN guests g ON r.guest_id = g.guest_id
      WHERE 1 = 1
    `;

    const values = [];

    // Add conditions based on available parameters
    if (reservation_id) {
        query += ' AND r.reservation_id = ?';
        values.push(reservation_id);
    }
    if (phoneNumber) {
        query += ' AND g.phoneNumber = ?';
        values.push(phoneNumber);
    }
    if (guestName) {
        query += ' AND CONCAT(g.firstName, " ", g.lastName) LIKE ?';
        values.push(`%${guestName}%`); // Partial match for guest name
    }
    if (checkinDate) {
        query += ' AND r.checkinDate = ?';
        values.push(checkinDate); // Exact match for check-in date
    }
    if (checkoutDate) {
        query += ' AND r.checkoutDate = ?';
        values.push(checkoutDate); // Exact match for check-out date
    }

    // Return empty result if no parameters provided
    if (values.length === 0) {
        return Promise.resolve([]); // No parameters, return empty array
    }

    // Execute query and return results
    return new Promise((resolve, reject) => {
        db.query(query, values, (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
};


export const getReservationDetail = () => {
    return new Promise((resolve, reject) => {
        const dataQuery = `SELECT * FROM reservation_details `
        db.query(dataQuery, (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return reject(err);
            }
            resolve(results[0]);
        });
    });
};

export const createReservation = (reservation) => {
    const { room_id, guest_id, checkin_date, checkout_date, checkin_time, checkout_time, checkin_status, checkout_status, discount } = reservation;
     // Format dates to YYYY-MM-DD
     const formattedCheckinDate = formatDate(checkin_date);
     const formattedCheckoutDate = formatDate(checkout_date);
    const query = `
        INSERT INTO reservations (guest_id, checkin_date, checkout_date, checkin_time, checkout_time, checkin_status, checkout_status, discount) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    return new Promise((resolve, reject) => {
        db.query(query, [guest_id, formattedCheckinDate, formattedCheckoutDate, checkin_time, checkout_time, checkin_status, checkout_status, discount], (err, results) => {
        if (err) {
            console.log("Database error:", err);  // Log error details
            return reject(err);
        }

            // Retrieve the last inserted ID
            const insertedId = results.insertId;

            // Optionally, you can fetch the inserted data here if needed
            // For example, you might want to select the inserted reservation
            const selectQuery = `
                SELECT * FROM reservations WHERE reservation_id = ?
            `;
            const reserviation = db.query(selectQuery, [insertedId], (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows[0]); // Assuming you want to return the first row
            });

            return reservation;
        });
    });
};

// export const CreateReservationDetail = (reservation_id, room_id) => {
//     // const { room_id, guest_id, checkin_date, checkout_date, checkin_time, checkout_time, checkin_status, checkout_status, discount } = reservation;
//     const query = `
//         INSERT INTO reservation_details (reservation_id, room_id) 
//         VALUES (?, ?);
//     `;

//     return new Promise((resolve, reject) => {
//         db.query(query, [reservation_id, room_id], (err, results) => {
//             if (err) {
//                 return reject(err);
//             }

//             // Retrieve the last inserted ID
//             const insertedId = results.insertId;

//             // Optionally, you can fetch the inserted data here if needed
//             // For example, you might want to select the inserted reservation
//             const selectQuery = `
//                 SELECT * FROM reservation_details WHERE detail_id = ?
//             `;
//             db.query(selectQuery, [insertedId], (err, rows) => {
//                 if (err) {
//                     return reject(err);
//                 }
//                 resolve(rows[0]); // Assuming you want to return the first row
//             });
//         });
//     });
// };
export const CreateReservationDetail = (reservation_id, room_ids) => {
    // room_ids is now expected to be an array of room IDs
    const query = `
        INSERT INTO reservation_details (reservation_id, room_id) 
        VALUES (?, ?);
    `;
    console.log("Detail: ", reservation_id );
    return new Promise((resolve, reject) => {
        // Begin a transaction for multiple insertions
        db.beginTransaction((err) => {
            if (err) {
                return reject(err);
            }

            // Keep track of successful insertions
            let insertedRows = [];
            let completedInserts = 0;

            // Loop through the room_ids array and insert each one
            room_ids.forEach((room_id) => { 
                console.log(room_ids);
                db.query(query, [reservation_id, room_id], (err, results) => {
                    if (err) {
                        return db.rollback(() => {
                            reject(err);  // Rollback transaction on error
                        });
                    }

                    console.log("id",reservation_id);

                    // Retrieve the last inserted ID
                    const insertedId = results.insertId;
                    console.log(insertedId);

                    // Optionally, select the inserted data
                    const selectQuery = `
                        SELECT * FROM reservation_details WHERE detail_id = ?
                    `;
                    db.query(selectQuery, [insertedId], (err, rows) => {
                        if (err) {
                            return db.rollback(() => {
                                reject(err);  // Rollback transaction on error
                            });
                        }

                        insertedRows.push(rows[0]);  // Store inserted rows
                        completedInserts++;

                        // If all inserts are done, commit the transaction
                        if (completedInserts === room_ids.length) {
                            db.commit((err) => {
                                if (err) {
                                    return db.rollback(() => {
                                        reject(err);
                                    });
                                }
                                resolve(insertedRows);  // Return all inserted rows
                            });
                        }
                    });
                });
            });
        });
    });
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
    try {
        // Get reservation to find associated room numbers
        const reservation = await getReservationById({ reservation_id: id });
        if (!reservation) {
            throw new Error('Reservation not found');
        }

        // Fetch associated room numbers from reservation_details by joining with rooms table
        const rooms = await new Promise((resolve, reject) => {
            const query = `
                SELECT rm.room_number
                FROM reservation_details rd
                JOIN rooms rm ON rd.room_id = rm.room_id
                WHERE rd.reservation_id = ?
            `;
            db.query(query, [id], (err, results) => {
                if (err) {
                    console.error('Database error fetching rooms:', err);
                    return reject(err);
                }
                resolve(results.map(row => row.room_number));
            });
        });

        // Delete reservation
        await new Promise((resolve, reject) => {
            db.query('DELETE FROM reservations WHERE reservation_id = ?', [id], (err, results) => {
                if (err) {
                    console.error('Database error deleting reservation:', err);
                    return reject(err);
                }
                resolve(results.affectedRows);
            });
        });

    } catch (error) {
        console.error('Error in deleteReservationById:', error);
        throw error;
    }
};


export const getAllReservations = (searchParams = {}) => {
    const { query, checkin_date, checkout_date } = searchParams;

    let queryStr = `
        SELECT 
            r.reservation_id, 
            r.created_at AS reserve_date, 
            r.checkin_date, 
            r.checkout_date, 
            r.checkout_status, 
            r.checkin_status, 
            r.discount,
            g.firstName, 
            g.lastName, 
            g.email,
            g.identity_no,
            g.address,
            g.phoneNumber,
            GROUP_CONCAT(DISTINCT rm.room_number ORDER BY rm.room_number SEPARATOR ', ') AS room_numbers, 
            GROUP_CONCAT( rt.name ORDER BY rt.name SEPARATOR ', ') AS room_type_names,
            GROUP_CONCAT(DISTINCT at.name ORDER BY at.name SEPARATOR ', ') AS accommodation_type_names,
            SUM(rm.price_per_night * DATEDIFF(r.checkout_date, r.checkin_date)) AS totalAmount,
            GROUP_CONCAT( rm.price_per_night ORDER BY rm.room_number SEPARATOR ', ') AS room_prices
        FROM reservations r
        JOIN guests g ON r.guest_id = g.guest_id
        JOIN reservation_details rd ON r.reservation_id = rd.reservation_id
        JOIN rooms rm ON rd.room_id = rm.room_id
        JOIN room_types rt ON rm.room_type_id = rt.room_type_id
        JOIN accommodation_types at ON rm.accommodation_type_id = at.accommodation_type_id
        WHERE 1=1
    `;

    const values = [];

    if (query) {
        queryStr += ` AND (r.reservation_id = ? OR g.phoneNumber LIKE ? OR g.email LIKE ? OR CONCAT(g.firstName, ' ', g.lastName) LIKE ?)`;
        values.push(query, `%${query}%`, `%${query}%`, `%${query}%`);
    }
    if (checkin_date) {
        queryStr += ' AND r.checkin_date = ?';
        values.push(checkin_date);
    }
    if (checkout_date) {
        queryStr += ' AND r.checkout_date = ?';
        values.push(checkout_date);
    }

    queryStr += `
        GROUP BY r.reservation_id, g.guest_id
        ORDER BY r.created_at DESC
    `;

    return new Promise((resolve, reject) => {
        db.query(queryStr, values, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

// Update the check-in status in the database
export const updateCheckIn = (reservation_id) => {
    const query = `
        UPDATE reservations
        SET checkin_status = 'Checked In'
        WHERE reservation_id = ?
    `;

    return new Promise((resolve, reject) => {
        db.query(query, [reservation_id], (error, results) => {
            if (error) {
                console.error('Database error:', error);
                return reject(error);
            }
            // Resolve with the number of affected rows
            resolve(results.affectedRows);
        });
    });
};

// Update the check-out status in the database
export const updateCheckOut = (reservation_id) => {
    const query = `
        UPDATE reservations
        SET checkout_status = 'Checked Out'
        WHERE reservation_id = ?
    `;

    return new Promise((resolve, reject) => {
        db.query(query, [reservation_id], (error, results) => {
            if (error) {
                console.error('Database error:', error);
                return reject(error);
            }
            // Resolve with the number of affected rows
            resolve(results.affectedRows);
        });
    });
};



