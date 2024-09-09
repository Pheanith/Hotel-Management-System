//ReservationCard.jsx
import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import '../components/styles/ReservationCard.css';
import ReservationDelete from './ReservationDelete';
import ReservationEdit from './ReservationEdit';
import axios from 'axios';

const ReservationCard = () => {
  const [reservations, setReservations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
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
    setShowEditModal(false);
    setSelectedReservation(null);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/reservations/${selectedReservation.reservation_id}`);
      setReservations(reservations.filter(reservation => reservation.reservation_id !== selectedReservation.reservation_id));
      handleClose();
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };

  const handleUpdate = (updatedReservation) => {
    setReservations(prevReservations =>
      prevReservations.map(reservation =>
        reservation.reservation_id === updatedReservation.reservation_id ? updatedReservation : reservation
      )
    );
    handleClose();
  };

  return (
    <div className="table-container">
      <table className="reservation-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Guest Name</th>
            <th>Phone Number</th>
            <th>Reserve Date</th>
            <th>Check-in Date</th>
            <th>Check-out Date</th>
            <th>Room Number</th>
            <th>Room Type</th>
            <th>Number of Guests</th>
            <th>Check-in Status</th>
            <th>Total</th>
            <th>Payment Methods</th>
            <th>Status</th>
            <th>Special Request</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation, index) => (
            <tr key={index}>
              <td>{reservation.reservation_id}</td>
              <td>{`${reservation.guest?.firstName || ''} ${reservation.guest?.lastName || ''}`}</td>
              <td>{reservation.guest?.phoneNumber || 'N/A'}</td>
              <td>{reservation.created_at}</td>
              <td>{reservation.checkin_date}</td>
              <td>{reservation.checkout_date}</td>
              <td>{reservation.room?.roomNumber || 'N/A'}</td>
              <td>{reservation.room?.roomType || 'N/A'}</td>
              <td>{reservation.numberOfGuests}</td>
              <td className={
                reservation.checkin_status === 'checked_in' ? 'checked-in' :
                reservation.checkin_status === 'checked_out' ? 'checked-out' : 'not-checked-in'}>
                {reservation.checkin_status}
              </td>
              <td>{reservation.totalPrice}</td>
              <td>{reservation.paymentMethods ? reservation.paymentMethods.join(', ') : 'N/A'}</td>
              <td className={reservation.status === 'Paid' ? 'paid' : 'unpaid'}>{reservation.status}</td>
              <td>{reservation.specialRequest || 'None'}</td>
              <td>
                <span className="edit-icon" role="img" aria-label="edit" onClick={() => handleEditClick(reservation)}>✏️</span>
                <span className="delete-icon" role="img" aria-label="delete" onClick={() => handleDeleteClick(reservation)}>🗑️</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <ReservationDelete show={showModal} onClose={handleClose} onDelete={handleDelete} />
      )}
      {showEditModal && (
        <ReservationEdit show={showEditModal} reservation={selectedReservation} onClose={handleClose} onUpdate={handleUpdate} />
      )}
    </div>
  );
};

export default ReservationCard;
