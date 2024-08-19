const Room = require('../models/Room');

exports.getAvailableRooms = async (req, res) => {
    const { checkIn, checkOut } = req.query;

    // Implement logic to check room availability based on dates
    // This is a placeholder; you'll need to replace it with actual logic
    const availableRooms = await Room.findAll({
        where: {
            isAvailable: true,
            // You would add more conditions here based on check-in and check-out
        },
    });

    res.json(availableRooms);
};
