import { useEffect, useState } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Sidebar from "./components/Sidebar";
import Analytics from "./pages/Analytics";
import Compliance from "./pages/Compliance";
import Dashboard from "./pages/Dashboard";
import Fleet from "./pages/Fleet";
import { translations } from "./translations";

const SESSION_HASH = btoa(Math.random().toString()).substring(0, 12).toUpperCase();

function App() {
  const [page, setPage] = useState("Dashboard");
  const [lang, setLang] = useState("en");
  const [isSyncing, setIsSyncing] = useState(false);

  const [allShipments, setAllShipments] = useState(() => {
    try {
      const saved = localStorage.getItem("ecotrack_data");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [theme, setTheme] = useState(() => localStorage.getItem("ecotrack_theme") || "dark");
  const t = translations[lang];

  useEffect(() => {
    localStorage.setItem("ecotrack_data", JSON.stringify(allShipments));
  }, [allShipments]);

  useEffect(() => {
    localStorage.setItem("ecotrack_theme", theme);
  }, [theme]);

  const addNewShipment = async (data) => {
    setIsSyncing(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const newEntry = {
      ...data,
      id: `TRK-${Math.floor(Math.random() * 900 + 100)}`,
      lat: 48.2 + Math.random() * 6.5,
      lng: 6.5 + Math.random() * 8.0,
      status: "Moving",
      fuel: "100",
      timestamp: new Date().toISOString(),
    };

    setAllShipments((prev) => [newEntry, ...prev]);
    setIsSyncing(false);
  };

  // --- NEW DELETE FUNCTION ---
  const deleteShipment = (id) => {
    setAllShipments((prev) => prev.filter(s => s.id !== id));
  };

  const clearData = () => {
    if (window.confirm("CRITICAL: Wipe all local data?")) {
      setAllShipments([]);
      localStorage.removeItem("ecotrack_data");
    }
  };

  return (
    <div className={`flex h-screen transition-colors duration-500 ${theme === "dark" || theme === "tactical" ? "bg-slate-950" : "bg-slate-50"} text-white overflow-hidden font-sans`}>
      <Sidebar setPage={setPage} currentPage={page} onReset={clearData} setTheme={setTheme} currentTheme={theme} lang={lang} setLang={setLang} t={t} />

      <main className="flex-1 overflow-y-auto relative">
        {page === "Dashboard" && (
          <ErrorBoundary key="dashboard">
            <Dashboard onAdd={addNewShipment} t={t} isSyncing={isSyncing} />
          </ErrorBoundary>
        )}

        {page === "Fleet Logistics" && (
          <ErrorBoundary key="fleet">
            <Fleet 
              activeShipments={allShipments} 
              t={t} 
              onDelete={deleteShipment} // Passing delete function here
            />
          </ErrorBoundary>
        )}

        {page === "CO2 Analytics" && (
          <ErrorBoundary key="analytics">
            <Analytics activeShipments={allShipments} t={t} />
          </ErrorBoundary>
        )}

        {page === "LKSG Compliance" && (
          <ErrorBoundary key="compliance">
            <Compliance activeShipments={allShipments} t={t} sessionHash={SESSION_HASH} />
          </ErrorBoundary>
        )}
      </main>
    </div>
  );
}

export default App;