import React from "react";
import '../components/styles/Reservationform.css';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

const Reservationform = ({onClose}) => {
    return (
        <div className="main">
            <div className="reservation-header"> 
                <p> Reservation Form</p>
                <ClearOutlinedIcon className="close-icon" onClick={onClose}/>
            </div>
        </div>
    );
};
export default Reservationform;