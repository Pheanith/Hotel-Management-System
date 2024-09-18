import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import '../../components/styles/ReservationCard.css';
import ReservationDelete from './ReservationDelete';
import ReservationEdit from './ReservationEdit';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ReservationCard = () => {
  const [reservations, setReservations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reservations');
        console.log(response.data); // Log the data to verify its structure
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
            <th>Accommodation Type</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Check-in Status</th>
            <th>Detail</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation, index) => (
            <tr key={index}>
              <td>{reservation.reservation_id}</td>
              <td>{`${reservation.firstName} ${reservation.lastName}`}</td>
              <td>{reservation.phoneNumber}</td>
              <td>{new Date(reservation.reserve_date).toLocaleDateString()}</td>
              <td>{new Date(reservation.checkin_date).toLocaleDateString()}</td>
              <td>{new Date(reservation.checkout_date).toLocaleDateString()}</td>
              <td>{reservation.room_number}</td>
              <td>{reservation.room_type_name}</td>
              <td>{reservation.accommodation_type_name || 'N/A'}</td>
              <td>${reservation.totalAmount}</td>
              <td className={reservation.status === 'Paid' ? 'paid' : 'unpaid'}>
                {reservation.status}
              </td>
              <td className={reservation.checkin_status === 'checked_in' ? 'checked-in' : reservation.checkin_status === 'checked_out' ? 'checked-out' : 'not-checked-in'}>
                {reservation.checkin_status}
              </td>
              <td className='reservation-detail'>
                <Link to={`/reservation-detail/${reservation.reservation_id}`} state={reservation}>
                  Reservation detail
                </Link>
              </td>
              <td>
                {/* <span className="edit-icon" role="img" aria-label="edit" onClick={() => handleEditClick(reservation)}>✏️</span> */}
                <span className="delete-icon" role="img" aria-label="delete" onClick={() => handleDeleteClick(reservation)}>🗑️</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReservationDelete show={showModal} onClose={handleClose} onDelete={handleDelete} />
      {showEditModal && <ReservationEdit reservation={selectedReservation} onClose={handleClose} onUpdate={handleUpdate} />}
    </div>
  );
};

export default ReservationCard;
