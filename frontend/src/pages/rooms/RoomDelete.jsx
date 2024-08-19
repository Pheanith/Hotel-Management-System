import React, {useState} from "react";
import '../../components/styles/rooms/RoomDelete.css';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const RoomDelete = ({show, onClose, onDelete}) => {
    if (!show) {
        return null;
      }
    
    return (
    <div className="modal-backdrop">
        <div className="modal">
            <InfoOutlinedIcon/>
            <p>Are you sure you want to delete this room?</p>
            <button className="btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn-danger" onClick={onDelete}>Delete</button>
        </div>
    </div>
    );
    
}
export default RoomDelete;