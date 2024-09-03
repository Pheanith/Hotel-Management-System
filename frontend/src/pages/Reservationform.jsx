//Reservationform.jsx
import React, { useState } from 'react';
import '../components/styles/Reservationform.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const formatDate = (date) => {
  if (!date) return '';
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(date).toLocaleDateString('en-GB', options).split('/').reverse().join('-'); // Converts to DD-MM-YYYY
};
const Reservationform = ({ onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { fromPage } = location.state || {};

  // Form state management
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [roomNo, setRoomNumber] = useState('');
  const [roomType, setRoomType] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState('');
  const [address, setAddress] = useState('');
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [price, setPrice] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState([]);
  const [status, setStatus] = useState('');
  const [reserveDate, setReserveDate] = useState('');
  const [checkInStatus, setCheckInStatus] = useState('');


  const handlePaymentMethodChange = (paymentMethod) => {
    if (selectedPaymentMethods.includes(paymentMethod)) {
      setSelectedPaymentMethods(
        selectedPaymentMethods.filter((method) => method !== paymentMethod)
      );
    } else {
      setSelectedPaymentMethods([...selectedPaymentMethods, paymentMethod]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      firstName,
      lastName,
      email,
      phoneNumber,
      roomNo,
      roomType,
      numberOfGuests,
      address,
      checkIn: checkIn ? formatDate(checkIn) : '',
      checkOut: checkOut ? formatDate(checkOut) : '',
      price,
      specialRequest,
      paymentMethods: selectedPaymentMethods,
      status,
      reserveDate: reserveDate ? formatDate(reserveDate) : '',
      checkInStatus,
    };

    try {
      await axios.post('http://localhost:5000/api/reservations', formattedData);
      navigate('/reservation');
    } catch (error) {
      console.error('Cannot reserve:', error.response ? error.response.data : error.message);
    }
  };

  const handleClose = () => {
    if (fromPage === 'reservation') {
      navigate('/reservation');
    } else if (fromPage === 'room') {
      navigate('/available-room');
    } else if (fromPage === 'manage-guest') {
      navigate('/manage-guest');
    } else {
      navigate('/');
    }
  };

  return (
    <div className='main'>
      <div className='reservationform-header'>
        <h2>Reservation Form</h2>
        <ClearOutlinedIcon onClick={handleClose} className='close-icon' />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          {/* Name and Contacts */}
          <div className='label1'>
            <label>Name</label>
            <label>Contacts</label>
          </div>
          <div className="form-row">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          {/* Room Types and Number of Guests */}
          <div className='label2'>
            <label>Room Number</label>
            <label>Room Types</label>
            <label>Number of Guests</label>
          </div>
          <div className='form-row2'>
            <input
              type='text'
              name='roomNumber'
              placeholder='Room Number'
              value={roomNo}
              onChange={(e) => setRoomNumber(e.target.value)}
            />
            <select
              name='roomType'
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
            >
              <option value="">Please select</option>
              <option value="Single Room">Single Room</option>
              <option value="Double Room">Double Room</option>
              <option value="Family Room">Family Room</option>
              <option value="King Room">King Room</option>
              <option value="Queen Room">Queen Room</option>
            </select>
            <input
              type='number'
              name='numberOfGuests'
              placeholder='e.g., 4'
              value={numberOfGuests}
              onChange={(e) => setNumberOfGuests(e.target.value)}
            />
          </div>

          {/* Address */}
          <div className='label3'>
            <label>Address</label>
          </div>
          <div className='form-row3'>
            <input
              type="text"
              name="address"
              placeholder="e.g., st. 206, Veal Vong, 7 Makara, Phnom Penh, Cambodia"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* Check-in and Check-out */}
          <div className='label4'>
            <label> Reserve Date </label>
            <label>Check-in</label>
            <label>Check-out</label>
          </div>
          <div className='form-row4'>
            <DatePicker
              selected={reserveDate}
              onChange={(date) => setReserveDate(date)}
              dateFormat='dd-MM-yyyy'
              placeholderText='DD-MM-YYYY'
            />
            <DatePicker
              selected={checkIn}
              onChange={(date) => setCheckIn(date)}
              dateFormat='dd-MM-yyyy'
              placeholderText='DD-MM-YYYY'
            />
            <DatePicker
              selected={checkOut}
              onChange={(date) => setCheckOut(date)}
              dateFormat='dd-MM-yyyy'
              placeholderText='DD-MM-YYYY'
            />
          </div>

          {/* Price */}
          <div className='label6'>
            <label>Price</label>
            <label> Payment Status </label>
            <label>Check In Status</label> 
          </div>
          <div className='form-row6'>
            <input
              type='text'
              name='price'
              placeholder='$'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <select
              name= 'status'
              value={status}
              onChange={(e) => setStatus(e.target.value)}>
              <option value=""> Please select the payment status</option>
              <option value="Paid"> Paid </option>
              <option value="Unpaid"> Unpaid </option>
            </select>
            <select
              name='checkInStatus'
              value={checkInStatus}
              onChange={(e) => setCheckInStatus(e.target.value)}> 
              <option value=""> Please select the check-in status</option>
              <option value="Checked-in"> Checked-in </option>
              <option value="Not yet check-in"> Not yet check-in </option> 
              <option value="Checked-out"> checked-out</option>
            </select>
          </div>

          {/* Payment Method */}
          <div className='label5'>
            <label>Payment Method</label>
          </div>
          <div className='form-row5'>
          <div className='payment-method-checkbox'>
              <input
                type="checkbox"
                id="cash"
                name="cash"
                checked={selectedPaymentMethods.includes('check')}
                onChange={() => handlePaymentMethodChange('check')}
              />
              <label htmlFor="check">Cash</label>
            </div>
            <div className='payment-method-checkbox'>
              <input
                type="checkbox"
                id="check"
                name="check"
                checked={selectedPaymentMethods.includes('check')}
                onChange={() => handlePaymentMethodChange('check')}
              />
              <label htmlFor="check">Check</label>
            </div>
            <div className='payment-method-checkbox'>
              <input
                type="checkbox"
                id="paypal"
                name="paypal"
                checked={selectedPaymentMethods.includes('paypal')}
                onChange={() => handlePaymentMethodChange('paypal')}
              />
              <label htmlFor="paypal">Paypal</label>
            </div>
            <div className='payment-method-checkbox'>
              <input
                type="checkbox"
                id="visaMasterCard"
                name="visaMasterCard"
                checked={selectedPaymentMethods.includes('visaMasterCard')}
                onChange={() => handlePaymentMethodChange('visaMasterCard')}
              />
              <label htmlFor="visaMasterCard">Visa/MasterCard</label>
            </div>
          </div>

          {/* Special Request */}
          <div className='label7'>
            <label>Special Request</label>
          </div>
          <div className='form-row7'>
            <input
              type='text'
              name='specialRequest'
              placeholder='Type your request here'
              value={specialRequest}
              onChange={(e) => setSpecialRequest(e.target.value)}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className='submit-reservation'>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Reservationform;
