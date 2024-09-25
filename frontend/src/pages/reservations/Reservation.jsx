import React, { useState, useEffect } from 'react';
import '../../components/styles/Reservation.css';
import ReservationCard from './ReservationCard';
import Search from '@mui/icons-material/SearchOutlined';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Reservation = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [reservations, setReservations] = useState([]);
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

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reservations');
        setReservations(response.data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };
    fetchReservations();
  }, []);

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
      <ReservationCard reservations={reservations} searchInput={searchInput} />
    </div>
  );
};

export default Reservation;
