import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Import Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";
import Alerts from "./pages/Alerts";
import Evacuation from "./pages/Evacuation";
import DamageAssessment from "./pages/DamageAssessment";
import SustainableKits from "./pages/SustainableKits";
import WasteManagement from "./pages/WasteManagement";
import DisasterDetails from "./pages/DisasterDetails"; // For NASA API disaster details
import DisasterUpdates from "./pages/DisasterUpdates"; 
import GlobalView from "./pages/GlobalView";
import EONETMap from "./pages/EONETMap"; // Import EONETMap

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* User Dashboard Routes */}
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/evacuation" element={<Evacuation />} />
        <Route path="/damage-assessment" element={<DamageAssessment />} />
        <Route path="/sustainable-kits" element={<SustainableKits />} />
        <Route path="/waste-management" element={<WasteManagement />} />
        
        {/* NASA API Disaster Details Route */}
        <Route path="/disaster/:id" element={<DisasterDetails />} />

        {/* NASA EONET Map Route */}
        <Route path="/eonet-map" element={<EONETMap />} /> 

        {/* Catch-All Route (Redirects unknown routes to Home) */}
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/disaster-updates" element={<DisasterUpdates />} />
        <Route path="/global-view" element={<GlobalView />} />
      </Routes>
    </Router>
  );
}

export default App;
