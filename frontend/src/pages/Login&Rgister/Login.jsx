import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';
import hotelImage from '../Login&Rgister/hotel1.jpg';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State to hold error message
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/admin-dashboard');
    } catch (error) {
      setError('Login failed. Please check your username and password.');
      alert("Please login again"); // Alert message for failed login
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="login-page">
      {/* Left side - Image */}
      <div className="login-image">
        <img src={hotelImage} alt="hotel1" />
      </div>

      {/* Right side - Login Form */}
      <div className="login-container">
        <div className="login-card">
          <h2>Login</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
              />
            </div>
            <button type="submit" className="login-btn">Login</button>
          </form>

          {error && <p className="error-message">{error}</p>} {/* Display error message if login fails */}

          <p className="register-link">
            Don't have an account? <span onClick={handleRegisterClick}>Register</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
