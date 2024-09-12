import React from 'react';

const InvoiceDetails = ({ invoice, onClose }) => {
  return (
    <div className="invoice-details">
      <h2>Invoice Details</h2>
      <p><strong>Invoice ID:</strong> {invoice.invoice_id}</p>
      <p><strong>Reservation ID:</strong> {invoice.reservation_id}</p>
      <p><strong>Guest ID:</strong> {invoice.guest_id}</p>
      <p><strong>Total Amount:</strong> ${invoice.total_amount}</p>
      <p><strong>Discount:</strong> ${invoice.discount}</p>
      <p><strong>Created At:</strong> {new Date(invoice.created_at).toLocaleString()}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default InvoiceDetails;
