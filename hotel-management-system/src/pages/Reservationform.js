import React, { useState } from 'react';
import '../components/styles/Reservationform.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { FaTimes } from 'react-icons/fa'; // FontAwesome example

const Reservationform = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    roomType: '',
    numberOfGuests: '',
    address: '',
    arrival: null,
    departure: null,
    paymentMethod: '',
    specialRequest: '',
  });

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

 // Payment method checkboxes
 const [selectedPaymentMethods, setSelectedPaymentMethods] = useState([]);

 const handlePaymentMethodChange = (paymentMethod) => {
   const isSelected = selectedPaymentMethods.includes(paymentMethod);
   if (isSelected) {
     setSelectedPaymentMethods(selectedPaymentMethods.filter((method) => method !== paymentMethod));
   } else {
     setSelectedPaymentMethods([...selectedPaymentMethods, paymentMethod]);
   }
 };

 const handleSubmit = (e) => {
   e.preventDefault();

   // Check for selected payment method(s)
   if (!selectedPaymentMethods.length) {
     alert('Please select at least one payment method.');
     return; // Prevent form submission if no payment method is selected
   }

   // Logic to add reservation to the list
   onClose();
 };

  return (
    <div className='main'>
        <div className='reservationform-header'>
            <h2> Reservation form</h2>
            <ClearOutlinedIcon onClick={onClose} className='close-icon' />
        </div>
        <form>
            <div className="form-group">
                <div className='label1'>
                  <label> Name </label>
                  <label> Contacts </label>
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
                    <label> Room Types </label>
                    <label> Number of Guests</label>
                </div>
                <div className='form-row2'>
                  <select 
                    name='roomType'
                    value={formData.roomType} 
                    onChange={handleChange}>
                    <option> Please select</option>
                    <option> Single Room</option>
                    <option> Double Room</option>
                    <option> Family Room </option>
                    <option> King Room</option>
                    <option> Queen Room</option>
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
                  <label> Address</label>
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
                  <label> Arrival </label>
                  <label> Departure</label>
                </div>
                <div className='form-row4'>
                  <DatePicker
                    selected={formData.arrival}
                    onChange={(date) => handleDateChange(date, 'arrival')}
                    dateFormat='dd-MM-yyyy'
                    placeholderText='DD-MM-YYYY'
                  />
                  <DatePicker
                    selected={formData.departure}
                    onChange={(date) => handleDateChange(date, 'departure')}
                    dateFormat='dd-MM-yyyy'
                    placeholderText='DD-MM-YYYY'
                  />
                </div>
                <div className='label5'>
                  <label> Payment Method</label>
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
            </div>  
        </form>

    </div>
  );
};

export default Reservationform;
