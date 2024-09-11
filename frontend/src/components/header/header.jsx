// src/Header.js
import React from 'react';
import '../header/header.css';
import logo from '../assets/img/logo.png';
import NotificationsIcon from '@mui/icons-material/Notifications';
import profile from '../assets/img/profile.png';

const Header = () => {
  return (
    <header className="header">
        <img src={logo} height={59} width={63}></img>
        <div className="name">
          <a> La Lune Hotel </a>
        </div>
        <div className="icon">
          <div className="notification">
            <NotificationsIcon/>
          </div>
          <div classname="user">
            <img src={profile} width={30} height={30}></img>
          </div>
        </div>
    </header>
  );
};

export default Header;
