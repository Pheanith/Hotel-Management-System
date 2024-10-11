// controllers/dashboardController.js
import db from '../utils/db.js'; // Ensure you use .js if applicable

export const getDashboardData = async (req, res) => {
  try {
    // Define SQL queries
    const totalReservationsQuery = 'SELECT COUNT(*) AS total FROM reservations';
    const totalRevenueQuery = `
      SELECT SUM(r.price_per_night) AS totalRevenue 
      FROM reservation_details AS rd
      JOIN reservations AS res ON rd.reservation_id = res.reservation_id
      JOIN rooms AS r ON rd.room_id = r.room_id;
    `;
    const totalAvailableRoomsQuery = 'SELECT COUNT(*) AS total FROM rooms WHERE availability_status = "Available"';
    const totalOccupiedRoomsQuery = 'SELECT COUNT(*) AS total FROM rooms WHERE availability_status = "Occupied"';

    // Execute queries
    const [[totalReservations]] = await db.query(totalReservationsQuery);
    const [[totalRevenue]] = await db.query(totalRevenueQuery);
    const [[totalAvailableRooms]] = await db.query(totalAvailableRoomsQuery);
    const [[totalOccupiedRooms]] = await db.query(totalOccupiedRoomsQuery);

    // Send response with structured data
    res.json({
      totalReservations: totalReservations.total || 0,
      totalRevenue: totalRevenue.totalRevenue || 0,
      totalAvailableRooms: totalAvailableRooms.total || 0,
      totalOccupiedRooms: totalOccupiedRooms.total || 0,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
};
