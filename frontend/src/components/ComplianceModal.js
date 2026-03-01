import { ShieldCheck, X } from "lucide-react";

const ComplianceModal = ({ isOpen, onClose, co2Value }) => {
  if (!isOpen) return null;

  // Scientific calculation for German standards
  const isCompliant = co2Value < 500;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div
            className={`p-4 rounded-full mb-4 ${isCompliant ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}
          >
            <ShieldCheck size={48} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            LKSG Compliance Audit
          </h2>
          <p className="text-slate-400 text-sm mb-6">
            Evaluation based on German Supply Chain Due Diligence Act standards.
          </p>

          <div className="w-full bg-slate-950 rounded-xl p-4 mb-6 border border-slate-800">
            <div className="flex justify-between mb-2">
              <span className="text-slate-500 text-xs uppercase font-bold">
                Current Rating
              </span>
              <span
                className={`text-xs font-bold ${isCompliant ? "text-green-500" : "text-red-500"}`}
              >
                {isCompliant ? "APPROVED" : "CRITICAL"}
              </span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ${isCompliant ? "bg-green-500" : "bg-red-500"}`}
                style={{ width: `${Math.min((co2Value / 1000) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-slate-200 transition-all"
          >
            Download Official Certificate (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplianceModal;
