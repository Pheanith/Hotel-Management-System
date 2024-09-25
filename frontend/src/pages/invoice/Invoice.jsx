import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import '../../components/styles/invoice/Invoice.css';

const Invoice = () => {
    const location = useLocation();
    const reservation = location.state;

    const invoiceRef = useRef();

    // Calculate number of nights
    const checkinDate = new Date(reservation.checkin_date);
    const checkoutDate = new Date(reservation.checkout_date);
    const numberOfNights = (checkoutDate - checkinDate) / (1000 * 60 * 60 * 24);

    // Function to download PDF
    const downloadInvoiceAsPDF = () => {
        const input = invoiceRef.current; // Get the reference to the invoice div
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
    
            // A4 page dimensions in mm with margins
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const margin = 10; // Set a margin of 10mm
            const contentWidth = pdfWidth - 2 * margin; // Width available for content
            const contentHeight = pdfHeight - 2 * margin; // Height available for content
    
            // Get the width and height of the canvas
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
    
            // Calculate scale to fit the image in the PDF with margins
            const widthRatio = contentWidth / canvasWidth;
            const heightRatio = contentHeight / canvasHeight;
            const scale = Math.min(widthRatio, heightRatio); // Use the smaller ratio to maintain aspect ratio
    
            // Calculate the new dimensions
            const newWidth = canvasWidth * scale;
            const newHeight = canvasHeight * scale;
    
            // Calculate position to center the image on the A4 page with margins
            const xOffset = margin + (contentWidth - newWidth) / 2;
            const yOffset = margin + (contentHeight - newHeight) / 2;
    
            // Set a background (optional)
            pdf.setFillColor(255, 255, 255); // White background
            pdf.rect(0, 0, pdfWidth, pdfHeight, 'F'); // Fill the entire page with the background color
    
            // Add the image to the PDF at the calculated position
            pdf.addImage(imgData, 'PNG', xOffset, yOffset, newWidth, newHeight);
            pdf.save(`invoice_${reservation.reservation_id}.pdf`);
        });
    };
    

    return (
        <div className="invoice-container">
            <div ref={invoiceRef}>
                <div className="invoice-header">
                    <h1>Invoice</h1>
                </div>
                <div className="invoice-infos">
                    <div className="hotel-info">
                        <p><strong>La Lune Hotel</strong></p>
                        <p>J610, Khan Toul Kok, Phnom Penh</p>
                        <p>(+855) 89 409 406</p>
                        <p>lalunehotel@gmail.com</p>
                    </div>
                    <div className="guest-info">
                        <p><strong>BILLED TO GUEST:</strong></p>
                        <p><strong>{`${reservation.firstName} ${reservation.lastName}`}</strong></p>
                        <p>{reservation.address || 'No address provided'}</p>
                        <p>{reservation.phoneNumber}</p>
                        <p>{reservation.email || 'No email provided'}</p>
                    </div>
                </div>
                <hr />
                <div className="invoice-detail">
                    <div className="reservation-info">
                        <p><strong>Reservation ID:</strong> {reservation.reservation_id}</p>
                        <p><strong>Reservation Date:</strong> {new Date(reservation.reserve_date).toLocaleDateString()}</p>
                        <p><strong>Check-in Date:</strong> {checkinDate.toLocaleDateString()}</p>
                        <p><strong>Check-out Date:</strong> {checkoutDate.toLocaleDateString()}</p>
                        <p><strong>Number of nights:</strong> {numberOfNights} night(s)</p>
                        <p><strong>Number of rooms:</strong> {reservation.room_numbers.split(',').length}</p>
                    </div>
                    <div className="invoice-info">
                        <p><strong>Invoice ID:</strong> {reservation.reservation_id}</p>
                        <p><strong>Issue date:</strong> {new Date().toLocaleDateString()}</p>
                        <p><strong>Due date:</strong> {checkoutDate.toLocaleDateString()}</p>
                    </div>
                </div>
                <hr />
                <div className="invoice-items">
                    <table>
                        <thead>
                            <tr>
                                <th>ITEMS DESCRIPTION</th>
                                <th>QTY</th>
                                <th>UNIT PRICE</th>
                                <th>TOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservation.room_type_names.split(',').map((roomType, index) => (
                                <tr key={index}>
                                    <td>{roomType}</td>
                                    <td>1</td>
                                    <td>${reservation.totalAmount / reservation.room_type_names.split(',').length}</td>
                                    <td>${reservation.totalAmount / reservation.room_type_names.split(',').length}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="invoice-total">
                    <p><strong>Sub total:</strong> ${reservation.totalAmount}</p>
                    <p><strong>Discount:</strong> {reservation.discount}%</p>
                    <hr />
                    <p><strong>Total after discount:</strong> ${reservation.totalAfterDiscount}</p>
                    <p><strong>Paid:</strong> ${reservation.totalAfterDiscount}</p>
                </div>
                <div className="invoice-footer">
                    <hr />
                    <h2>THANK YOU FOR YOUR BUSINESS</h2>
                    <p>We look forward to your next visit.</p>
                </div>
            </div>

            {/* Download PDF button */}
            <button onClick={downloadInvoiceAsPDF}>Download Invoice as PDF</button>
        </div>
    );
};

export default Invoice;
