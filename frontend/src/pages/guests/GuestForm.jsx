//GuestForm.jsx
import React, {useState} from 'react';
import '../../components/styles/guest/GuestForm.css';
import { useNavigate } from 'react-router-dom';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import axios from 'axios';

const GuestForm = ({onclse}) =>{

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    // const [transaction, setTransaction] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedData = {
            firstName,
            lastName,
            phoneNumber,
            email,
            address, 
        };

        try{
            await axios.post('http://localhost:5000/api/guests', formattedData);
            navigate('/manage-guest');
        } catch (error) {
            console.error('Cannot add guest:', error.response ? error.response.data : error.message);
        }
    };

    const handleClose = () => navigate('/manage-guest');

    return (
        <div className='guestform-main'>
            <div className='guestform-header'>
                <h2> Create new guest </h2>
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
                    </div>
                    <div className='guest-row2'>
                        <input
                            type='email'
                            name='email'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
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
                    </div>
                </div>
                <div className='submit-guest'>
                    <button type='sumit'>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default GuestForm;