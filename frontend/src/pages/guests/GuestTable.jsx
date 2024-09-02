import React, { useEffect, useState } from "react";
import '../../components/styles/guest/GuestTable.css';
import GuestDelete from './GuestDelete';
import { useNavigate } from "react-router-dom";
import axios from "axios";
// const guests = [
//     { guestName: 'Nou Sopheanith', phoneNumber: '089 409 406', balance: '100$', reservation: 'Make quick reservation', transaction: '' }
// ];

const GuestTable = () => {
    const [guests, setGuests] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedGuest, setSelectedGuest] = useState(null);
    const navigate = useNavigate();

    useEffect (() => {
        const getGuest = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/guests');
                setGuests(response.data);
            } catch (error) {
                console.error('Error fetching guests:', error);
            }
        };

        getGuest();
    }, []);

    const handleDeleteClick = (guest) => {
        setSelectedGuest(guest);
        setShowModal(true);
    };

    const handleEditClick = (guest) => {
        setSelectedGuest(guest);
        setShowEditModal(true);
    }

    const handleClose = () => {
        setShowModal(false);
        setSelectedGuest(null);
    };

    // const handleDelete = () => {
    //     console.log("Deleted guest: ", selectedGuest);
    //     setShowModal(false);
    //     setSelectedGuest(null);
    // };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/guests/${selectedGuest.id}`);
            setGuests(guests.filter(guest => guest.id !== selectedGuest.id));
            handleClose();
        } catch (error) {
            console.error('Error deleting guest:', error);
        }
    };

    const handleUpdate = (updateGuest) => {
        setGuests(prevGuests => 
            prevGuests.map(guest => 
                guest.id === updateGuest.id ? updateGuest : guest
            )
        );
        handleClose();
    };

    const handleReservationClick = (guest) => {
        navigate('/reserve', {
            state: {
                fromPage: 'manage-guest',
                guestInfo: guest // Passing guest details (optional)
            }
        });
    };

    return (
        <div className="guest-table-container">
            <table className="guest-table">
                <thead>
                    <tr>
                        <th> First Name </th>
                        <th> Last Name</th>
                        <th> Phone Number</th>
                        <th> Email </th>
                        <th> Balance </th>
                        <th> Reservation </th>
                        <th> Transaction</th>
                        <th> Other </th>
                    </tr>
                </thead>
                <tbody>
                    {guests.map((guest, index) => (
                        <tr key={index}>
                            <td>{guest.firstName}</td>
                            <td>{guest.lastName}</td>
                            <td>{guest.phoneNumber}</td>
                            <td>{guest.email}</td>
                            <td>{guest.balance}</td>
                            <td className="reservation" onClick={() => handleReservationClick(guest)}>
                                {guest.reservation}
                            </td>
                            <td> </td>
                            <td>
                                <span className="edit-icon" role="img" aria-label="edit">✏️</span>
                                <span className="delete-icon" role="img" aria-label="delete" onClick={() => handleDeleteClick(guest)}>🗑️</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showModal && (
                <GuestDelete show={showModal} onClose={handleClose} onDelete={handleDelete} />
            )}
        </div>
    );
};

export default GuestTable;
