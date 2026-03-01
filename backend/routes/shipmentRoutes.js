const express = require("express");
const router = express.Router();

// Import the functions from your shipmentController
// These must match the names you used in the controller file
const {
  calculateCarbon,
  getHistory,
} = require("../controllers/shipmentController");

/**
 * @route   POST /api/shipments/calculate
 * @desc    Submit shipment data to calculate CO2 (using API or Fallback math) and save to DB
 * @access  Public
 */
router.post("/calculate", calculateCarbon);

/**
 * @route   GET /api/shipments/history
 * @desc    Retrieve a list of all historical shipments sorted by the latest date
 * @access  Public
 */
router.get("/history", getHistory);

module.exports = router;

