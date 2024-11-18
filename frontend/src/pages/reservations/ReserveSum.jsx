import React, { useEffect, useState } from "react";
import '../../components/styles/ReserveSum.css';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { previousFriday } from "date-fns";

const ReserveSum = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const { selectedRooms = [], selectedGuest, checkIn, checkOut } = state || {};
    const [room_ids, setRoom_ids] = useState([
       
    ]);
    const [discountPercentage, setDiscountPercentage] = useState(0);

    const calculateTotalAmount = (rooms, checkIn, checkOut) => {
        const nights = (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
        return rooms.reduce((total, room) => total + (room.price_per_night * nights), 0);
    };

    const calculateTotalAfterDiscount = (totalAmount, discountPercentage) => {
        const discountAmount = (totalAmount * discountPercentage) / 100;
        return Math.max(totalAmount - discountAmount, 0);
    };

    const totalAmountBeforeDiscount = calculateTotalAmount(selectedRooms, checkIn, checkOut);
    const [totalAmount, setTotalAmount] = useState(calculateTotalAfterDiscount(totalAmountBeforeDiscount, discountPercentage));

    const handleDiscountChange = (e) => {
        const discountValue = parseFloat(e.target.value);
        if (discountValue >= 0 && discountValue <= 100) {
            setDiscountPercentage(discountValue);
            setTotalAmount(calculateTotalAfterDiscount(totalAmountBeforeDiscount, discountValue));
        }
    };

    const handleRoomSelection =  () =>{
        const newRoomIds = selectedRooms.map((room)=>room.room_id);
         setRoom_ids(newRoomIds);
    }

    useEffect(()=>{
        handleRoomSelection();
        console.log("handle room ids: ", room_ids);
    },[selectedRooms])

    const handleReserve = async () => {
        try {

            console.log("selectedRooms id:", selectedRooms.room_id) ; 
            
    
            console.log("Room ids :", room_ids);

            const reservationData = {
                "guest_id": selectedGuest.guest_id,
                "checkin_date": checkIn,
                "checkout_date": checkOut,
                "checkin_status": 'pending',
                "checkout_status": 'pending',
                "discount": discountPercentage,
                // "identity_no": selectedGuest.identity_no,
                "room_id": room_ids
            } ;
            const response = await axios.post('http://localhost:5000/api/reservations', reservationData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },});

            if (response.status === 200) {  
                alert('Reservations created successfully!');
                navigate('/reservation');
            } else {
                alert('Failed to create reservations.');
            };

        } catch (error) {
            console.error('Error creating reservations:', error);
            alert('Failed to create reservations.');
        }
    };

    return (
        <div className="sum-detail">
            <div className="sum-header">
                <h2>Reservation Summary</h2>
            </div>

            <div className="summary-container">
                {/* Guest Information */}
                <div className="guest-info">
                    <p><strong>Guest Name:</strong> {selectedGuest ? `${selectedGuest.firstName} ${selectedGuest.lastName}` : 'N/A'}</p>
                    <p><strong>Check-in Date:</strong> {checkIn ? new Date(checkIn).toLocaleDateString() : 'N/A'}</p>
                    <p><strong>Check-out Date:</strong> {checkOut ? new Date(checkOut).toLocaleDateString() : 'N/A'}</p>
                    <p><strong>Total Amount (before discount):</strong> ${totalAmountBeforeDiscount.toFixed(2)}</p>

                    <label>
                        <strong>Discount (%):</strong>
                        <input
                            type="number"
                            value={discountPercentage}
                            onChange={handleDiscountChange}
                            min="0"
                            max="100"
                            step="0.01"
                        />
                    </label>

                    <p><strong>Total Amount (after discount):</strong> ${totalAmount.toFixed(2)}</p>
                </div>

                {/* Selected Rooms Information */}
                <div className="selected-rooms">
                    <h3>Selected Rooms:</h3>
                    <ul>
                        {selectedRooms.length > 0 ? (
                            selectedRooms.map((room, index) => (
                                <li key={index}>
                                    <p><strong>Room Number:</strong> {room.room_number}</p>
                                    <p><strong>Room Type:</strong> {room.room_type_name}</p>
                                    <p><strong>Accommodation Type:</strong> {room.accommodation_type_name}</p>
                                    <p><strong>Price Per Night:</strong> ${room.price_per_night}</p>
                                    <p><strong>Description:</strong> {room.description}</p>
                                </li>
                            ))
                        ) : (
                            <p>No rooms selected.</p>
                        )}
                    </ul>
                </div>
            </div>

            <button onClick={handleReserve}>Reserve</button>
        </div>

    );
};

export default ReserveSum;
