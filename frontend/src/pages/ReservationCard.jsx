//ReservationCard.jsx
import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import '../components/styles/ReservationCard.css';
import ReservationDelete from './ReservationDelete'; // Adjust the path as needed
import axios from 'axios';
import ReservationEdit from './ReservationEdit'; // Ensure this import is correct

const ReservationCard = () => {
  const [reservations, setReservations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // For edit modal
  const [selectedReservation, setSelectedReservation] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reservations');
        setReservations(response.data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, []);

  const handleDeleteClick = (reservation) => {
    setSelectedReservation(reservation);
    setShowModal(true);
  };

  const handleEditClick = (reservation) => {
    setSelectedReservation(reservation);
    setShowEditModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setShowEditModal(false); // Ensure edit modal is closed as well
    setSelectedReservation(null);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/reservations/${selectedReservation.id}`);
      setReservations(reservations.filter(reservation => reservation.id !== selectedReservation.id));
      handleClose();
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };

  const handleUpdate = (updateReservation) => {
    setReservations(prevReservations => 
      prevReservations.map(reservation =>
        reservation.id === updateReservation.id ? updateReservation : reservation
      )
    );
    handleClose();
  };

  return (
    <div className="table-container">
      <table className="reservation-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone number</th>
            <th>Reserve date</th>
            <th>Check-in date</th>
            <th>Check-out date</th>
            <th>Room No.</th>
            <th>Room type</th>
            <th>No of guests</th>
            <th>Check-in status</th>
            <th>Total</th>
            <th>Payment Method</th>
            <th>Status</th>
            <th>Special Request</th>
            <th>Other</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation, index) => (
            <tr key={index}>
              <td>{reservation.firstName}</td>
              <td>{reservation.lastName}</td>
              <td>{reservation.phoneNumber}</td>
              <td>{reservation.reserveDate}</td>
              <td>{reservation.checkIn}</td>
              <td>{reservation.checkOut}</td>
              <td>{reservation.roomNo}</td>
              <td>{reservation.roomType}</td>
              <td>{reservation.numberOfGuests}</td>
              <td className={
                reservation.checkInStatus === 'Checked-in'
                  ? 'checked-in'
                  : reservation.checkInStatus === 'Checked-out'
                  ? 'checked-out'
                  : 'not-yet-checked-in'
              }>
                {reservation.checkInStatus}
              </td>
              <td>{reservation.price}</td>
              <td>
                {reservation.paymentMethods
                  ? Array.isArray(reservation.paymentMethods)
                    ? reservation.paymentMethods.join(', ')
                    : reservation.paymentMethods
                  : 'N/A'}
              </td>
              <td className={reservation.status === 'Paid' ? 'paid' : 'unpaid'}>{reservation.status}</td>
              <td>{reservation.specialRequest}</td>
              <td>
                <span
                  className="edit-icon"
                  role="img"
                  aria-label="edit"
                  onClick={() => handleEditClick(reservation)}
                >
                  ✏️
                </span>
                <span
                  className="delete-icon"
                  role="img"
                  aria-label="delete"
                  onClick={() => handleDeleteClick(reservation)}
                >
                  🗑️
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <ReservationDelete show={showModal} onClose={handleClose} onDelete={handleDelete} />
      )}
      {showEditModal && (
        <ReservationEdit
          show={showEditModal}
          reservation={selectedReservation}
          onclose={handleClose}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default ReservationCard;
