import React, { useState, useEffect } from 'react';
import '../../components/styles/Reservation.css';
import ReservationCard from './ReservationCard';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

function formatDate(date) {
  if (!date) return null;
  const dt = new Date(date);
  const day = String(dt.getDate()).padStart(2, '0');
  const month = String(dt.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = dt.getFullYear();
  return `${year}-${month}-${day}`;
}

const Reservation = () => {
  const [searchInput, setSearchInput] = useState('');
  const [checkinDate, setCheckinDate] = useState(null);
  const [checkoutDate, setCheckoutDate] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reservations');
        const updatedReservations = response.data.map(reservation => {
          const discountAmount = (reservation.totalAmount * reservation.discount) / 100;
          const totalAfterDiscount = reservation.totalAmount - discountAmount;
          return { ...reservation, totalAfterDiscount }; // Add the discounted total
        });
        setReservations(updatedReservations);
        setFilteredReservations(updatedReservations); // Initially, set all reservations as filtered
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, []);

  useEffect(() => {
    const filteredData = reservations.filter((reservation) => {
      const checkinMatches =
        !checkinDate || 
        (new Date(reservation.checkin_date).toLocaleDateString() === new Date(checkinDate).toLocaleDateString());

      const checkoutMatches =
        !checkoutDate || 
        (new Date(reservation.checkout_date).toLocaleDateString() === new Date(checkoutDate).toLocaleDateString());

      const searchMatches = 
        reservation.reservation_id.toString().includes(searchInput) || // Search by ID
        `${reservation.firstName} ${reservation.lastName}`.toLowerCase().includes(searchInput.toLowerCase()) || // Name
        reservation.phoneNumber.toString().includes(searchInput) || // Phone
        reservation.email?.toLowerCase().includes(searchInput.toLowerCase()); // Email

      return checkinMatches && checkoutMatches && searchMatches;
    });

    setFilteredReservations(filteredData);
  }, [searchInput, checkinDate, checkoutDate, reservations]);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="main-content">
      <div className="content-header">
        <a>Reservations List</a>
        <div className="search-bar">
          <div className="search-bar1">
            <input
              type="text"
              placeholder="Search by ID, name, phone number, or email"
              value={searchInput}
              onChange={handleSearchChange}
            />
          </div>
          <div className="search-bar1">
            <DatePicker
              placeholderText="Check-in Date"
              selected={checkinDate}
              onChange={(date) => setCheckinDate(date)}
            />
          </div>
          <div className="search-bar1">
            <DatePicker
              placeholderText="Check-out Date"
              selected={checkoutDate}
              onChange={(date) => setCheckoutDate(date)}
            />
          </div>
        </div>
      </div>
      <ReservationCard reservations={filteredReservations} />
    </div>
  );
};

export default Reservation;
