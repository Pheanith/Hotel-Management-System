//RoomList.jsx
import { useState } from 'react';
import React from "react";
import RoomTable from './RoomTable';
import { useNavigate } from "react-router-dom";
import '../../components/styles/rooms/RoomList.css';

const RoomList = () => {
const [isFormVisible, setFormVisible] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setFormVisible(true);
  };

  const handleCloseForm = () => {
    setFormVisible(false);
  };

  const handleOpenForm = () => {
    navigate('/add-room', { state: { fromPage: 'room-list' } });
  };
    return (
       <div className="main-room-list-content">
            <div className="room-content-body">
                <a> Room List </a>
                <button onClick={handleOpenForm}>Add new room </button>
            </div>
            <div className="room-table"> 
                <RoomTable/>
            </div>
       </div>
    );
}
 export default RoomList;