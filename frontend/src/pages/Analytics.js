import { BarChart3, Globe2, Leaf, Zap } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Analytics = ({ activeShipments = [], t }) => {
  // --- DATA PREP FOR CHART ---
  const chartData = [...activeShipments]
    .reverse() // Most recent first
    .slice(-6) // Only show last 6 to keep it clean
    .map((s) => ({
      name: s.product || "Unit",
      co2: parseFloat(s.co2 || 0),
    }));

  const totalCO2Tracked = activeShipments
    .reduce((acc, curr) => acc + parseFloat(curr.co2 || 0), 0)
    .toFixed(2);

  return (
    <div className="p-10 bg-[#0a0f18] min-h-screen text-white text-left">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-6xl font-black italic uppercase tracking-tighter mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">
            {t.analyticsTitle}
          </h1>
          <p className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.4em]">
            Proprietary Emission Tracking v4.2
          </p>
        </div>
      </div>

      {/* TOP STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <AnalyticsCard
          icon={<Globe2 className="text-blue-500" />}
          label={t.regionalImpact}
          value="EU-ZONE 01"
          sub={`${t.reduction}: 12.4%`}
        />
        <AnalyticsCard
          icon={<Zap className="text-yellow-500" />}
          label={t.gridEfficiency}
          value="98.2%"
          sub={`${t.optimization}: Active`}
        />
        <AnalyticsCard
          icon={<Leaf className="text-green-400" />}
          label={t.cumulativeFootprint}
          value={totalCO2Tracked}
          sub="Metric Tons CO2e"
        />
      </div>

      {/* --- NEW CHART SECTION --- */}
      <div className="bg-[#111827]/30 border border-white/5 rounded-[3rem] p-10 mb-12">
        <div className="flex items-center gap-3 mb-8">
          <BarChart3 className="text-blue-500 w-5 h-5" />
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-300">
            Emission Distribution Visualizer
          </h3>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1f2937"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                stroke="#475569"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#94a3b8" }}
              />
              <YAxis
                stroke="#475569"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `${val}kg`}
              />
              <Tooltip
                cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "16px",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              />
              <Bar dataKey="co2" radius={[6, 6, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index % 2 === 0 ? "#3b82f6" : "#10b981"}
                    fillOpacity={0.8}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CERTIFIED LOGS TABLE */}
      <div className="bg-[#111827]/30 border border-white/5 rounded-[3rem] p-12">
        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-300 mb-10">
          {t.certifiedLogs}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-4">
            <thead>
              <tr className="text-[11px] font-black uppercase text-slate-600 tracking-[0.3em]">
                <th className="px-8 pb-4">{t.trackingId}</th>
                <th className="px-8 pb-4">{t.cargo}</th>
                <th className="px-8 pb-4">{t.calculation}</th>
                <th className="px-8 pb-4 text-right">{t.certification}</th>
              </tr>
            </thead>
            <tbody>
              {activeShipments.map((ship, i) => (
                <tr
                  key={i}
                  className="bg-slate-900/40 hover:bg-slate-800/60 transition-all"
                >
                  <td className="px-8 py-6 rounded-l-[1.5rem] font-mono text-blue-500">
                    {ship.id}
                  </td>
                  <td className="px-8 py-6 font-black uppercase italic">
                    {ship.product}
                  </td>
                  <td className="px-8 py-6 font-black text-green-500">
                    {ship.co2} KG
                  </td>
                  <td className="px-8 py-6 rounded-r-[1.5rem] text-right">
                    <span className="text-[9px] font-black text-green-500 uppercase border border-green-500/20 px-3 py-1 rounded-full bg-green-500/5">
                      {t.verified}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const AnalyticsCard = ({ icon, label, value, sub }) => (
  <div className="bg-slate-900/40 border border-white/5 p-8 rounded-[2.5rem] group hover:border-blue-500/30 transition-all">
    <div className="mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <p className="text-[10px] font-black uppercase text-slate-500 mb-2 tracking-widest">
      {label}
    </p>
    <p className="text-4xl font-black italic tracking-tighter">{value}</p>
    <p className="mt-4 text-[10px] font-bold uppercase text-slate-400">{sub}</p>
  </div>
);

export default Analytics;
