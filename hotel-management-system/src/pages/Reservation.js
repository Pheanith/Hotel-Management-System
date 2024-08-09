import React, {useState} from 'react';
import '../components/styles/Reservation.css';
import ReservationCard from '../pages/ReservationCard.js';
import Search from '@mui/icons-material/SearchOutlined';
import Reservationform from '../pages/Reservationform.js';

const Reservation = () => {
  const [isFormVisible, setFormVisible] = useState(false);

  const handleButtonClick = () => {
    setFormVisible(true);
  };

  const handleCloseForm = () => {
    setFormVisible(false);
  };

  return (
    <div className="main-content">
      <div className="content-header">
        <a>Reservations</a>
        <div className="search-bar">
          <Search />
          <div className='search-bar1'>
            <input type="text" placeholder="Search ......" />
            <button onClick={handleButtonClick}>+ New reservation</button>
            {/* {isFormVisible && <Reservationform onClose={handleCloseForm} />} */}
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
