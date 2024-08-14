import React, { useState } from 'react';
import '../components/styles/Reservation.css';
import ReservationCard from '../pages/ReservationCard.js';
import Search from '@mui/icons-material/SearchOutlined';
import { useNavigate } from 'react-router-dom';
import Reservationform from './Reservationform.js';

const Reservation = () => {
  const [isFormVisible, setFormVisible] = useState(false);
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

  return (
    <div className="main-content">
      <div className="content-header">
        <a>Reservations List</a>
        <div className="search-bar">
          <Search />
          <div className='search-bar1'>
            <input type="text" placeholder="Search ......" />
            <button onClick={handleOpenForm}>+ New reservation</button>
          </div>
        </div>
      </div>
      {/* Conditionally render the ReservationForm or ReservationCard */}
      {isFormVisible ? (
        <Reservationform onClose={handleCloseForm} />
      ) : (
        <ReservationCard />
      )}
    </div>
  );
};

export default Reservation;
