//RoomCard.jsx
import React from "react";
import '../../components/styles/rooms/RoomCard.css';
import { useNavigate } from "react-router-dom";

const RoomCard = ({ roomNumber, roomType, accomodationType, floorNumber, pricePerNight, description }) => {
  const navigate = useNavigate();

  return (
    <div className="room-card-container">
      <table className="av-room-table">
        <thead>
          <tr>
            <th> Select </th>
            <th> Room number </th>
            <th> Room type </th>
            <th> Accommodation type </th>
            <th> Floor number </th>
            <th> Price per night </th>
            <th> Description </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="select-room-checkbox">
              <input type="checkbox" />
            </td>
            <td>{roomNumber}</td>
            <td>{roomType}</td>
            <td>{accomodationType}</td>
            <td>{floorNumber}</td>
            <td>{pricePerNight}</td>
            <td>{description}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RoomCard;
