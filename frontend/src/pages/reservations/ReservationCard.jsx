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
          // Assuming the response contains discount and totalAmount
          const updatedReservations = response.data.map(reservation => {
            const discountAmount = (reservation.totalAmount * reservation.discount) / 100;
            const totalAfterDiscount = reservation.totalAmount - discountAmount;
            return { ...reservation, totalAfterDiscount }; // Add the discounted total
          });
          setReservations(updatedReservations);
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
            <th>Check-out Status</th>
            <th>Detail</th>
            <th>Invoice</th>
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
