const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // Professional logging

// Professional Route Organization
app.use('/api/shipments', require('./routes/shipmentRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Industrial Server Active on Port ${PORT}`));