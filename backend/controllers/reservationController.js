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

         console.log(reservation.room_id);
         const roomIds = reservation.room_id;
         // roomIds.map((room_id)=>{
           const createReservationnDetail = await CreateReservationDetail(createdReservation.reservation_id, reservation.room_id);
     
    //})
         console.log("Created Reservation Detail: ", createReservationnDetail);

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
    console.log("Deleted reservation: ", req.params.reservation_id);
};

// Get all reservations
export const fetchAllReservations = async (req, res) => {
  try {
      const searchParams = req.query; // Get query parameters from the request
      console.log('Fetching reservations with parameters:', searchParams);
      
      const reservations = await getAllReservations(searchParams);
      console.log('Reservations fetched:', reservations);
      
      // Create a map to group reservations by reservation_id
      const reservationMap = {};

      reservations.forEach(reservation => {
          const totalAmount = reservation.totalAmount || 0;
          const discountAmount = (totalAmount * (reservation.discount || 0)) / 100;
          const totalAfterDiscount = totalAmount - discountAmount;

          // Check if the reservation already exists in the map
          if (!reservationMap[reservation.reservation_id]) {
              reservationMap[reservation.reservation_id] = {
                  ...reservation,
                  room_numbers: [],
                  room_type_names: [],
                  totalAfterDiscount: totalAfterDiscount.toFixed(2),
                  reserve_date: formatDate(new Date(reservation.reserve_date)),
                  checkin_date: formatDate(new Date(reservation.checkin_date)),
                  checkout_date: formatDate(new Date(reservation.checkout_date))
              };
          }

          // Add room numbers and room types
          reservationMap[reservation.reservation_id].room_numbers.push(...reservation.room_numbers.split(','));
          reservationMap[reservation.reservation_id].room_type_names.push(...reservation.room_type_names.split(','));
      });

      // Convert the map back to an array
      const formattedReservations = Object.values(reservationMap);
      
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