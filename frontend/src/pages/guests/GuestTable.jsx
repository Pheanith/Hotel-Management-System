//GuestTable.jsx
import React, { useEffect, useState } from "react";
import '../../components/styles/guest/GuestTable.css';
import GuestDelete from './GuestDelete';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GuestEdit from "./GuestEdit";

const GuestTable = () => {
    const [guests, setGuests] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedGuest, setSelectedGuest] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
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
    };

    const handleClose = () => {
        setShowModal(false);
        setShowEditModal(false);  // Close the edit modal as well
        setSelectedGuest(null);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/guests/${selectedGuest.id}`);
            setGuests(guests.filter(guest => guest.id !== selectedGuest.id));
            handleClose();
        } catch (error) {
            console.error('Error deleting guest:', error);
        }
    };

    const handleUpdate = (updatedGuest) => {
        setGuests(prevGuests => 
            prevGuests.map(guest => 
                guest.id === updatedGuest.id ? updatedGuest : guest
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

    const handleTransactionClick = (guest) => {
        navigate ('/transaction', {
            state: {
                fromPage: 'manage-guest',
            }
        });
    }

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
                                Make quick reservation
                            </td>
                            <td className="transaction" onClick={() => handleTransactionClick(guest)}> 
                                See all transaction
                            </td>
                            <td>
                                <span className="edit-icon" role="img" aria-label="edit" onClick={() => handleEditClick(guest)}>✏️</span>
                                <span className="delete-icon" role="img" aria-label="delete" onClick={() => handleDeleteClick(guest)}>🗑️</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showModal && (
                <GuestDelete show={showModal} onClose={handleClose} onDelete={handleDelete} />
            )}
            {showEditModal && (
                <GuestEdit 
                    show={showEditModal} 
                    guest={selectedGuest} 
                    onClose={handleClose} 
                    onUpdate={handleUpdate} 
                />
            )}
        </div>
    );
};

export default GuestTable;
