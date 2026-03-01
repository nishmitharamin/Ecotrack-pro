import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for Leaflet icons
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
let DefaultIcon = L.icon({ iconUrl: markerIcon, shadowUrl: markerShadow, iconSize: [25, 41], iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;

function MapResizeFix() {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => { map.invalidateSize(); }, 400); 
    return () => clearTimeout(timer);
  }, [map]);
  return null;
}

const Fleet = ({ activeShipments = [], t = {}, onDelete }) => {
  const shipments = Array.isArray(activeShipments) ? activeShipments : [];

  return (
    <div className="p-10 bg-[#0a0f18] min-h-screen text-white animate-in fade-in duration-700">
      <div className="mb-8 text-left">
        <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-2 text-green-500">
          {t.fleetTitle || "FLEET OPERATIONS"}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
        {/* MAP SECTION */}
        <div className="lg:col-span-3 bg-[#111827]/40 border border-slate-800/60 rounded-[2.5rem] overflow-hidden relative shadow-2xl">
          <MapContainer center={[51.1657, 10.4515]} zoom={6} style={{ height: "100%", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapResizeFix />
            {shipments.map((s) => (
              s.lat && s.lng && (
                <Marker key={s.id} position={[s.lat, s.lng]}>
                  <Popup>
                    <div className="text-slate-900 p-1 font-sans">
                      <p className="font-black text-blue-600 text-xs">{s.id}</p>
                      <p className="font-bold uppercase text-[10px]">{s.product || s.productName}</p>
                    </div>
                  </Popup>
                </Marker>
              )
            ))}
          </MapContainer>
        </div>

        {/* TELEMETRY STREAM WITH DELETE BUTTON */}
        <div className="bg-[#111827]/40 border border-slate-800/60 rounded-[2.5rem] p-6 overflow-y-auto custom-scrollbar">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Live Telemetry
          </h3>
          
          <div className="space-y-4">
            {shipments.map((s) => (
              <div key={s.id} className="group bg-slate-900/60 border border-white/5 p-4 rounded-2xl hover:border-blue-500/40 transition-all text-left relative">
                
                {/* DELETE BUTTON - Appears on card hover */}
                <button 
                  onClick={() => onDelete(s.id)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-red-500/10 hover:bg-red-600 text-red-500 hover:text-white px-2 py-1 rounded text-[8px] font-bold transition-all"
                >
                  REMOVE
                </button>

                <div className="flex justify-between items-start mb-2">
                  <span className="font-mono text-[10px] text-blue-400">{s.id}</span>
                </div>
                <h4 className="font-black italic uppercase text-xs truncate pr-10">
                  {s.product || s.productName || "Standard Unit"}
                </h4>
                <div className="mt-3 grid grid-cols-2 gap-2 text-[9px] font-mono text-slate-500 uppercase">
                  <div>Fuel: {s.fuel || "100"}%</div>
                  <div className="text-right">CO2: {s.co2 || "0.00"}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fleet;