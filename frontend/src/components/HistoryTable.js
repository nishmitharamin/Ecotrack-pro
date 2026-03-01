const HistoryTable = ({ shipments }) => {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-800 text-slate-400 text-xs uppercase tracking-wider">
          <tr>
            <th className="p-4">Product</th>
            <th className="p-4">Weight</th>
            <th className="p-4">Distance</th>
            <th className="p-4 text-green-400">CO2 (kg)</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>
        <tbody className="text-slate-300 divide-y divide-slate-800">
          {shipments.map((s, i) => (
            <tr key={i} className="hover:bg-slate-800/50 transition-colors">
              <td className="p-4 font-medium text-white">{s.productName}</td>
              <td className="p-4">{s.weight} kg</td>
              <td className="p-4">{s.distance} km</td>
              <td className="p-4 font-mono text-green-400 font-bold">
                {s.carbonFootprint}
              </td>
              <td className="p-4 text-xs italic">{s.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
