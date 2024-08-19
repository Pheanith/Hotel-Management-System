import React, { useState } from 'react';
import '../components/styles/Reservationform.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation

const Reservationform = ({ onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract room detail and fromPage from state
  const { roomNumber, roomType, fromPage } = location.state || {};

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    roomType: '',
    numberOfGuests: '',
    address: '',
    checkIn: null,
    checkOut: null,
    price: '',
    specialRequest: '',
  });

  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date, field) => {
    setFormData({
      ...formData,
      [field]: date,
    });
  };

  const handlePaymentMethodChange = (paymentMethod) => {
    const isSelected = selectedPaymentMethods.includes(paymentMethod);
    if (isSelected) {
      setSelectedPaymentMethods(selectedPaymentMethods.filter((method) => method !== paymentMethod));
    } else {
      setSelectedPaymentMethods([...selectedPaymentMethods, paymentMethod]);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form logic here

    // Navigate to reservation page or show success message
    navigate('/reservation'); // Or use any other method to close or redirect
  };

  // Handle form close
  const handleClose = () => {
    if (fromPage === 'reservation') {
      navigate('/reservation'); // Navigate to the Reservation page
    } else if (fromPage === 'room') {
      navigate('/manage-room'); // Navigate to the Room page
    } else if (fromPage === 'manage-guest'){
      navigate ('/manage-guest'); //Navigate to manage guest page
    }
    else {
      navigate('/'); // Fallback or default route
    }
  };

  return (
    <div className='main'>
      <div className='reservationform-header'>
        <h2>Reservation Form</h2>
        <ClearOutlinedIcon onClick={handleClose} className='close-icon' />
      </div>
      <form onSubmit={handleSubmit}>
        {/* Form fields here */}
        <div className="form-group">
          <div className='label1'>
            <label>Name</label>
            <label>Contacts</label>
          </div>
          <div className="form-row">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className='label2'>
            <label>Room Types</label>
            <label>Number of Guests</label>
          </div>
          <div className='form-row2'>
            <select
              name='roomType'
              value={formData.roomType}
              onChange={handleChange}>
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
              value={formData.numberOfGuests}
              onChange={handleChange}
            />
          </div>
          <div className='label3'>
            <label>Address</label>
          </div>
          <div className='form-row3'>
            <input
              type="text"
              name="address"
              placeholder="e.g., st. 206, Veal Vong, 7 Makara, Phnom Penh, Cambodia"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className='label4'>
            <label>Check-in</label>
            <label>Check-out</label>
          </div>
          <div className='form-row4'>
            <DatePicker
              selected={formData.checkIn}
              onChange={(date) => handleDateChange(date, 'checkIn')}
              dateFormat='dd-MM-yyyy'
              placeholderText='DD-MM-YYYY'
            />
            <DatePicker
              selected={formData.checkOut}
              onChange={(date) => handleDateChange(date, 'checkOut')}
              dateFormat='dd-MM-yyyy'
              placeholderText='DD-MM-YYYY'
            />
          </div>
          <div className='label6'>
            <label> Price </label>
          </div>
          <div className='form-row6'>
            <input
              type='text'
              name='price'
              placeholder='$'
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div className='label5'>
            <label>Payment Method</label>
          </div>
          <div className='form-row5'>
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
          <div className='label7'>
              <label> Special Request</label>
            </div>
            <div className='form-row7'>
              <input
                type='text'
                name='specialRequest'
                placeholder='Type your request here'
                value={formData.specialRequest}
                onChange={handleChange}
              />
            </div>
        </div>
        <div className='submit-reservation'>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Reservationform;
