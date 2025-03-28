import { useEffect, useState } from "react";
import { fetchDisasterData } from "../services/nasaApi";
import DisasterMap from "../components/DisasterMap";
import "../styles.css";

const DisasterUpdates = () => {
  const [disasters, setDisasters] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const getDisasters = async () => {
      const data = await fetchDisasterData();
      setDisasters(data);
    };
    getDisasters();

    // Get User's Live Location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => setUserLocation({ lat: position.coords.latitude, lon: position.coords.longitude }),
        (error) => console.error("Error fetching location:", error)
      );
    }
  }, []);

  return (
    <div className="container">
      <h2>🌍 Real-Time Disaster Updates</h2>
      {disasters.length > 0 ? (
        <ul>
          {disasters.slice(0, 5).map((disaster, index) => (
            <li key={index}>
              <strong>{disaster.title}</strong> <br />
              <small>{disaster.categories[0].title}</small> <br />
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(
                  disaster.title + " NASA disaster"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Details
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading disaster data...</p>
      )}

      <h3>🌎 Interactive Disaster Map</h3>
      <DisasterMap disasters={disasters} userLocation={userLocation} />
    </div>
  );
};

export default DisasterUpdates;
