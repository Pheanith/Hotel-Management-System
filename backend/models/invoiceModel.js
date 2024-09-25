import db from '../utils/db.js';  // Ensure db is properly imported and setup

// Fetch invoice by reservation_id
export const getInvoiceByReservationId = async (reservationId) => {
  const [invoiceRows] = await db.query('SELECT * FROM invoices WHERE reservation_id = ?', [reservationId]);
  return invoiceRows.length > 0 ? invoiceRows[0] : null;
};

// Fetch reservation by reservation_id
export const getReservationById = async (reservationId) => {
  const [reservationRows] = await db.query('SELECT * FROM reservations WHERE reservation_id = ?', [reservationId]);
  return reservationRows.length > 0 ? reservationRows[0] : null;
};

// Fetch guest by guest_id
export const getGuestById = async (guestId) => {
  const [guestRows] = await db.query('SELECT * FROM guests WHERE guest_id = ?', [guestId]);
  return guestRows.length > 0 ? guestRows[0] : null;
};

// Create a new invoice
export const createInvoice = async (reservationId, guestId, totalAmount, discount) => {
  const [result] = await db.query(
    'INSERT INTO invoices (reservation_id, guest_id, total_amount, discount) VALUES (?, ?, ?, ?)',
    [reservationId, guestId, totalAmount, discount]
  );
  return result.insertId;
};

// Fetch invoice by invoice_id
export const getInvoiceById = async (invoiceId) => {
  const [newInvoiceRows] = await db.query('SELECT * FROM invoices WHERE invoice_id = ?', [invoiceId]);
  return newInvoiceRows.length > 0 ? newInvoiceRows[0] : null;
};
