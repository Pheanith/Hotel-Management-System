import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../components/styles/ReservationDetail.css';
import { useState } from 'react';

const ReservationDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state: reservation } = location;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!reservation) {
    return <p>No reservation details available.</p>;
  }

  // Function to mask the card number except for the last four digits
  const maskCardNumber = (cardNumber) => {
    return cardNumber ? `**** **** **** ${cardNumber.slice(-4)}` : 'N/A';
  };

  // Function to copy summary info to clipboard
  const copyToClipboard = () => {
    const summaryText = `
      Guest name: ${reservation.firstName} ${reservation.lastName}
      Room Number: ${reservation.room_number}
      Check-in Date: ${new Date(reservation.checkin_date).toLocaleDateString()}
      Check-out Date: ${new Date(reservation.checkout_date).toLocaleDateString()}
      Total Amount: $${reservation.totalAmount}
    `;
    navigator.clipboard.writeText(summaryText).then(() => {
      alert('Summary copied to clipboard!');
    }).catch((err) => {
      console.error('Failed to copy text: ', err);
    });
  };
  // Handle dropdown toggle
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle check-in or check-out action
  const handleAction = (action) => {
    if (action === 'checkin') {
      navigate('/verification', { state: reservation });
    } else if (action === 'checkout') {
      // Handle check-out logic
      alert('Check-out action triggered');
    }
    setIsDropdownOpen(false); // Close dropdown after action
  };

  return (
    <div className="detail-main-content">
        <div className="detail-header">
            <div>
                <h2><strong>Reservation Details</strong></h2>
            </div>
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

        <div className='detail-body'>
            <div className="reservation-id">
                <p><strong>Reservation ID:</strong> #{reservation.reservation_id}</p>
            </div>
            <div className='guest-info'>
                <h3><strong>Guest Information</strong></h3>
                <p><strong>Name:</strong> {`${reservation.firstName} ${reservation.lastName}`}</p>
                <p><strong>Email:</strong> {reservation.email}</p>
                <p><strong>Phone:</strong> {reservation.phoneNumber}</p>
            </div>
            <div className='room-info'>
                <h3><strong>Room Information</strong></h3>
                <p><strong>Room Number:</strong> {reservation.room_number}</p>
                <p><strong>Room Type:</strong> {reservation.room_type_name}</p>
                <p><strong>Check-in Date:</strong> {new Date(reservation.checkin_date).toLocaleDateString()}</p>
                <p><strong>Check-out Date:</strong> {new Date(reservation.checkout_date).toLocaleDateString()}</p>
            </div>
            <div className='payment-info'>
                <h3><strong>Payment Information</strong></h3>
                <p><strong>Payment Method:</strong> {reservation.payment_method || 'N/A'}</p>
                <p><strong>Card Number:</strong> {maskCardNumber(reservation.card_number)}</p>
                <p><strong>Total Amount:</strong> ${reservation.totalAmount}</p>
            </div>
            <div className='summary'> 
                <h3><strong>Summary</strong></h3>
                <p><strong>Guest name: </strong>{`${reservation.firstName} ${reservation.lastName}`}</p>
                <p><strong>Room Number:</strong> {reservation.room_number}</p>
                <p><strong>Check-in Date:</strong> {new Date(reservation.checkin_date).toLocaleDateString()}</p>
                <p><strong>Check-out Date:</strong> {new Date(reservation.checkout_date).toLocaleDateString()}</p>
                <p><strong>Total Amount:</strong> ${reservation.totalAmount}</p>
                <button className='copy-btn' onClick={copyToClipboard}>Copy</button>
            </div>
        </div>
    </div>
  );
};

export default ReservationDetail;