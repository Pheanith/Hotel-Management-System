//ReservationEdit.jsx

import React, { useEffect, useState } from 'react';
import '../../components/styles/ReservationEdit.css';
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
const ReservationEdit = ({ show, reservation, onclose, onUpdate }) => {

    const [reservationData, setReservationData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        roomNo: '',
        roomType: '',
        numberOfGuests: '',
        address: '',
        checkIn: '',
        checkOut: '',
        price: '',
        specialRequest: '',
        paymentMethods: [],
        status: '',
        reserveDate: '',
        checkInStatus: '',
    });

    useEffect(() => {
        if (reservation) {
            setReservationData({
                firstName: reservation.firstName,
                lastName: reservation.lastName,
                email: reservation.email,
                phoneNumber: reservation.phoneNumber,
                roomNo: reservation.roomNo,
                roomType: reservation.roomType,
                numberOfGuests: reservation.numberOfGuests,
                address: reservation.address,
                checkIn: new Date (reservation.checkIn),
                checkOut: new Date(reservation.checkOut),
                price: reservation.price,
                specialRequest: reservation.specialRequest,
                paymentMethods: reservation.paymentMethods || [],
                status: reservation.status,
                reserveDate: new Date(reservation.reserveDate),
                checkInStatus: reservation.checkInStatus
            });
        }
    }, [reservation]);

    const handleChange = (e) => {
        const {name, value } = e.target;
        setReservationData (prevState => ({...prevState, [name]: value}));
    };

    const handleDateChange = (name) => (date) => {
        setReservationData (prevState => ({ ...prevState, [name]: date}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formattedData = {
                ...reservationData,
                checkIn: formatDate(reservationData.checkIn),
                checkOut: formatDate(reservationData.checkOut),
                reserveDate: formatDate(reservationData.reserveDate)
            };
            await axios.put(`http://localhost:5000/api/reservations/${reservation.id}`, formattedData); // Fix here
            onUpdate({ ...reservation, ...formattedData });
            onclose();
        } catch (error) {
            console.error('Error updating reservation:', error.response ? error.response.data : error.message);
        }
    };
    
    const handlePaymentMethodChange = (paymentMethod) => {
        setReservationData(prevState => {
            const isSelected = prevState.paymentMethods.includes(paymentMethod);
            return {
                ...prevState,
                paymentMethods: isSelected
                    ? prevState.paymentMethods.filter(method => method !== paymentMethod)
                    : [...prevState.paymentMethods, paymentMethod]
            };
        });
    };

    return (
        <div className='edit-main'>
        <div className='reservationEdit-header'>
            <h2>Reservation Form</h2>
            <ClearOutlinedIcon onClick={onclose} className='close-icon' />
        </div>
        <form onSubmit={handleSubmit}>
            <div className="edit-form-group">
            {/* Name and Contacts */}
            <div className='edit-label1'>
                <label>Name</label>
                <label>Contacts</label>
            </div>
            <div className="edit-form-row">
                <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={ reservationData.firstName}
                onChange={handleChange}
                />
                <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={reservationData.lastName}
                onChange={handleChange}
                />
                <input
                type="email"
                name="email"
                placeholder="Email"
                value={reservationData.email}
                onChange={handleChange}
                />
                <input
                type="text"
                name="phoneNumber"
                placeholder="Phone number"
                value={reservationData.phoneNumber}
                onChange={handleChange}
                />
            </div>

            {/* Room Types and Number of Guests */}
            <div className='edit-label2'>
                <label>Room Number</label>
                <label>Room Types</label>
                <label>Number of Guests</label>
            </div>
            <div className='edit-form-row2'>
                <input
                type='text'
                name='roomNumber'
                placeholder='Room Number'
                value={reservationData.roomNo}
                onChange={handleChange}
                />
                <select
                name='roomType'
                value={reservationData.roomType}
                onChange={handleChange}
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
                value={reservationData.numberOfGuests}
                onChange={handleChange}
                />
            </div>

            {/* Address */}
            <div className='edit-label3'>
                <label>Address</label>
            </div>
            <div className='edit-form-row3'>
                <input
                type="text"
                name="address"
                placeholder="e.g., st. 206, Veal Vong, 7 Makara, Phnom Penh, Cambodia"
                value={reservationData.address}
                onChange={handleChange}
                />
            </div>

            {/* Check-in and Check-out */}
            <div className='edit-label4'>
                <label> Reserve Date </label>
                <label>Check-in</label>
                <label>Check-out</label>
            </div>
            <div className='edit-form-row4'>
                <DatePicker
                selected={reservationData.reserveDate}
                onChange={handleChange}
                dateFormat='dd-MM-yyyy'
                placeholderText='DD-MM-YYYY'
                />
                <DatePicker
                selected={reservationData.checkIn}
                onChange={handleDateChange('checkIn')}
                dateFormat='dd-MM-yyyy'
                placeholderText='DD-MM-YYYY'
                />
                <DatePicker
                selected={reservationData.checkOut}
                onChange={handleDateChange('checkOut')}
                dateFormat='dd-MM-yyyy'
                placeholderText='DD-MM-YYYY'
                />
            </div>

            {/* Price */}
            <div className='edit-label6'>
                <label>Price</label>
                <label> Payment Status </label>
                <label>Check In Status</label> 
            </div>
            <div className='edit-form-row6'>
                <input
                type='text'
                name='price'
                placeholder='$'
                value={reservationData.price}
                onChange={handleChange}
                />
                <select
                name= 'status'
                value={reservationData.status}
                onChange={handleChange}>
                <option value=""> Please select the payment status</option>
                <option value="Paid"> Paid </option>
                <option value="Unpaid"> Unpaid </option>
                </select>
                <select
                name='checkInStatus'
                value={reservationData.checkInStatus}
                onChange={handleChange}> 
                <option value=""> Please select the check-in status</option>
                <option value="Checked-in"> Checked-in </option>
                <option value="Not yet check-in"> Not yet check-in </option> 
                <option value="Checked-out"> checked-out</option>
                </select>
            </div>

            {/* Payment Method */}
            <div className='edit-label5'>
                <label>Payment Method</label>
            </div>
            <div className='edit-form-row5'>
                <div className='payment-method-checkbox'>
                        <input
                            type="checkbox"
                            id="cash"
                            checked={reservationData.paymentMethods.includes('cash')}
                            onChange={() => handlePaymentMethodChange('cash')}
                        />
                        <label htmlFor="cash">Cash</label>
                    </div>
                    <div className='payment-method-checkbox'>
                        <input
                            type="checkbox"
                            id="check"
                            checked={reservationData.paymentMethods.includes('check')}
                            onChange={() => handlePaymentMethodChange('check')}
                        />
                        <label htmlFor="check">Check</label>
                    </div>
                    <div className='payment-method-checkbox'>
                        <input
                            type="checkbox"
                            id="paypal"
                            checked={reservationData.paymentMethods.includes('paypal')}
                            onChange={() => handlePaymentMethodChange('paypal')}
                        />
                        <label htmlFor="paypal">Paypal</label>
                    </div>
                    <div className='payment-method-checkbox'>
                        <input
                            type="checkbox"
                            id="visaMasterCard"
                            checked={reservationData.paymentMethods.includes('visaMasterCard')}
                            onChange={() => handlePaymentMethodChange('visaMasterCard')}
                        />
                        <label htmlFor="visaMasterCard">Visa/MasterCard</label>
                    </div>
                </div>

            {/* Special Request */}
            <div className='edit-label7'>
                <label>Special Request</label>
            </div>
            <div className='edit-form-row7'>
                <input
                type='text'
                name='specialRequest'
                placeholder='Type your request here'
                value={reservationData.specialRequest}
                onChange={handleChange}
                />
            </div>
            </div>

            {/* Submit Button */}
            <div className='update-reservation'>
            <button type="submit"> Update </button>
            </div>
        </form>
        </div>
  );
};

export default ReservationEdit;
