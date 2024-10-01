// controllers/reservationController.js
import { getReservationById, createReservation, updateReservationById, deleteReservationById, getAllReservations, CreateReservationDetail } from '../models/reservationModel.js';
import { updateCheckIn, updateCheckOut } from '../models/reservationModel.js';

function formatDate(date) {
  if (!date) return null;
  const dt = new Date(date);
  const day = String(dt.getDate()).padStart(2, '0');
  const month = String(dt.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = dt.getFullYear();
  return `${year}-${month}-${day}`;
}
// Get a reservation by ID
export const fetchReservationById = (req, res) => {
    const { reservation_id, phoneNumber, guestName } = req.params;
    console.log(reservation_id);
    // Call the database query function, passing the search params
    getReservationById({ reservation_id, phoneNumber, guestName })
        .then(reservation => res.json(reservation))
        .catch(err => res.status(500).json({ error: err.message }));
};


// Create a new reservation
export const addNewReservation = async (req, res) => {
    console.log('New reservation',req.body);
    
    try {
        const reservation = req.body;
        const createdReservation = await createReservation(reservation);
        console.log('Created Reservation:', createdReservation);
        console.log("reservation_id: ", createdReservation.reservation_id)

        // console.log(reservation.room_id)
        const createReservationnDetail = await CreateReservationDetail(createdReservation.reservation_id, reservation.room_id);
        // console.log("Created Reservation Detail: ", createReservationnDetail);

        // res.status(201).json({ reservation: createReservationnDetail });
        // res.status(201).json({ reservation: createdReservation });
        res.status(200).json({message: "Create Success"})
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a reservation by ID
export const modifyReservationById = (req, res) => {
    const { id } = req.params;
    const updatedReservation = req.body;
    updateReservationById(id, updatedReservation)
        .then(result => {
            if (result > 0) {
                res.json({ message: 'Reservation updated successfully' });
            } else {
                res.status(404).json({ message: 'Reservation not found' });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
};

// Delete a reservation by ID
export const removeReservationById = (req, res) => {
    const { reservation_id } = req.params;
    deleteReservationById(reservation_id)
        .then(result => {
            if (result > 0) {
                res.json({ message: 'Reservation deleted successfully' });
            } else {
                res.status(404).json({ message: 'Reservation not found' });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
};

// Get all reservations
export const fetchAllReservations = async (req, res) => {
    // getAllReservations()
    //     .then(reservations => res.json(reservations))
    //     .catch(err => res.status(500).json({ error: err.message }));

    try {
      const reservations = await getAllReservations();
      const formattedReservations = reservations.map(reservation => {
        const totalAmount = reservation.totalAmount || 0;
        const discountAmount = (totalAmount * (reservation.discount || 0)) / 100;
        const totalAfterDiscount = totalAmount - discountAmount;
  
        return {
          ...reservation,
          room_numbers: reservation.room_numbers.split(','),  // Convert room numbers to an array
          room_type_names: reservation.room_type_names.split(','),  // Convert room types to an array
          totalAfterDiscount: totalAfterDiscount.toFixed(2),
          reserve_date: formatDate(new Date(reservation.reserve_date)),
          checkin_date: formatDate(new Date(reservation.checkin_date)),
          checkout_date: formatDate(new Date(reservation.checkout_date))
        };
      });
      res.json(formattedReservations);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      res.status(500).json({ error: 'Failed to fetch reservations' });
    }
};

export const updateCheckInStatus = (req, res) => {
    const { reservation_id } = req.params;
    updateCheckIn(reservation_id)
      .then(result => {
        if (result) {
          res.status(200).json({ message: 'Check-in status updated successfully' });
        } else {
          res.status(404).json({ message: `Reservation with ID ${reservation_id} not found` });
        }
      })
      .catch(err => res.status(500).json({ error: err.message }));
  }

export const updateCheckOutStatus = (req, res) => {
    const { reservation_id } = req.params;
    updateCheckOut(reservation_id)
      .then(result => {
        if (result) {
          res.status(200).json({ message: 'Check-out status updated successfully' });
        } else {
          res.status(404).json({ message: `Reservation with ID ${reservation_id} not found` });
        }
      })
      .catch(err => res.status(500).json({ error: err.message }));
}