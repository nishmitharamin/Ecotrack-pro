import { AlertCircle, Package, Zap } from "lucide-react";
import { useState } from "react";

const Dashboard = ({ onAdd, t }) => {
  const [formData, setFormData] = useState({
    name: "",
    weight: "",
    distance: "",
  });

  const [stats, setStats] = useState({
    liveCO2: "450.26",
    totalDist: "1200.05",
    fuel: "84.99",
  });

  // --- VALIDATION ---
  const hasName = formData.name.trim().length >= 2;
  const hasWeight = formData.weight !== "" && parseFloat(formData.weight) > 0;
  const hasDist = formData.distance !== "" && parseFloat(formData.distance) > 0;

  const canCalculate = hasName && hasWeight && hasDist;

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!canCalculate) return;

    const w = parseFloat(formData.weight);
    const d = parseFloat(formData.distance);
    const calculatedCO2 = (w * d * 0.12).toFixed(2);

    setStats((prev) => ({
      ...prev,
      liveCO2: calculatedCO2,
      totalDist: (parseFloat(prev.totalDist) + d).toFixed(2),
    }));

    onAdd({
      product: formData.name,
      weight: formData.weight,
      distance: formData.distance,
      co2: calculatedCO2,
    });

    setFormData({ name: "", weight: "", distance: "" });
  };

  return (
    <div className="p-10 bg-[#0a0f18] min-h-screen text-white text-left animate-in fade-in duration-700">
      <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-2">
        {t.dashboardTitle || "Logistics Intelligence"}
      </h1>
      <p className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.3em] mb-10">
        German Supply Chain Transparency (LKSG Compliant)
      </p>

      <div className="bg-[#111827]/40 border border-slate-800/60 rounded-[2.5rem] p-10 mb-8 shadow-2xl">
        <div className="flex items-center gap-3 mb-8">
          <Package className="text-blue-500" size={20} />
          <h3 className="text-sm font-black uppercase tracking-widest text-white">
            {t.newEntry}
          </h3>
        </div>

        <form
          onSubmit={handleCalculate}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end"
        >
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-slate-500 ml-1">
              {t.productName}
            </label>
            <input
              type="text"
              placeholder="e.g. Solar Panels"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full bg-[#0d1421] border border-slate-800 rounded-2xl px-6 py-4 text-sm outline-none focus:border-blue-500 transition-all"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-slate-500 ml-1">
              {t.weight}
            </label>
            <input
              type="number"
              value={formData.weight}
              onChange={(e) =>
                setFormData({ ...formData, weight: e.target.value })
              }
              className={`w-full bg-[#0d1421] border rounded-2xl px-6 py-4 text-sm outline-none transition-all ${
                formData.weight !== "" && !hasWeight
                  ? "border-red-500"
                  : "border-slate-800 focus:border-blue-500"
              }`}
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-slate-500 ml-1">
              {t.distance}
            </label>
            <input
              type="number"
              value={formData.distance}
              onChange={(e) =>
                setFormData({ ...formData, distance: e.target.value })
              }
              className={`w-full bg-[#0d1421] border rounded-2xl px-6 py-4 text-sm outline-none transition-all ${
                formData.distance !== "" && !hasDist
                  ? "border-red-500"
                  : "border-slate-800 focus:border-blue-500"
              }`}
            />
          </div>

          <button
            type="submit"
            disabled={!canCalculate}
            className={`font-black uppercase py-4 rounded-2xl flex items-center justify-center gap-3 text-[10px] tracking-widest transition-all duration-300 ${
              canCalculate
                ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/40 cursor-pointer active:scale-95"
                : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700 opacity-50"
            }`}
          >
            {canCalculate ? <Zap size={16} /> : <AlertCircle size={16} />}
            {canCalculate ? t.calculate : t.checkInputs}
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          label={t.liveCO2}
          value={stats.liveCO2}
          unit="KG"
          color="text-green-500"
        />
        <StatCard
          label={t.totalDist}
          value={stats.totalDist}
          unit="KM"
          color="text-blue-500"
        />
        <StatCard
          label={t.fuelLevel}
          value={stats.fuel}
          unit="%"
          color="text-yellow-500"
        />
        <div className="bg-[#111827]/40 border border-slate-800/60 p-8 rounded-[2rem]">
          <p className="text-[10px] font-black uppercase text-slate-500 mb-2 tracking-widest">
            {t.systemStatus}
          </p>
          <p className="text-3xl font-black text-green-400">{t.active}</p>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, unit, color }) => (
  <div className="bg-[#111827]/40 border border-slate-800/60 p-8 rounded-[2rem]">
    <p className="text-[10px] font-black uppercase text-slate-500 mb-2 tracking-widest">
      {label}
    </p>
    <p className={`text-3xl font-black ${color}`}>
      {value}{" "}
      <span className="text-sm opacity-50 font-bold text-white">{unit}</span>
    </p>
  </div>
);

export default Dashboard;