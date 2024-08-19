const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Room = sequelize.define('Room', {
    roomNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    roomType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isAvailable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
});

module.exports = Room;
