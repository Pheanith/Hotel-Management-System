//Reservation.jsx
import React, { useState, useEffect } from 'react';
import '../../components/styles/Reservation.css';
import ReservationCard from './ReservationCard';
import ReservationDetail from './ReservationDetail';
// import Reservationform from './Reservationform';
import Search from '@mui/icons-material/SearchOutlined';
import { useNavigate } from 'react-router-dom';

const Reservation = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [reservation, setReservation] = useState(null);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setFormVisible(true);
  };

  const handleCloseForm = () => {
    setFormVisible(false);
  };

  const handleOpenForm = () => {
    navigate('/reserve', { state: { fromPage: 'reservation' } });
  };

  const handleSearch = async () => {
    // if (searchInput.trim()) {
    //   try {
    //     const response = await fetch(`/api/reservations?query=${encodeURIComponent(searchInput)}`);
        
    //     // Check if the response is JSON before parsing
    //     if (response.headers.get('content-type')?.includes('application/json')) {
    //       const data = await response.json();
    //       setReservation(data);
    //     } else {
    //       console.error('Invalid response type:', response);
    //       setReservation(null);
    //     }
    //   } catch (error) {
    //     console.error('Search error:', error);
    //     setReservation(null);
    //   }
    // } else {
    //   setReservation(null);
    // }
  };  

  useEffect(() => {
    handleSearch();
  }, [searchInput]);

  return (
    <div className="main-content">
      <div className="content-header">
        <a>Reservations List</a>
        <div className="search-bar">
          <Search />
          <div className="search-bar1">
            <input
              type="text"
              placeholder="Search by ID, phone number, or guest name" 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>
      </div>
      {reservation && (
        <div>
          <h2>Reservation Found:</h2>
          <p>Reservation ID: {reservation.reservation_id}</p>
          <p>Guest Name: {reservation.firstName} {reservation.lastName}</p>
          <p>Guest Phone Number: {reservation.phoneNumber}</p>
        </div>
      )}
      <ReservationCard />
    </div>
  );
};

export default Reservation;
