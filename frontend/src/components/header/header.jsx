// src/components/header/header.jsx
import React, { useState } from 'react';
import '../header/header.css';
import logo from '../assets/img/logo.png';
import NotificationsIcon from '@mui/icons-material/Notifications';
import profile from '../assets/img/profile.png';
import { Link, useNavigate } from 'react-router-dom'; // For navigation
import { useAuth } from '../../context/AuthContext'; // Adjust the import to point to AuthContext

const Header = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth(); // Access the logout function from AuthContext

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to the login page after logout
  };

  return (
    <header className="header">
      <img src={logo} height={59} width={63} alt="Logo" />
      <div className="name">
        <span>La Lune Hotel</span>
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
            onClick={() => setDropdownVisible(!isDropdownVisible)}
            className="profile-image"
          />
          {isDropdownVisible && (
            <div className="dropdown-menu">
              <ul>
                <li>
                  <Link to="/view-profile">View Profile</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="logout-button">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
