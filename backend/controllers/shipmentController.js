const axios = require('axios');
const Shipment = require('../models/Shipment');

exports.calculateCarbon = async (req, res) => {
    const { productName, weight, distance, transport_method } = req.body;

    try {
        let carbonAmount;

        // CHECK: If API Key is mock or site is down, use math formula
        if (process.env.CARBON_API_KEY === 'mock_key_12345' || !process.env.CARBON_API_KEY) {
            // SCIENTIFIC FALLBACK: (Weight in Tons) * (Distance) * (0.16 emission factor)
            carbonAmount = ((weight / 1000) * distance * 0.16).toFixed(2);
            console.log("⚠️ Using Local Fallback Calculation");
        } else {
            // REAL API CALL
            const response = await axios.post(
                'https://www.carboninterface.com/api/v1/estimates',
                {
                    "type": "shipping",
                    "weight_value": weight,
                    "weight_unit": "kg",
                    "distance_value": distance,
                    "distance_unit": "km",
                    "transport_method": transport_method || "truck"
                },
                {
                    headers: { 
                        'Authorization': `Bearer ${process.env.CARBON_API_KEY}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            carbonAmount = response.data.data.attributes.carbon_kg;
        }

        // Save to Database
        const newShipment = new Shipment({
            productName,
            weight,
            distance,
            carbonFootprint: carbonAmount,
            status: 'Verified'
        });

        await newShipment.save();
        res.status(201).json(newShipment);

    } catch (error) {
        console.error("Critical Error:", error.message);
        // Fallback even in the catch block so the user sees a result
        const fallbackAmount = ((weight / 1000) * distance * 0.16).toFixed(2);
        res.status(201).json({ 
            productName, 
            carbonFootprint: fallbackAmount, 
            status: "Estimated (Offline)" 
        });
    }
};

exports.getHistory = async (req, res) => {
    try {
        const history = await Shipment.find().sort({ createdAt: -1 });
        res.json(history);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};