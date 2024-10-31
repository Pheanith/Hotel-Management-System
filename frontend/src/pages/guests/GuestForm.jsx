//GuestForm.jsx
import React, { useState } from 'react';
import '../../components/styles/guest/GuestForm.css';
import { useNavigate, useLocation } from 'react-router-dom';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import axios from 'axios';

const GuestForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { fromPage, selectedRooms,
        selectedGuest,
        checkIn,
        checkOut} = location.state || {};

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [sex, setSex] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [address, setAddress] = useState('');
    const [identity_type, setIdentityType] = useState('');
    const [identity_no, setIdentityNo] = useState('');

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validateEmail(email)) {
            setEmailError('Invalid email address');
            return; // Stop the form submission if the email is invalid
        }
    
        const formattedData = {
            firstName,
            lastName,
            sex,
            phoneNumber,
            email,
            address,
            identity_type,
            identity_no,
        };
    
        try {
            await axios.post('http://localhost:5000/api/guests', formattedData);
            navigate('/manage-guest');
        } catch (error) {
            console.error('Cannot add guest:', error.response ? error.response.data : error.message);
        }
    };
    
    

    const handleClose = () => {
        if (fromPage === 'manage-guest') {
            navigate('manage-guest');
        } else {
            navigate('/select-guest');
        }
    }

    return (
        <div className='guestform-main'>
            <div className='guestform-header'>
                <h2>Create new guest</h2>
                <ClearOutlinedIcon onClick={handleClose} className='close-icon' />
            </div>
            <form onSubmit={handleSubmit}>
                <div className='new-guest-form'>
                    <div className='guest-row1'>
                        <input
                            type='text'
                            name='firstName'
                            placeholder='First name'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            type='text'
                            name='lastName'
                            placeholder='Last name'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <select
                            name='sex'
                            value={sex}
                            onChange={(e) => setSex(e.target.value)}
                        >
                            <option>Please select (Male or Female)</option>
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                        </select>
                    </div>
                    <div className='guest-row2'>
                        <input
                            type='email'
                            name='email'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                validateEmail(e.target.value);
                            }}
                        />
                        {emailError && <p className='error-message'>{emailError}</p>}
                        <input
                            type='text'
                            name='phoneNumber'
                            placeholder='Phone number'
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div className='guest-row3'>
                        <input
                            type='text'
                            name='address'
                            placeholder='Address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <select
                            name='identity_type'
                            value={identity_type}
                            onChange={(e) => setIdentityType(e.target.value)}
                        >
                            <option value=''>Please select identity card or Passport</option>
                            <option value='Identity card'>Identity card</option>
                            <option value='Passport'>Passport</option>
                        </select>
                        <input
                            type='text'
                            name='identity_no'
                            placeholder='Enter your identity card or passport number'
                            value={identity_no}
                            onChange={(e) => setIdentityNo(e.target.value)}
                        />
                    </div>
                </div>
                <div className='submit-guest'>
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default GuestForm;
