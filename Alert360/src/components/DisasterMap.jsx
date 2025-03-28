import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import "leaflet-routing-machine";

const API_KEY = "YOUR_OPENWEATHER_API_KEY"; // Replace with your OpenWeatherMap API key

const DisasterMap = ({ disasters, userLocation }) => {
  const [shelters, setShelters] = useState([]);
  const [weatherLayers, setWeatherLayers] = useState([]);

  useEffect(() => {
    fetchShelters();
    fetchWeatherData();
  }, []);

  // Fetch Nearby Shelters (Mock API or Google Places API)
  const fetchShelters = async () => {
    const mockShelters = [
      { id: 1, name: "Red Cross Shelter", lat: 37.7749, lon: -122.4194 },
      { id: 2, name: "Community Safe Zone", lat: 37.789, lon: -122.399 }
    ];
    setShelters(mockShelters);
  };

  // Fetch Live Weather Overlays (Storms, Floods, Fires)
  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=20&lon=0&appid=${API_KEY}`);
      setWeatherLayers([response.data]);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <MapContainer center={[20, 0]} zoom={3} style={{ height: "500px", width: "100%" }}>
      {/* Base Map */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* High-Risk Disaster Zones */}
      {disasters.map((disaster, index) => (
        disaster.geometries[0]?.coordinates && (
          <Circle
            key={index}
            center={[disaster.geometries[0].coordinates[1], disaster.geometries[0].coordinates[0]]}
            radius={50000} // 50km risk zone
            color="red"
            fillOpacity={0.3}
          >
            <Popup>{disaster.title}</Popup>
          </Circle>
        )
      ))}

      {/* Evacuation Routes (if user location available) */}
      {userLocation && <EvacuationRoute userLocation={userLocation} shelters={shelters} />}

      {/* Nearby Shelters */}
      {shelters.map((shelter) => (
        <Marker key={shelter.id} position={[shelter.lat, shelter.lon]}>
          <Popup>{shelter.name}</Popup>
        </Marker>
      ))}

      {/* Live Weather Data Overlay */}
      {weatherLayers.length > 0 && (
        <Marker position={[weatherLayers[0].coord.lat, weatherLayers[0].coord.lon]}>
          <Popup>Live Weather: {weatherLayers[0].weather[0].description}</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

// Evacuation Route Component (Uses Leaflet Routing)
const EvacuationRoute = ({ userLocation, shelters }) => {
  const map = useMap();

  useEffect(() => {
    if (!userLocation || shelters.length === 0) return;

    const routeControl = L.Routing.control({
      waypoints: [
        L.latLng(userLocation.lat, userLocation.lon),
        L.latLng(shelters[0].lat, shelters[0].lon) // Nearest shelter
      ],
      routeWhileDragging: true
    }).addTo(map);

    return () => map.removeControl(routeControl);
  }, [map, userLocation, shelters]);

  return null;
};

export default DisasterMap;
