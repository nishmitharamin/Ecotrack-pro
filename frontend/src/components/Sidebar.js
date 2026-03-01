import {
  BarChart3,
  Globe,
  LayoutDashboard,
  Power,
  Settings2,
  ShieldCheck,
  Truck,
} from "lucide-react";

const Sidebar = ({
  setPage,
  currentPage,
  onReset,
  setTheme,
  currentTheme,
  lang,
  setLang,
  t,
}) => {
  const menuItems = [
    {
      id: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      label: t.dashboard,
    },
    { id: "Fleet Logistics", icon: <Truck size={18} />, label: t.fleet },
    { id: "CO2 Analytics", icon: <BarChart3 size={18} />, label: t.analytics },
    {
      id: "LKSG Compliance",
      icon: <ShieldCheck size={18} />,
      label: t.compliance,
    },
  ];

  return (
    <div className="w-72 h-full flex flex-col p-6 bg-slate-900 border-r border-white/5 shadow-2xl z-50">
      {/* BRANDING */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="bg-green-500 p-2 rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.3)]">
          <div className="text-black font-black text-xl italic">E</div>
        </div>
        <div>
          <h2 className="text-white font-black tracking-tighter text-lg leading-none">
            ECOTRACK
          </h2>
          <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest">
            Pro Edition
          </span>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setPage(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group ${
              currentPage === item.id
                ? "bg-green-500 text-black font-bold shadow-lg shadow-green-900/20"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <span
              className={
                currentPage === item.id
                  ? "text-black"
                  : "text-slate-500 group-hover:text-green-500 transition-colors"
              }
            >
              {item.icon}
            </span>
            <span className="text-[11px] uppercase tracking-widest font-black italic">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* FOOTER CONTROLS */}
      <div className="pt-6 border-t border-white/5 space-y-4">
        {/* LANGUAGE TOGGLE (The missing piece) */}
        <div className="flex items-center justify-between bg-black/40 p-2 rounded-xl border border-white/5">
          <div className="flex items-center gap-2 ml-2 text-slate-500">
            <Globe size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest">
              Lang
            </span>
          </div>
          <div className="flex bg-slate-800 rounded-lg p-1">
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1 rounded-md text-[10px] font-black transition-all ${
                lang === "en"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-500 hover:text-white"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("de")}
              className={`px-3 py-1 rounded-md text-[10px] font-black transition-all ${
                lang === "de"
                  ? "bg-red-600 text-white shadow-lg"
                  : "text-slate-500 hover:text-white"
              }`}
            >
              DE 🇩🇪
            </button>
          </div>
        </div>

        {/* THEME TOGGLE */}
        <button
          onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-white hover:bg-white/5 transition-all"
        >
          <Settings2 size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest">
            {currentTheme === "dark" ? "Light View" : "Standard View"}
          </span>
        </button>

        {/* RESET BUTTON */}
        <button
          onClick={onReset}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500/50 hover:text-red-500 hover:bg-red-500/5 transition-all"
        >
          <Power size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest">
            {t.reset}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
