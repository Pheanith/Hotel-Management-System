//Room.css
import React, {useState} from "react";
import '../components/styles/Room.css';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import RoomCard from "./RoomCard";

const rooms = [
    { roomNumber: "A-100", roomType: "Family Room", imageUrl: "path/to/image1.jpg" },
    { roomNumber: "A-101", roomType: "Deluxe King Suite", imageUrl: "path/to/image2.jpg" },
    // Add more rooms as needed
];
const Room = () =>{
    const [formData, setFormData] = useState({
        checkIn: null,
        checkOut: null,
    });
    const handleDateChange = (date, field) => {
        setFormData({
          ...formData,
          [field]: date,
        });
    };
    return(
        <div className='main-room-content'>
            <div className='room-content-header'>
                <a> Avialable Room </a>
                <div className="datepicker">
                    <DatePicker
                        selected={formData.checkIn}
                        onChange={(date) => handleDateChange(date, 'checkIn')}
                        dateFormat='dd-MM-yyyy'
                        placeholderText=' Please select check-in date '
                        className="dateinput"
                    />
                    <DatePicker
                        selected={formData.checkOut}
                        onChange={(date) => handleDateChange(date, 'checkOut')}
                        dateFormat='dd-MM-yyyy'
                        placeholderText=' Please select check-out date '
                        className="dateinput"
                    />
                </div>
            </div>
            <div className="room-cards-container">
                {rooms.map((room, index) => (
                    <RoomCard
                        key={index}
                        roomNumber={room.roomNumber}
                        roomType={room.roomType}
                        imageUrl={room.imageUrl}
                    />
                ))}
            </div>
        </div>
        
    );
}

export default Room;