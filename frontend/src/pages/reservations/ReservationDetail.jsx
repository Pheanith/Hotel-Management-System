import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../components/styles/ReservationDetail.css';
import axios from 'axios';

const maskCardNumber = (cardNumber) => {
  return cardNumber ? `**** **** **** ${cardNumber.slice(-4)}` : 'N/A';
};

const ReservationDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reservation = location.state;
  console.log("Location state:", reservation);

  const copyEmailToClipboard = (reservation) => {
    const emailContent = `
      Dear ${reservation.firstName} ${reservation.lastName},
  
      Thank you for choosing LA LUNE HOTEL for your stay in Phnom Penh. We're excited to welcome you!
  
      Your Booking Details:
  
      - Room Number: ${reservation.room_number}
      - Room Type: ${reservation.room_type_name}
      - Check-in Date: ${new Date(reservation.checkin_date).toLocaleDateString()}
      - Check-out Date: ${new Date(reservation.checkout_date).toLocaleDateString()}
  
      Important Information:
      - Check-in Time: 2:00 PM
      - Check-out Time: 12:00 PM
      - Location: 123 LA LUNE Street, Phnom Penh, Cambodia
      - Contact Information: +855 12345678 | contact@lalunehotel.com
  
      Amenities:
      - Free Wi-Fi, Complimentary Breakfast, Airport Shuttle
  
      We look forward to providing you with a memorable experience. If you have any questions or require further assistance, please don't hesitate to contact us.
  
      Best regards,
      LA LUNE HOTEL
    `;
  
    // Copy the formatted email content to the clipboard
    navigator.clipboard.writeText(emailContent)
      .then(() => {
        alert('Email template copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy email content:', err);
      });
  };
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  if (!reservation) {
    return <p>No reservation details available.</p>;
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleAction = (action) => {
    if (action === 'checkin') {
      navigate('/verification', {
        state: {
          ...reservation,
          identity_no: reservation.identity_no, // Make sure identity_no is included
        }
      });
    } else if (action === 'checkout') {
      axios.put(`http://localhost:5000/api/reservations/${reservation.reservation_id}/checkout`)
        .then(() => {
          alert('Check-out successful!');
          navigate('/reservation');
        })
        .catch(error => {
          console.error('Error during check-out:', error);
          alert('Failed to check-out. Please try again.');
        });
    }
    setIsDropdownOpen(false);
  };
  

  return (
    <div className="reservation-detail">
      <div className="detail-header">
        <h2><strong>Reservation Details</strong></h2>
        <div className="dropdown">
          <button onClick={toggleDropdown} className="dropdown-button">
            Actions
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={() => handleAction('checkin')}>Check-in</button>
              <button onClick={() => handleAction('checkout')}>Check-out</button>
            </div>
          )}
        </div>
      </div>

      <div className="detail-body">
        <div className="section">
          <p><strong>Reservation ID:</strong> #{reservation.reservation_id}</p>
        </div>
        <div className="section">
          <h3><strong>Guest Information</strong></h3>
          <p><strong>Name:</strong> {`${reservation.firstName} ${reservation.lastName}`}</p>
          <p><strong>Email:</strong> {reservation.email}</p>
          <p><strong>Phone:</strong> {reservation.phoneNumber}</p>

        </div>
        <div className="section">
          <h3><strong>Room Information</strong></h3>
          <p><strong>Room Number:</strong> {reservation.room_number}</p>
          <p><strong>Room Type:</strong> {reservation.room_type_name}</p>
          <p><strong>Check-in Date:</strong> {new Date(reservation.checkin_date).toLocaleDateString()}</p>
          <p><strong>Check-out Date:</strong> {new Date(reservation.checkout_date).toLocaleDateString()}</p>
        </div>
        <div className="section">
          <h3><strong>Payment Information</strong></h3>
          <p><strong>Payment Method:</strong> {reservation.payment_method || 'N/A'}</p>
          <p><strong>Card Number:</strong> {maskCardNumber(reservation.card_number)}</p>
          <p><strong>Total Amount:</strong> ${reservation.totalAfterDiscount.toFixed(2)}</p>
        </div>
        <div className="section">
          <h3><strong></strong></h3>
          <p>
            Dear <strong>{`${reservation.firstName} ${reservation.lastName}`}</strong>,<br/>
            Thank you for choosing <strong>LA LUNE HOTEL</strong> for your stay in Phnom Penh. We are excited to welcome you!
          </p>
          <p><strong>Your Booking Details:</strong></p>
          <p><strong>Room Number:</strong> {reservation.room_number}</p>
          <p><strong>Room Type:</strong> {reservation.room_type_name}</p>
          <p><strong>Check-in Date:</strong> {new Date(reservation.checkin_date).toLocaleDateString()}</p>
          <p><strong>Check-out Date:</strong> {new Date(reservation.checkout_date).toLocaleDateString()}</p>
          <p>We look forward to providing you with a memorable experience.</p>
          <button className="copy-btn" onClick={() => copyEmailToClipboard(reservation)}>Copy</button>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetail;
