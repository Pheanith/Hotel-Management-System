import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css'; // Make sure this is imported

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace with your real API call for authentication
    const mockUser = { username, role: 'Admin' }; // Simulated API response

    // Simulate successful login and redirect
    login(mockUser);
    navigate('/admin-dashboard');
  };

  return (
    <div className="login-container">  {/* Apply login-container class */}
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>  {/* Apply login-form class */}
        <div className="form-group">  {/* Apply form-group class */}
          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">  {/* Apply form-group class */}
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="login-btn" type="submit">Login</button>  {/* Apply login-btn class */}
      </form>
    </div>
  );
};

export default Login;
