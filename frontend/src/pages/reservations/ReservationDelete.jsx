import React from 'react';
import '../../components/styles/ReservationDelete.css';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const ReservationDelete = ({ show, onClose, onDelete }) => {
  if (!show) {
    return null;
  }

  const handleDelete = () => {
    // Call the onDelete function passed from parent
    onDelete();
    // Refresh the page
    window.location.reload();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <InfoOutlinedIcon />
        <p>Are you sure you want to delete this item?</p>
        <button className="btn-secondary" onClick={onClose}>Cancel</button>
        <button className="btn-danger" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default ReservationDelete;
