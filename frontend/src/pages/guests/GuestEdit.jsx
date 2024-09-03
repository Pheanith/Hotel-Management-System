//GuetEdit.jsx
import React, { useEffect, useState } from 'react';
import '../../components/styles/guest/GuestEdit.css';
// import { useNavigate } from 'react-router-dom';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import axios from 'axios';

const GuestEdit = ({ show, guest, onclose, onUpdate }) => {
    const [guestData , setGuestData] = useState ({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        address: ''
    });

    useEffect(() => {
        if (guest) {
            setGuestData({
                firstName: guest.firstName,
                lastName: guest.lastName,
                phoneNumber: guest.phoneNumber,
                email: guest.email,
                address: guest.address
            });
        }
    }, [guest]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setGuestData(prevState => ({ ...prevState, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formattdData = {
                ...guestData
            }
            await axios.put(`http://localhost:5000/api/guests/${guest.id}`, formattdData);
            onUpdate({...guest, ...formattdData});
            onclose();
        } catch (error) {
            console.error('Error updating guest:', error.response ? error.response.data : error.messange);
        }
    };
    return (
        <div className='guestEdit-main'>
            <div className='guestEdit-header'>
                <h2> Update guest </h2>
                <ClearOutlinedIcon onClick={onclose} className='close-icon' />
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
                    </div>
                    <div className='edit-guest-row2'>
                        <input
                            type='email'
                            name='email'
                            placeholder='Email'
                            value={guestData.email}
                            onChange={handleChange}
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
                    </div>
                </div>
                <div className='update-guest'>
                    <button type='sumit'>Update</button>
                </div>
            </form>
        </div>
    );
};

export default GuestEdit;