import { Link } from "react-router-dom";
import "../styles.css";

const UserDashboard = () => {
  return (
    <div className="container">
      <h2>User Dashboard</h2>
      <p>Welcome! Here are disaster management resources:</p>

      <div className="dashboard-links">
        <Link to="/global-view">🌍 Global View (Weather & Disasters)</Link>
        <Link to="/disaster-updates">🚨 Disaster Updates & Map</Link>
        <Link to="/alerts">📢 Disaster Alerts</Link>
        <Link to="/evacuation">🚑 Evacuation Routes</Link>
        <Link to="/damage-assessment">📸 AI Damage Assessment</Link>
        <Link to="/sustainable-kits">🌱 Sustainable Disaster Kits</Link>
        <Link to="/waste-management">♻️ Waste Recycling & Environment</Link>
        <Link to="/eonet-map">🛰️ NASA EONET Live Map</Link> {/* New link added */}
      </div>

      <button
        className="logout-btn"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default UserDashboard;
