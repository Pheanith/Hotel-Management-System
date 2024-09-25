// controllers/invoiceController.js

import {getInvoiceByReservationId,
    getReservationById,
    createInvoice,
    getGuestById,
    getInvoiceById} from '../models/invoiceModel.js';

export const getInvoice = async (req, res) => {
  const reservationId = req.params.reservation_id;

  try {
    // Check if the invoice already exists
    let invoice = await getInvoiceByReservationId(reservationId);

    if (!invoice) {
      // Fetch reservation data
      const reservation = await getReservationById(reservationId);
      if (!reservation) {
        return res.status(404).json({ error: 'Reservation not found' });
      }

      // Fetch guest data
      const guest = await getGuestById(reservation.guest_id);
      if (!guest) {
        return res.status(404).json({ error: 'Guest not found' });
      }

      // Calculate total amount and discount
      const totalAmount = reservation.totalAmount;
      const discount = reservation.discount || 0;
      const guestId = reservation.guest_id;

      // Create a new invoice
      const invoiceId = await createInvoice(reservationId, guestId, totalAmount, discount);

      // Fetch the newly created invoice
      invoice = await getInvoiceById(invoiceId);
    }

    // Fetch related reservation and guest data
    const reservationData = await getReservationById(reservationId);
    const guestData = await getGuestById(invoice.guest_id);

    res.json({
      invoice,
      reservation: reservationData,
      guest: guestData,
    });
  } catch (error) {
    console.error('Error fetching invoice:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

