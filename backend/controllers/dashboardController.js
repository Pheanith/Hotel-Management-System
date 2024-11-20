import db from '../utils/db.js'; // Ensure you use .js if applicable

export const getDashboardData = async (req, res) => {
  try {
    // SQL queries for total reservations and available rooms
    const totalReservationsQuery = 'SELECT COUNT(*) AS total FROM reservations';
    const totalAvailableRoomsQuery = 'SELECT COUNT(*) AS total FROM rooms WHERE status = "Available"'; // Adjust if your status is different

    // Execute queries
    const [[totalReservations]] = await db.query(totalReservationsQuery);
    const [[totalAvailableRooms]] = await db.query(totalAvailableRoomsQuery);

    // Send the response with structured data
    res.json({
      totalReservations: totalReservations.total || 0,
      totalAvailableRooms: totalAvailableRooms.total || 0,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error); // Log the error to console
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
};
