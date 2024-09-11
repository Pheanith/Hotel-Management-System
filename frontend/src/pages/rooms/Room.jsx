// Room.jsx
import React, { useState, useEffect } from "react";
import '../../components/styles/rooms/Room.css';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import RoomCard from "./RoomCard";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Room = () => {
  const [formData, setFormData] = useState({
    checkIn: null,
    checkOut: null,
  });
  const [rooms, setRooms] = useState([]);

  // Fetch all rooms excluding maintenance on initial render
  useEffect(() => {
    const fetchAllRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/rooms/available');
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching all rooms:', error);
      }
    };

    fetchAllRooms();
  }, []);

  // Fetch available rooms based on selected dates
  useEffect(() => {
    if (formData.checkIn && formData.checkOut) {
      const fetchAvailableRooms = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/rooms/available', {
            params: {
              checkIn: formData.checkIn.toISOString().split('T')[0],
              checkOut: formData.checkOut.toISOString().split('T')[0],
            },
          });
          setRooms(response.data);
        } catch (error) {
          console.error('Error fetching available rooms:', error);
        }
      };

      fetchAvailableRooms();
    }
  }, [formData.checkIn, formData.checkOut]);

  const handleDateChange = (date, field) => {
    setFormData({
      ...formData,
      [field]: date,
    });
  };

  const navigate = useNavigate();
  const handleNextButton = () => {
    navigate ('/select-guest', {state: {fromPage: 'available-room'}});
  }

  return (
    <div className='main-room-content'>
      <div className='room-content-header'>
        <a>Available Rooms</a>
        <div className="datepicker">
          <DatePicker
            selected={formData.checkIn}
            onChange={(date) => handleDateChange(date, 'checkIn')}
            dateFormat='dd-MM-yyyy'
            placeholderText='Please select check-in date'
            className="dateinput"
          />
          <DatePicker
            selected={formData.checkOut}
            onChange={(date) => handleDateChange(date, 'checkOut')}
            dateFormat='dd-MM-yyyy'
            placeholderText='Please select check-out date'
            className="dateinput"
          />
        </div>
        <button className="next-button" onClick={handleNextButton}> Next </button>
      </div>
      <div className="room-cards-container">
        {rooms.map((room, index) => (
          <RoomCard
            key={index}
            roomNumber={room.room_number}
            roomType={room.room_type_name}
            accomodationType={room.accommodation_type_name}
            floorNumber={room.floor_number}
            pricePerNight={room.price_per_night}
            description={room.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Room;
