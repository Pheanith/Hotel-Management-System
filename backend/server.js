const express = require('express');
const cors = require('cors');
const roomRoutes = require('./routes/roomRoutes');
const sequelize = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', roomRoutes);

const PORT = process.env.PORT || 5000;

// Sync models and start server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
