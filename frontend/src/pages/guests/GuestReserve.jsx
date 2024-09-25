import React, { useEffect, useState } from "react";
import '../../components/styles/guest/GuestReserve.css';
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const GuestReserve = () => {
    const [guests, setGuests] = useState([]);
    const [selectedGuest, setSelectedGuest] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    
    const { selectedRooms, checkIn, checkOut } = location.state;
    console.log("selectedRooms1: ", selectedRooms);

    useEffect(() => {
        const fetchAllGuests = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/guests');
                setGuests(response.data);
            } catch (error) {
                console.error('Error fetching all guests:', error);
            }
        };

        fetchAllGuests();
    }, []);

    const handleGuestSelection = (guest) => {
        setSelectedGuest(guest);
    };

    const handleNextButton = () => {
        if (selectedGuest) {
            navigate('/reserve-sum', {
                state: {
                    selectedRooms,
                    selectedGuest,
                    checkIn,
                    checkOut
                }
            });
        } else {
            alert('Please select a guest.');
        }
    };

    const handleNewGuest = () => {
        navigate('/add-new-guest', { state: { fromPage: 'select-guest', selectedRooms,
            selectedGuest,
            checkIn,
            checkOut } });
    };

    return (
        <div className="main-guest-rev">
            <div className="rev-guest-header">
                <a>Guests List</a>
                <button className="next-button" onClick={handleNewGuest}>New guest</button>
                <button className="next-button" onClick={handleNextButton}>Next</button>
            </div>
            <div className="rev-guest-table-container">
                <table className="rev-guest-table">
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Identity Type</th>
                            <th>Identity Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {guests.map((guest, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        type="radio"
                                        name="guestSelect"
                                        onChange={() => handleGuestSelection(guest)}
                                    />
                                </td>
                                <td>{guest.firstName}</td>
                                <td>{guest.lastName}</td>
                                <td>{guest.phoneNumber}</td>
                                <td>{guest.email}</td>
                                <td>{guest.identity_type}</td>
                                <td>{guest.identity_no}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GuestReserve;
