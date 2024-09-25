import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import '../../components/styles/ReservationCard.css';
import ReservationDelete from './ReservationDelete';
import ReservationEdit from './ReservationEdit';
import { Link } from 'react-router-dom';

const ReservationCard = ({ reservations, searchInput }) => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  const filteredReservations = reservations.filter(reservation => {
    const guestName = `${reservation.firstName} ${reservation.lastName}`.toLowerCase();
    return (
      reservation.reservation_id.toString().includes(searchInput) ||
      reservation.phoneNumber.includes(searchInput) ||
      (reservation.identity_no && reservation.identity_no.includes(searchInput)) || // Ensure identity_no is checked safely
      guestName.includes(searchInput.toLowerCase())
    );
  });

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
    // Handle deletion logic
    handleClose();
  };

  const handleUpdate = (updatedReservation) => {
    // Handle update logic
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
            <th>Check-out Status</th>
            <th>Detail</th>
            <th>Invoice</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredReservations.map((reservation, index) => (
            <tr key={index}>
              <td>{reservation.reservation_id}</td>
              <td>{`${reservation.firstName} ${reservation.lastName}`}</td>
              <td>{reservation.phoneNumber}</td>
              <td>{new Date(reservation.reserve_date).toLocaleDateString()}</td>
              <td>{new Date(reservation.checkin_date).toLocaleDateString()}</td>
              <td>{new Date(reservation.checkout_date).toLocaleDateString()}</td>
              <td>{reservation.room_numbers}</td>
              <td>{reservation.room_type_names}</td>
              <td>{reservation.accommodation_type_names}</td>
              <td>${Number(reservation.totalAmount || 0).toFixed(2)}</td>
              <td>{reservation.status}</td>
              <td>{reservation.checkin_status}</td>
              <td>{reservation.checkout_status}</td>
              <td className='reservation-detail'>
                <Link to={`/reservation-detail/${reservation.reservation_id}`} state={reservation}>
                  Reservation detail
                </Link>
              </td>
              <td>
                <Link to={`/invoice/${reservation.reservation_id}`} state={reservation}>
                  Invoice
                </Link>
              </td>
              <td>
                <span className="delete-icon" role="img" aria-label="delete" onClick={() => handleDeleteClick(reservation)}>🗑️</span>
                <span className="edit-icon" role="img" aria-label="edit" onClick={() => handleEditClick(reservation)}>✏️</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modals for Edit and Delete */}
      {showModal && (
          <ReservationDelete
              show={showModal}
              onClose={handleClose} // Corrected prop name
              onDelete={handleDelete} // Corrected prop name
          />
      )}

      {showEditModal && (
        <ReservationEdit
          show={showEditModal}
          handleClose={handleClose}
          handleUpdate={handleUpdate}
          reservation={selectedReservation}
        />
      )}
    </div>
  );
};

export default ReservationCard;
