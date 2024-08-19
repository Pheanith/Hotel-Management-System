import React, { useState } from "react";
import '../../components/styles/guest/GuestTable.css';
import GuestDelete from './GuestDelete';
import { useNavigate } from "react-router-dom";

const guests = [
    { guestName: 'Nou Sopheanith', phoneNumber: '089 409 406', balance: '100$', reservation: 'Make quick reservation', transaction: '' }
];

const GuestTable = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedGuest, setSelectedGuest] = useState(null);
    const navigate = useNavigate();

    const handleDeleteClick = (guest) => {
        setSelectedGuest(guest);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedGuest(null);
    };

    const handleDelete = () => {
        console.log("Deleted guest: ", selectedGuest);
        setShowModal(false);
        setSelectedGuest(null);
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
                        <th> Name </th>
                        <th> Phone Number</th>
                        <th> Balance </th>
                        <th> Reservation </th>
                        <th> Transaction</th>
                    </tr>
                </thead>
                <tbody>
                    {guests.map((guest, index) => (
                        <tr key={index}>
                            <td>{guest.guestName}</td>
                            <td>{guest.phoneNumber}</td>
                            <td>{guest.balance}</td>
                            <td className="reservation" onClick={() => handleReservationClick(guest)}>
                                {guest.reservation}
                            </td>
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
