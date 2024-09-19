import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../../components/styles/Verification.css';
import axios from 'axios';

const Verification = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { state: reservation } = location;

    const [verificationCode, setVerificationCode] = useState('');
    const [error, setError] = useState('');
    // const api_url = process.env.API_URL;
    const handleVerify = () => {
        // Check if the entered verification code matches the reservation phone number

        // console.log(verificationCode, "==", reservation.phoneNumber);
        if (verificationCode == reservation.phoneNumber) {
            // Phone number matches; proceed with check-in
            axios.put(`http://localhost:5000/api/reservations/${reservation.reservation_id}/checkin`)
                .then(response => {
                    alert('Phone number verified! Check-in successful.');
                    // Redirect to confirmation or another page after verification
                    navigate('/reservation');
                })
                .catch(error => {
                    console.error('Error updating check-in status:', error);
                    setError('Failed to update check-in status. Please try again.');
                });
        } else {
            // Phone number does not match
            setError('The phone number does not match. Please try again.');
        }
    };

    if (!reservation) {
        return <p>No reservation details available.</p>;
    }

    return (
        <div className="verification-container">
            <h2>Phone Number Verification</h2>
            <p>Phone: {reservation.phoneNumber}</p>
            <input
                type="text"
                placeholder="Enter your phone number"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
            />
            {error && <p className="error-message">{error}</p>}
            <button onClick={handleVerify}>Verify</button>
        </div>
    );
};

export default Verification;

















