🚛 EcoTrack Pro: Logistics Intelligence & ESG Engine

EcoTrack Pro is a high-performance logistics monitoring dashboard designed for the modern supply chain. It provides real-time tracking of fleet operations while ensuring LKSG (German Supply Chain Act) compliance through automated CO2 calculation and audit trails.

Project structure:

ECOTRACK/
├── 📂 backend/  
│ ├── 📂 config/
│ │ └── 📄 db.js # MongoDB Connection logic
│ ├── 📂 controllers/
│ │ └── 📄 shipmentController.js
│ ├── 📂 models/
│ │ └── 📄 Shipment.js # Mongoose Schema
│ ├── 📂 routes/
│ │ └── 📄 shipmentRoutes.js
│ ├── 📄 .env # Environment variables (DB URI, Port)
│ ├── 📄 package.json
│ └── 📄 server.js # Entry point for backend
│
├── 📂 frontend/ # React Application
│ ├── 📂 node_modules/
│ ├── 📂 public/
│ │ └── 📄 index.html
│ ├── 📂 src/
│ │ ├── 📂 components/ # Reusable UI Logic
│ │ │ ├── 📄 AddShipmentForm.js
│ │ │ ├── 📄 ComplianceModal.js
│ │ │ ├── 📄 ErrorBoundary.js
│ │ │ ├── 📄 HistoryTable.js
│ │ │ ├── 📄 Sidebar.js
│ │ │ └── 📄 SkeletonCard.js
│ │ ├── 📂 hooks/ # Custom Logic
│ │ │ └── 📄 useLiveTracking.js
│ │ ├── 📂 pages/ # Main View Containers
│ │ │ ├── 📄 Analytics.js # CO2 Analytics View
│ │ │ ├── 📄 Compliance.js# LKSG Compliance View
│ │ │ ├── 📄 Dashboard.js # Logistics Intelligence View
│ │ │ └── 📄 Fleet.js # Fleet Operations (Map) View
│ │ ├── 📂 utils/ # Helper functions
│ │ ├── 📄 App.js # Main App Logic & Routing
│ │ ├── 📄 App.css # Global Styling
│ │ ├── 📄 index.js # React Entry Point
│ │ ├── 📄 translations.js # Multi-language support (EN/DE)
│ │ └── 📄 index.css # Tailwind & Global styles
│ ├── 📄 package.json # Frontend dependencies
│ ├── 📄 postcss.config.js # Tailwind configuration
│ ├── 📄 tailwind.config.js
│ └── 📄 README.md # Project Documentation
└── 📄 package-lock.json

🚀 Key Features:

1. Logistics Intelligence Dashboard
   Dynamic Entry: Input shipment weight and distance to calculate carbon footprints instantly.
   Live KPI Tracking: Real-time monitoring of Cumulative CO2, Total Distance, and System Fuel levels.Defensive UI: Integrated form validation prevents "junk data" entries.
2. Fleet Operations (Live Telemetry):
   Geospatial Tracking: Interactive map visualization showing fleet distribution.
   Telemetry Stream: Real-time sidebar feed showing fuel levels and shipment status for every active unit.
3. ESG & LKSG Compliance:
   Certified Audit Trail: A searchable, persistent log of every shipment.
   Official Export: Generate professional PDF ESG reports using jsPDF for stakeholder audits.Persistence: State is managed via LocalStorage, ensuring data remains intact even after browser refreshes.
4. Tactical UI/UX:
   Tactical Dark Mode: High-contrast, low-eye-strain interface.
   Fluid Transitions: Powered by Framer Motion for a "desktop application" feel.
   Error Resilience: Wrapped in React Error Boundaries to prevent total app crashes.

🛠️ Technical Stack
Framework - React 18+ (Functional Components)
Styling - Tailwind CSS (Utility-first CSS)
Icons - Lucide-React
Animations - Framer Motion
PDF Generation - jsPDF & jsPDF-autotable
Maps - Leaflet & React-Leaflet
State Management - React Hooks (useState, useEffect) + LocalStorage

📦 Dependencies:
To run this project locally, ensure the following are installed:

npm install lucide-react jspdf jspdf-autotable framer-motion leaflet react-leaflet

⚙️ Installation & Setup:
Clone the repository:git clone https://github.com/yourusername/ecotrack-pro.git
Install dependencies:npm install
Launch the Development Server:npm start

🛡️ LKSG Compliance Logic:
The application adheres to the German Supply Chain Due Diligence Act (LKSG) by implementing:
Transparency: Every shipment is assigned a unique TRK-ID
Environmental Accountability: CO2 is calculated using the standard formula:Weight (kg) xDistance (km) x 0.12 = CO2oOutput
Data Integrity: State persistence ensures that no audit logs are lost during sessions.
