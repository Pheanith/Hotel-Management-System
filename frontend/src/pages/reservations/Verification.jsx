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

    const handleVerify = () => {
        // Check if the entered verification code matches the reservation identity number
        if (verificationCode === reservation.identity_no) {
            // Identity number matches; proceed with check-in
            axios.put(`http://localhost:5000/api/reservations/${reservation.reservation_id}/checkin`)
                .then(response => {
                    alert('Identity number verified! Check-in successful.');
                    navigate('/reservation');
                })
                .catch(error => {
                    console.error('Error updating check-in status:', error);
                    setError('Failed to update check-in status. Please try again.');
                });
        } else {
            // Identity number does not match
            setError('The identity number does not match. Please try again.');
        }
    };

    if (!reservation) {
        return <p>No reservation details available.</p>;
    }

    return (
        <div className="verification-container">
            <h2>Identity Number Verification</h2>
            <p><strong>Your Identity Number:</strong> {reservation.identity_no}</p> {/* Display the identity number */}
            <input
                type="text"
                placeholder="Enter your identity number"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
            />
            {error && <p className="error-message">{error}</p>}
            <button onClick={handleVerify}>Verify</button>
        </div>
    );
};

export default Verification;
