import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  AlertTriangle,
  Download,
  FileText,
  History,
  Search,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

const Compliance = ({ activeShipments = [], t, sessionHash }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const entryCount = activeShipments.length;
  const totalCO2 = activeShipments.reduce(
    (sum, s) => sum + parseFloat(s.co2 || 0),
    0,
  );

  // Elite Logic: Multi-parameter search filter
  const filteredShipments = activeShipments.filter((shipment) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      shipment.id.toLowerCase().includes(searchLower) ||
      shipment.product.toLowerCase().includes(searchLower)
    );
  });

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.setTextColor(37, 99, 235);
    doc.text(`ECOTRACK PRO: ${t.compliance.toUpperCase()}`, 14, 20);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 28);
    doc.text(`Hash: ${sessionHash}`, 14, 34);

    autoTable(doc, {
      startY: 40,
      head: [["ID", t.productName, "CO2", "Status"]],
      body: filteredShipments.map((ship) => [
        ship.id,
        ship.product.toUpperCase(),
        `${ship.co2} KG`,
        t.verified.toUpperCase(),
      ]),
      theme: "striped",
      headStyles: { fillColor: [37, 99, 235] },
    });

    doc.save(`LKSG_Report_${sessionHash}.pdf`);
  };

  return (
    <div className="p-10 bg-[#0a0f18] min-h-screen text-white text-left animate-in fade-in duration-700 flex flex-col">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-white/5 pb-8 gap-6">
        <div>
          <h1 className="text-6xl font-black italic uppercase tracking-tighter text-white">
            {t.compliance}
          </h1>
          <p className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.4em] mt-2">
            Verified Transparency Engine // LKSG-DE
          </p>
        </div>
        <button
          onClick={handleDownload}
          disabled={filteredShipments.length === 0}
          className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all active:scale-95 shadow-2xl ${
            filteredShipments.length > 0
              ? "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20"
              : "bg-slate-800 text-slate-500 cursor-not-allowed"
          }`}
        >
          <Download size={18} />{" "}
          {searchTerm ? t.exportFiltered : t.exportReport}
        </button>
      </div>

      {/* TOP STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <ComplianceCard
          icon={<ShieldCheck className="text-green-500" size={32} />}
          label="Human Rights"
          status="Certified Safe"
          sub="Audit Cycle: March 2026"
        />
        <ComplianceCard
          icon={<FileText className="text-blue-500" size={32} />}
          label="Environmental"
          status={entryCount > 0 ? t.verified : "Pending"}
          sub={`${totalCO2.toLocaleString()} KG CO2 Tracked`}
        />
        <ComplianceCard
          icon={<AlertTriangle className="text-yellow-500" size={32} />}
          label="Risk Assessment"
          status="Tier 3 Pending"
          sub="Supplier Verification Required"
        />
      </div>

      {/* SEARCHABLE AUDIT TRAIL TABLE */}
      <div className="bg-[#111827]/40 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl mb-20">
        <div className="p-8 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <History size={20} className="text-slate-500" />
            <h2 className="font-black italic uppercase tracking-tight text-slate-300">
              {t.auditTrail}
            </h2>
          </div>

          <div className="relative w-full md:w-96">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              size={16}
            />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0d1421] border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-xs outline-none focus:border-blue-500 transition-all placeholder:text-slate-600"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#0d1421]/50 text-[10px] font-black uppercase text-slate-500 tracking-widest">
              <tr>
                <th className="px-8 py-5">ID</th>
                <th className="px-8 py-5">{t.productName}</th>
                <th className="px-8 py-5">Calculation</th>
                <th className="px-8 py-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-white/5">
              {filteredShipments.length > 0 ? (
                filteredShipments.map((shipment) => (
                  <tr
                    key={shipment.id}
                    className="hover:bg-blue-500/5 transition-colors group"
                  >
                    {/* Elite Update: Monospace ID for system security look */}
                    <td className="px-8 py-6 font-mono text-[11px] text-blue-500 font-bold tracking-tighter">
                      {shipment.id}
                    </td>
                    <td className="px-8 py-6 font-bold italic uppercase group-hover:text-blue-400">
                      {shipment.product}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-green-500">
                          {shipment.co2} KG CO2
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {shipment.weight}kg • {shipment.distance}km
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <span className="bg-green-500/10 text-green-400 text-[10px] font-black px-3 py-1 rounded-lg border border-green-500/20 uppercase">
                        {t.verified}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-8 py-20 text-center text-slate-600 font-mono text-xs uppercase tracking-widest"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <AlertTriangle className="text-slate-800" size={24} />
                      {entryCount === 0 ? t.noShipments : t.noMatches}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* TACTICAL LEGAL FOOTER */}
      <div className="mt-auto pt-10 pb-6 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 opacity-30 hover:opacity-100 transition-opacity duration-500">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <p className="text-[10px] font-mono tracking-tight max-w-md">
              {t.legalDisclaimer}
            </p>
            <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
              HASH: {sessionHash}
            </span>
          </div>

          <div className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
            {t.version} // {new Date().getFullYear()} © ECOTRACK LOGISTICS
          </div>
        </div>
      </div>
    </div>
  );
};

const ComplianceCard = ({ icon, label, status, sub }) => (
  <div className="bg-[#111827]/40 border border-white/5 p-8 rounded-[2.5rem] hover:border-blue-500/30 transition-all group">
    <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-sm font-black uppercase tracking-widest text-slate-500">
      {label}
    </h3>
    <p className="text-2xl font-bold italic uppercase mt-1">{status}</p>
    <p className="text-[10px] font-mono text-slate-500 mt-2">{sub}</p>
  </div>
);

export default Compliance;
