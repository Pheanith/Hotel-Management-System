// src/ReservationCard.js
import React from 'react';
import '../components/styles/ReservationCard.css';
import Logo from '../components/assets/img/logo.png';
import Edit from '@mui/icons-material/BorderColorOutlined';
import Name from '@mui/icons-material/PersonOutlineOutlined';
import Room from '@mui/icons-material/HotelOutlined';
import RoomType from '@mui/icons-material/BedOutlined';
import Email from '@mui/icons-material/EmailOutlined';
import CheckIN from '@mui/icons-material/LoginOutlined';
import CheckOut from '@mui/icons-material/LogoutOutlined';

const ReservationCard = () => {
  return (
    <div className='main'>
      <div className='Header'>
        <img src={Logo} height={40} width={40}></img>
        <a> La Lune Hotel Reservation Card</a>
        <button>
          <Edit/>
        </button>
      </div>
      <div className='body'>
        <div className='reservation-id'>
          <p> Reservation ID </p>
          <p> 000111</p>
        </div>
        <div className='line'>
        </div>
        <div className='info'>
          <div className='first-row'>
            <div className='customer-name'>
              <Name/>
              <div className='sn'>
                <a> Nou Sopheanith </a>
              </div> 
            </div>
            <div className='customer-name'>
              <Room/>
              <div className='sn'>
                <a> 101 </a>
              </div>
            </div>
            <div className='customer-name'>
              <RoomType/>
              <div className='sn'>
                <a> Family Room </a>
              </div>
            </div>      
          </div>
          <div className='second-row'>
            <div className='customer-name'>
              <Email/>
              <div className='sn1'> 
                <a> nou.sopheaith@gamil.com </a>
              </div>
            </div>
            <div className='customer-name'>
              <CheckIN/>
              <div className='sn1'> 
                <a> 21-12-2024 </a>
              </div>
            </div>
            <div className='customer-name1'>
              <CheckOut/>
              <div className='sn1'> 
                <a> 21-12-2024 </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;
