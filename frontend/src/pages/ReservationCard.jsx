//ReservationCard.jsx
import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import '../components/styles/ReservationCard.css';
import ReservationDelete from './ReservationDelete'; // Adjust the path as needed
import axios from 'axios';

// const reservations = [
//   { guestName: 'Nou Sopheanith', phoneNumber: '089 409 406', reserveDate: '10-08-2024', checkInDate: '10-08-2024', checkOutDate: '10-08-2024', roomNo: '101', roomType: 'Family room', checkInStatus: 'Checked-in',total: '100.0', status: 'Paid' },
//   { guestName: 'Neth Sopanha', phoneNumber: '012 345 678', reserveDate: '11-08-2024', checkInDate: '12-08-2024', checkOutDate: '14-082024', roomNo: '102', roomType: 'Double room', checkInStatus: 'Not yet check-in', total: '69.00', status:'Unpaid'},
//   { guestName: 'Un Sengly', phoneNumber: '089 409 406', reserveDate: '10-08-2024', checkInDate: '10-08-2024', checkOutDate: '10-08-2024', roomNo: '101', roomType: 'Family room', checkInStatus: 'Checked-out',total: '100.0', status: 'Paid' },
// ];

const ReservationCard = () => {
  const [reservations, setReservations] = useState ([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // For edit modal
  const [selectedReservation, setSelectedReservation] = useState(null);

  useEffect (() => {
    const fecthReservations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reservations');
        setReservations (response.data);
      } catch (error) {
        console.error ('Error fetching reservations:', error);
      }
    };

    fecthReservations();
  }, []);

  const handleDeleteClick = (reservation) => {
    setSelectedReservation(reservation);
    setShowModal(true);
  };

  const handleEditClick = (reservation) => {
    setSelectedReservation (reservation);
    setShowEditModal(true);
  }

  const handleClose = () => {
    setShowModal(false);
    setSelectedReservation(null);
  };

  // const handleDelete = () => {
  //   //Delete logic here
  //   console.log("Deleted reservation:", selectedReservation);
  //   setShowModal(false);
  //   setSelectedReservation(null);
  // };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/reservations/${selectedReservation.id}`);
      setReservations (reservations.filter(reservation => reservation.id !== selectedReservation.id));
      handleClose ();
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  }

  const handleUpdate = (updateReservation) => {
    setReservations(prevReservations => prevReservations.map(reservation => (reservation.id == updateReservation.id ? updateReservation : reservation)));
    handleClose();
  }
  return (
    <div className="table-container">
      <table className="reservation-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name </th>
            <th>Phone number</th>
            <th>Reserve date</th>
            <th>Check-in date</th>
            <th>Check-out date</th>
            <th>Room No.</th>
            <th>Room type</th>
            <th>Check-in status</th>
            <th>Total</th>
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
              <td>{reservation.checkInDate}</td>
              <td>{reservation.checkOutDate}</td>
              <td>{reservation.roomNo}</td>
              <td>{reservation.roomType}</td>
              <td className={
                reservation.checkInStatus === 'Checked-in' 
                  ? 'checked-in' 
                  : reservation.checkInStatus === 'Checked-out' 
                  ? 'checked-out' 
                  : 'not-yet-checked-in'
                }> 
                {reservation.checkInStatus}
              </td>
              <td>{reservation.total}</td>
              <td className={reservation.status === 'Paid' ? 'paid' : 'unpaid'}>{reservation.status}</td>
              <td> {reservation.specialRequest}</td>
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
    </div>
  );
};

export default ReservationCard;
