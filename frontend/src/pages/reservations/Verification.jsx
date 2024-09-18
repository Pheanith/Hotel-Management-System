import React from "react";
import { useState } from "react";
import '../../components/styles/Verification.css';
import { useNavigate, useLocation	 } from "react-router-dom";

const Verification = () => {
    const location = useLocation();
  const navigate = useNavigate();
  const { state: reservation } = location;
  
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');

  const handleVerify = () => {
    if (verificationCode === reservation.phoneNumber) {
      // Phone number matches; proceed with check-in
      alert('Phone number verified! Check-in successful.');
      // Redirect to confirmation or another page after verification
      navigate('/reservation');
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