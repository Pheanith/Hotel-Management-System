
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import '../components/styles/ReservationCard.css';

const reservations = [
  { guestName: 'Nou Sopheanith', phoneNumber: '089 409 406', reserveDate: '10-08-2024', checkInDate: '10-08-2024', checkOutDate: '10-08-2024', roomNo: '101', roomType: 'Family room', total: '100.0', status: 'Paid' },
];

const ReservationCard = () => {
  return (
    <div className="table-container">
      <table className="reservation-table">
        <thead>
          <tr>
            <th>Guest name</th>
            <th>Phone number</th>
            <th>Reserve date</th>
            <th>Check-in date</th>
            <th>Check-out date</th>
            <th>Room No.</th>
            <th>Room type</th>
            <th>Total</th>
            <th>Status</th>
            <th>Other</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation, index) => (
            <tr key={index}>
              <td>{reservation.guestName}</td>
              <td>{reservation.phoneNumber}</td>
              <td>{reservation.reserveDate}</td>
              <td>{reservation.checkInDate}</td>
              <td>{reservation.checkOutDate}</td>
              <td>{reservation.roomNo}</td>
              <td>{reservation.roomType}</td>
              <td>{reservation.total}</td>
              <td className={reservation.status === 'Paid' ? 'paid' : 'unpaid'}>{reservation.status}</td>
              <td>
                <span className="edit-icon" role="img" aria-label="edit">✏️</span>
                <span className="delete-icon" role="img" aria-label="delete">🗑️</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationCard;
