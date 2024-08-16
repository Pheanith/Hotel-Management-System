import React , {useState} from "react";
import '../../components/styles/guest/GuestTable.css';
import GuestDelete from './GuestDelete';
import Guest from "./Guest";

const guests = [
    { guestName: 'Nou Sopheanith', phoneNumber: '089 409 406', balance: '100$', reservation: 'Make quick reservation', transaction: ''}
];

const GuestTable = () =>{
    const [showModal, setShowModal] = useState (false);
    const [selectedGuest, setSelectedGuest] = useState (null);

    const handleDeleteClick = (guest) => {
        setSelectedGuest (guest);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal (false);
        setSelectedGuest (null);
    };

    const handleDelete = () =>{
        console.log ("Deleted guest: ", selectedGuest);
        setShowModal(false);
        setSelectedGuest(null);
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
                    {guests.map((guests, index) =>(
                        <tr key = {index}>
                            <td> {guests.guestName}</td>
                            <td> {guests.phoneNumber}</td>
                            <td> {guests.balance} </td>
                            <td className="reservation"> {guests. reservation} </td>
                            <td>
                                <span className="edit-icon" role="img" aria-label="edit">✏️</span>
                                <span className="delete-icon" role="img" aria-label="delete" onClick={() => handleDeleteClick(guests)}>🗑️</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showModal && (
                <GuestDelete show = {showModal} onclose = {handleClose} onDelete = {handleDelete} />
            )}
        </div>
    );
};

export default GuestTable;