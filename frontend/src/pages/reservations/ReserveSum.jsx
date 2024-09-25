import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import '../../components/styles/invoice/Invoice.css';

const ReserveSum = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const { selectedRooms = [], selectedGuest, checkIn, checkOut } = state || {};

    const [discountPercentage, setDiscountPercentage] = useState(0); // Discount as a percentage

    // Calculate total amount based on selected rooms and stay duration
    const calculateTotalAmount = (rooms, checkIn, checkOut) => {
        const nights = (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
        return rooms.reduce((total, room) => total + (room.price_per_night * nights), 0);
    };

    // Calculate total after discount (percentage)
    const calculateTotalAfterDiscount = (totalAmount, discountPercentage) => {
        const discountAmount = (totalAmount * discountPercentage) / 100;
        return Math.max(totalAmount - discountAmount, 0); // Ensure total doesn't go below 0
    };

    const totalAmountBeforeDiscount = calculateTotalAmount(selectedRooms, checkIn, checkOut);
    const [totalAmount, setTotalAmount] = useState(calculateTotalAfterDiscount(totalAmountBeforeDiscount, discountPercentage));

    const handleDiscountChange = (e) => {
        const discountValue = parseFloat(e.target.value);
        setDiscountPercentage(discountValue);
        setTotalAmount(calculateTotalAfterDiscount(totalAmountBeforeDiscount, discountValue));
    };

    const handleReserve = async () => {
        try {
            const promises = selectedRooms.map((room) => {
                const reservationData = {
                    guest_id: selectedGuest.guest_id,
                    room_id: room.room_id,
                    checkin_date: checkIn,
                    checkout_date: checkOut,
                    checkin_status: "Pending",
                    checkout_status: "Pending",
                    discount: discountPercentage, // Send discount as percentage
                    totalAmount: totalAmount // Send total amount after discount
                };

                return axios.post('http://localhost:5000/api/reservations', reservationData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            });

            const responses = await Promise.all(promises);

            if (responses.every((response) => response.status === 200)) {
                alert('Reservations created successfully!');
                navigate('/reservation');
            } else {
                alert('Failed to create reservations.');
            }
        } catch (error) {
            console.error('Error creating reservations:', error);
            alert('Failed to create reservations.');
        }
    };

    return (
        <div className="invoice-details">
            <h2>Reservation Summary</h2>
            <p><strong>Guest Name:</strong> {selectedGuest ? `${selectedGuest.firstName} ${selectedGuest.lastName}` : 'N/A'}</p>
            <p><strong>Check-in Date:</strong> {checkIn ? new Date(checkIn).toLocaleDateString() : 'N/A'}</p>
            <p><strong>Check-out Date:</strong> {checkOut ? new Date(checkOut).toLocaleDateString() : 'N/A'}</p>
            <p><strong>Total Amount (before discount):</strong> ${totalAmountBeforeDiscount.toFixed(2)}</p>

            {/* Discount input */}
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

            {/* Total amount after discount */}
            <p><strong>Total Amount (after discount):</strong> ${totalAmount.toFixed(2)}</p>

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

            <button onClick={handleReserve}>Reserve</button>
        </div>
    );
};

export default ReserveSum;
