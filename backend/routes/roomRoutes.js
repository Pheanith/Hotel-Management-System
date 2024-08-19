const express = require('express');
const router = express.Router();
const { getAvailableRooms } = require('../controllers/roomController');

router.get('/rooms', getAvailableRooms);

module.exports = router;
