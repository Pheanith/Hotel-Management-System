import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './sidebar.css';

// Icons (replace with your icon imports)
import Home from "@mui/icons-material/HomeOutlined";
import Guest from "@mui/icons-material/PeopleAltOutlined";
import Room from "@mui/icons-material/HotelOutlined";
import RoomList from '@mui/icons-material/BallotOutlined';
import ManageUser from '@mui/icons-material/GroupOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Logout icon

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate(); // For navigation after logout
  const [isRoomListOpen, setRoomListOpen] = useState(false);

  const toggleRoomListDropdown = (event) => {
    event.stopPropagation();
    setRoomListOpen(prevState => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isRoomListOpen && !event.target.closest('.dropdown-container')) {
        setRoomListOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isRoomListOpen]);

  const handleLogout = () => {
    // Perform logout logic (e.g., clear tokens, call API)
    // After logout, redirect to login page
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className={`menu-item ${location.pathname === '/admin-dashboard' ? 'active' : ''}`}>
        <Home className="icon" />
        <Link to='/admin-dashboard'>Dashboard</Link>
      </div>

      {/* Rooms Section */}
      <div className={`menu-item dropdown ${location.pathname.startsWith('/room-list') ? 'active' : ''}`}>
        <div className="dropdown-container" onClick={toggleRoomListDropdown}>
          <Room className="icon" />
          <span>Manage Rooms</span>
          <ExpandMoreIcon className={`dropdown-icon ${isRoomListOpen ? 'open' : ''}`} />
        </div>
        {isRoomListOpen && (
          <div className="dropdown-menu">
            <Link to="/room-list" className="dropdown-item">Room List</Link>
            <Link to="/room-types" className="dropdown-item">Room Types</Link>
            <Link to="/accommodation-types" className="dropdown-item">Accommodation Types</Link>
          </div>
        )}
      </div>

      {/* Users Section */}
      <div className={`menu-item ${location.pathname === '/UserList' ? 'active' : ''}`}>
        <ManageUser className="icon" />
        <Link to='/UserList'>Manage Users</Link>
      </div>

      {/* Guests Section */}
      <div className={`menu-item ${location.pathname === '/manage-guest' ? 'active' : ''}`}>
        <Guest className="icon" />
        <Link to='/manage-guest'>Manage Guest</Link>
      </div>

      {/* Reservations Section */}
      <div className={`menu-item ${location.pathname === '/reservations' ? 'active' : ''}`}>
        <Room className="icon" />
        <Link to='/reservations'>Reservations</Link>
      </div>

      {/* Logout Button */}
      <div className="logout-button" onClick={handleLogout}>
        <ExitToAppIcon className="icon" />
        Logout
      </div>
    </aside>
  );
};

export default Sidebar;