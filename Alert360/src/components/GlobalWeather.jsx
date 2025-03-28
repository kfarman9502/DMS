import { useEffect, useRef, useState } from "react";
import Globe from "globe.gl";
import axios from "axios";

const NASA_API_KEY = "AYytjoWZCwBvEm3U9eRiOwpbw2LfLsFkkvFdMzYB";  // Replace with NASA API Key
const OPENWEATHER_API_KEY = "740b73c862aa2845beb1ecf23f14eec5"; // Replace with OpenWeather API Key

const GlobalWeather = () => {
  const globeRef = useRef(null);
  const [disasters, setDisasters] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!globeRef.current) {
      globeRef.current = Globe()(document.getElementById("globe"))
        .globeImageUrl("//unpkg.com/three-globe/example/img/earth-dark.jpg")
        .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
        .backgroundColor("#000");
    }

    fetchData();
  }, []);

  // Fetch both disasters & weather data
  const fetchData = async () => {
    try {
      setLoading(true);
      const [disastersRes, weatherRes] = await Promise.all([
        axios.get(`https://eonet.gsfc.nasa.gov/api/v3/events?api_key=${NASA_API_KEY}`),
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=20&lon=0&appid=${OPENWEATHER_API_KEY}`)
      ]);

      // Process NASA Disaster Data
      const disasterData = disastersRes.data.events.map(event => ({
        lat: event.geometries[0]?.coordinates[1] || 0,
        lng: event.geometries[0]?.coordinates[0] || 0,
        size: 3,
        color: "red",
        label: `🌋 ${event.title}`,
      }));

      setDisasters(disasterData);

      // Process Weather Data
      const weatherInfo = [
        {
          lat: 20, // Center point
          lng: 0,
          size: 3,
          color: "blue",
          label: `☁️ Weather: ${weatherRes.data.weather[0].description}`,
        },
      ];

      setWeatherData(weatherInfo);

      // Update Globe
      if (globeRef.current) {
        globeRef.current.pointsData([...disasterData, ...weatherInfo]).pointLabel("label");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="globe-container">
      {loading && <p style={{ color: "white", textAlign: "center" }}>Loading data...</p>}
      <div id="globe"></div>
    </div>
  );
};

export default GlobalWeather;
