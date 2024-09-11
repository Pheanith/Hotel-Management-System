//GuetEdit.jsx
import React, { useEffect, useState } from 'react';
import '../../components/styles/guest/GuestEdit.css';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import axios from 'axios';

const GuestEdit = ({ show, guest, onClose, onUpdate }) => {
    const [guestData , setGuestData] = useState ({
        firstName: '',
        lastName: '',
        sex: '',
        phoneNumber: '',
        email: '',
        address: '',
        identity_type: '',
        identity_no: ''
    });

    useEffect(() => {
        if (guest) {
            setGuestData({
                firstName: guest.firstName,
                lastName: guest.lastName,
                sex: guest.sex,
                phoneNumber: guest.phoneNumber,
                email: guest.email,
                address: guest.address,
                identity_type: guest.identity_type,
                identity_no: guest.identity_no,
            });
        }
    }, [guest]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setGuestData(prevState => ({ ...prevState, [name]: value}));
    };

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(guestData.email)) {
            alert('Invalid email address');
            return;
        }

        try {
            const formattedData = {
                ...guestData
            };
            await axios.put(`http://localhost:5000/api/guests/${guest.guest_id}`, formattedData);
            onUpdate({ ...formattedData, guest_id: guest.guest_id });
            onClose(); // Close the modal after update
        } catch (error) {
            console.error('Error updating guest:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className='guestEdit-main'>
            <div className='guestEdit-header'>
                <h2> Update guest </h2>
                <ClearOutlinedIcon onClick={onClose} className='close-icon' />
            </div>
            <form onSubmit={handleSubmit}>
                <div className='edit-guest-form'>
                    <div className='edit-guest-row1'>
                        <input
                            type='text'
                            name='firstName'
                            placeholder='First name'
                            value={guestData.firstName}
                            onChange={handleChange}
                        />
                        <input
                            type='text'
                            name='lastName'
                            placeholder='Last name'
                            value={guestData.lastName}
                            onChange={handleChange}
                        />
                        <select
                            name='sex'
                            value={guestData.sex}
                            onChange={handleChange}>
                            <option> Please select (Male or Female) </option>
                            <option value="Male"> Male </option>
                            <option value="Female"> Female </option>
                        </select>
                    </div>
                    <div className='edit-guest-row2'>
                        <input
                            type='email'
                            name='email'
                            placeholder='Email'
                            value={guestData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type='text'
                            name='phoneNumber'
                            placeholder='Phone number'
                            value={guestData.phoneNumber}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='edit-guest-row3'> 
                        <input
                            type='text'
                            name='address'
                            placeholder='Address'
                            value={guestData.address}
                            onChange={handleChange}
                        />
                        <select
                            name='identity_type'
                            value={guestData.identity_type}
                            onChange={handleChange}
                        >
                            <option value=""> Identity card or Passport </option>
                            <option value="Identity card"> Identity card </option>
                            <option value="Passport"> Passport</option>
                        </select>
                        <input
                            type='text'
                            name='identity_no'
                            placeholder='Enter your identity card or passport'
                            value={guestData.identity_no} 
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className='update-guest'>
                    <button type='submit'>Update</button>
                </div>
            </form>
        </div>
    );
};

export default GuestEdit;
