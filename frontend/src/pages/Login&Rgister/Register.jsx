import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate for redirection
import './Register.css'; // Import the CSS file for styling
import hotelImage from '../Login&Rgister/hotel1.jpg';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); // State for role selection
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Use navigate for redirection

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/auth/register', {
        username,
        password,
        role, // Include role in the request
      });
      setMessage('Registration successful!');
      setTimeout(() => {
        navigate('/login'); // Redirect to login page after successful registration
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data || 'An error occurred');
    }
  };

  return (
    <div className="register-page">
      {/* Left side - Image */}
      <div className="register-image">
        <img src={hotelImage} alt="hotel1" />
      </div>

      {/* Right side - Register Form */}
      <div className="register-container">
        <div className="register-card">
          <h2>Register</h2>
          <form onSubmit={handleRegister} className="register-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Simple Admin">Staff</option>
              </select>
            </div>
            <button type="submit" className="register-btn">Register</button>
          </form>
          {message && <p className="message">{message}</p>}
          <p className="login-link">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
