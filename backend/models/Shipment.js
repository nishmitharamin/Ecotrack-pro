const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
    productName: String,
    weight: Number,
    distance: Number,
    carbonFootprint: Number, // Ensure this matches!
    status: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Shipment', shipmentSchema);