// src/Header.js
import React, { useState } from 'react';
import '../header/header.css';
import logo from '../assets/img/logo.png';
import NotificationsIcon from '@mui/icons-material/Notifications';
import profile from '../assets/img/profile.png';
import { Link, useNavigate } from 'react-router-dom'; // For navigation

const Header = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false); // Manage dropdown visibility
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here (e.g., clear session, navigate to login)
    navigate('/login');
  };

  return (
    <header className="header">
      <img src={logo} height={59} width={63} alt="Logo" />
      <div className="name">
        <a> La Lune Hotel </a>
      </div>
      <div className="icon">
        <div className="notification">
          <NotificationsIcon />
        </div>
        <div className="user">
          <img
            src={profile}
            width={30}
            height={30}
            alt="User Profile"
            onClick={() => setDropdownVisible(!isDropdownVisible)} // Toggle dropdown
            className="profile-image"
          />
          {isDropdownVisible && (
            <div className="dropdown-menu">
              <ul>
                <li>
                  <Link to="/view-profile">View Profile</Link>
                </li>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
