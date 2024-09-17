// utils/sequelize.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false,  // Disable logging if not needed
    }
);

sequelize.authenticate()
    .then(() => {
        console.log('Sequelize connected to MySQL database.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database via Sequelize:', err);
    });

export default sequelize;
