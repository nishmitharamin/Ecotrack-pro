import axios from "axios";
import { Package, Send } from "lucide-react";
import { useState } from "react";

const AddShipmentForm = ({ onUploadSuccess }) => {
  const [formData, setFormData] = useState({
    productName: "",
    weight: "",
    distance: "",
    transport_method: "truck",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // This sends the data to your Node.js server on Port 5000
      await axios.post(
        "http://localhost:5000/api/shipments/calculate",
        formData,
      );
      alert("Shipment Calculated & Saved!");
      setFormData({
        productName: "",
        weight: "",
        distance: "",
        transport_method: "truck",
      });
      if (onUploadSuccess) onUploadSuccess(); // Refresh the list
    } catch (err) {
      console.error("Submission Error", err);
    }
  };

  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 mb-8">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <Package className="text-blue-400" /> New Shipment Entry
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <input
          className="bg-slate-950 border border-slate-700 p-2 rounded text-white"
          placeholder="Product Name"
          value={formData.productName}
          onChange={(e) =>
            setFormData({ ...formData, productName: e.target.value })
          }
          required
        />
        <input
          type="number"
          className="bg-slate-950 border border-slate-700 p-2 rounded text-white"
          placeholder="Weight (kg)"
          value={formData.weight}
          onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
          required
        />
        <input
          type="number"
          className="bg-slate-950 border border-slate-700 p-2 rounded text-white"
          placeholder="Distance (km)"
          value={formData.distance}
          onChange={(e) =>
            setFormData({ ...formData, distance: e.target.value })
          }
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2 transition-all"
        >
          <Send size={18} /> Calculate CO2
        </button>
      </form>
    </div>
  );
};

export default AddShipmentForm;
