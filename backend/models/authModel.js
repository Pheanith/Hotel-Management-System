// models/authModel.js
import { DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize.js';  // Use the new sequelize connection

const Admin = sequelize.define('Admin', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('Admin', 'Simple Admin'),
        allowNull: false,
    },
}, {
    tableName: 'admin',
    timestamps: false
});

export default Admin;
