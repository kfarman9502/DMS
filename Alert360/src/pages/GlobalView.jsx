import GlobalWeather from "../components/GlobalWeather";
import "../styles.css";

const GlobalView = () => {
  return (
    <div className="container">
      <h2>🌍 Global Disaster & Weather View</h2>
      <p>Explore real-time weather conditions and active disasters worldwide.</p>
      <GlobalWeather />
    </div>
  );
};

export default GlobalView; // ✅ Ensure this is present
