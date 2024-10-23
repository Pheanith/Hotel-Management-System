import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import '../../components/styles/ReservationCard.css';
import ReservationDelete from './ReservationDelete';
import ReservationEdit from './ReservationEdit';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ReservationCard = ({ reservations }) => {
  console.log("ReservationCard:",reservations);
  
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

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
      handleClose();
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
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
          {
          
          reservations.map((reservation, index) => (
            <tr key={index}>
              <td>{reservation.reservation_id}</td>
              <td>{`${reservation.firstName} ${reservation.lastName}`}</td>
              <td>{reservation.phoneNumber}</td>
              <td>{new Date(reservation.reserve_date).toLocaleDateString()}</td>
              <td>{new Date(reservation.checkin_date).toLocaleDateString()}</td>
              <td>{new Date(reservation.checkout_date).toLocaleDateString()}</td>
              <td>
                {typeof reservation.room_numbers === 'string'
                  ? reservation.room_numbers.split(',')
                  : reservation.room_numbers || []}
              </td>
              <td>
                {typeof reservation.room_type_names === 'string'
                  ? reservation.room_type_names.split(',')
                  : reservation.room_type_names || []}
              </td>
              <td>
                {typeof reservation.accommodation_type_names === 'string'
                  ? reservation.accommodation_type_names.split(',')
                  : reservation.accommodation_type_names || []}
              </td>
              <td>${reservation.totalAfterDiscount.toFixed(2)}</td>
              <td className={reservation.status === 'Paid' ? 'paid' : 'unpaid'}>
                {reservation.status}
              </td>
              <td className={reservation.checkin_status === 'checked-in' ? 'checked-in' : 'pending'}>
                {reservation.checkin_status}
              </td>
              <td className={reservation.checkout_status === 'checked-out' ? 'checked-out' : 'not-checked-out'}>
                {reservation.checkout_status}
              </td>
              <td className='reservation-detail'>
              <Link 
                  to={`/reservation-detail/${reservation.reservation_id}`} 
                  state={{
                    reservation_id: reservation.reservation_id,
                    firstName: reservation.firstName,
                    lastName: reservation.lastName,
                    phoneNumber: reservation.phoneNumber,
                    reserve_date: reservation.reserve_date,
                    checkin_date: reservation.checkin_date,
                    checkout_date: reservation.checkout_date,
                    room_number: reservation.room_numbers,  // Add room numbers here
                    room_type_name: reservation.room_type_names,  // Add room type here
                    totalAfterDiscount: reservation.totalAfterDiscount,
                    status: reservation.status,
                    checkin_status: reservation.checkin_status,
                    checkout_status: reservation.checkout_status,
                    payment_method: reservation.payment_method,
                    card_number: reservation.card_number,
                    totalAmount: reservation.totalAmount
                  }}
                >

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
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modals for Edit and Delete */}
      {showModal && (
          <ReservationDelete
              show={showModal}
              onClose={handleClose}
              onDelete={handleDelete}
          />
      )}
    </div>
  );
};

export default ReservationCard;
