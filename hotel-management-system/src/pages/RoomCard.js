import React from "react";
import '../components/styles/RoomCard.css';
import Singleroom from "../components/assets/img/singleroom.jfif";
import { useNavigate } from "react-router-dom";

const RoomCard = ({ roomNumber, roomType }) => {
  const navigate = useNavigate();

  const handleReservationClick = () => {
    navigate('/reserve', {
      state: { 
        roomNumber, 
        roomType,
        fromPage: 'room'  // Add this line to track the origin page
      }
    });
  };

  return (
    <div className="room-card">
      <img src={Singleroom} alt={roomType} className="room-image" />
      <div className="room-details">
        <h3 className="room-number">{roomNumber}</h3>
        <p className="room-type">{roomType}</p>
        <button className="reserve-button" onClick={handleReservationClick}>
          Make Reservation
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
