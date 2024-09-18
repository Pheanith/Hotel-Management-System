import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import '../../components/styles/invoice/Invoice.css';

const Invoice = () => {
    const location = useLocation();
    const navigate = useNavigate(); // To navigate after saving
    const { state } = location;
    const { selectedRooms = [], selectedGuest, checkIn, checkOut } = state || {};

    // Calculate total amount
    const calculateTotalAmount = (rooms, checkIn, checkOut) => {
        const nights = (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
        return rooms.reduce((total, room) => {
            return total + (room.price_per_night * nights);
        }, 0);
    };

    const totalAmount = calculateTotalAmount(selectedRooms, checkIn, checkOut);

    // Handle reservation
    // const handleReserve = async () => {
    //     try {
    //         // const reservationData = {
    //         //     firstName: selectedGuest.firstName,
    //         //     lastName: selectedGuest.lastName,
    //         //     email: selectedGuest.email,
    //         //     phoneNumber: selectedGuest.phoneNumber,
    //         //     roomType: selectedRooms.map(room => room.room_type_name).join(", "), // Join room types into a single string
    //         //     roomNo: selectedRooms.map(room => room.room_number).join(", "), // Join room numbers into a single string
    //         //     address: selectedGuest.address,
    //         //     checkIn: checkIn,
    //         //     checkOut: checkOut,
    //         //     price: totalAmount,
    //         //     status: "Paid",
    //         //     reserveDate: new Date().toISOString(),
    //         //     checkInStatus: "Pending",
    //         // };
    //         const reservationData = {
    //             guest_id: selectedGuest.guest_id,  // The backend expects guest_id
    //             room_id: selectedRooms.map(room => room.room_id),  // Assuming room_id is required
    //             checkin_date: checkIn,
    //             checkout_date: checkOut,
    //             checkin_time: null, // Add if needed
    //             checkout_time: null, // Add if needed
    //             checkin_status: "Pending",
    //             checkout_status: "Pending",
    //             discount: null // Add if necessary
    //         };
    
    //         const response = await axios.post('http://localhost:5000/api/reservations', reservationData, {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    
    //         if (response.status === 200) {
    //             alert('Reservation created successfully!');
    //             navigate('/reservation'); // Redirect to reservations page
    //         } else {
    //             alert('Failed to create reservation.');
    //         }
    //     } catch (error) {
    //         console.error('Error creating reservation:', error);
    //         alert('Failed to create reservation.');
    //     }
    // };

    const handleReserve = async () => {
        try {
            const promises = selectedRooms.map((room) => {
                const reservationData = {
                    guest_id: selectedGuest.guest_id,
                    room_id: room.room_id,
                    checkin_date: checkIn,
                    checkout_date: checkOut,
                    checkin_time: null,
                    checkout_time: null,
                    checkin_status: "Pending",
                    checkout_status: "Pending",
                    discount: null
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
            <h2>Invoice Details</h2>
            <p><strong>Guest Name:</strong> {selectedGuest ? `${selectedGuest.firstName} ${selectedGuest.lastName}` : 'N/A'}</p>
            <p><strong>Check-in Date:</strong> {checkIn ? new Date(checkIn).toLocaleDateString() : 'N/A'}</p>
            <p><strong>Check-out Date:</strong> {checkOut ? new Date(checkOut).toLocaleDateString() : 'N/A'}</p>
            <p><strong>Total Amount:</strong> ${totalAmount.toFixed(2)}</p>
            <p><strong>Discount:</strong> $0.00</p>
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

export default Invoice;
