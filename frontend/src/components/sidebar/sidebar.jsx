import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../sidebar/sidebar.css';
import Home from "@mui/icons-material/HomeOutlined";
import Guest from "@mui/icons-material/PeopleAltOutlined";
import Room from "@mui/icons-material/HotelOutlined";
import RoomList from '@mui/icons-material/BallotOutlined';
import Reservations from '@mui/icons-material/BrowserUpdatedOutlined';

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className={`dashboard ${location.pathname === '/admin-dashboard' ? 'active' : ''}`}>
        <Home/>
        <div className="dashboard-name">
          <Link to='/admin-dashboard'>
            Admin Dashboard
          </Link>
        </div>
      </div>
      <div className={`dashboard ${location.pathname === '/manage-guest' ? 'active' : ''}`}>
        <Guest/>
        <div className="dashboard-name">
          <Link to='/manage-guest'>
            Manage Guest
          </Link>
        </div>
      </div>
      <div className={`dashboard ${location.pathname === '/available-room' ? 'active' : ''}`}>
        <Room/>
        <div className="dashboard-name">
          <Link to='/available-room'>
            Make Reservation
          </Link>
        </div>
      </div>
      <div className={`dashboard ${location.pathname === '/room-list' ? 'active' : ''}`}>
        <RoomList/>
        <div className="dashboard-name">
          <Link to='/room-list'>
            Rooms List
          </Link>
        </div>
      </div>
      <div className={`dashboard ${location.pathname === '/reservation' ? 'active' : ''}`}>
        <Reservations/>
        <div className="dashboard-name">
          <Link to='/reservation'>
            Reservations
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
