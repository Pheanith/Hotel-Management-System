import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css'; // 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("username", username);
    console.log("password", password);
    // Simulate successful login and redirect
    login(username, password);
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
