import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon, Tooltip } from "react-leaflet";
import L from "leaflet";

// ✅ Professional Fire Icon (Minimalist)
const fireIcon = new L.Icon({
  iconUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Fire_icon.svg",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const EONETMap = () => {
  const [disasters, setDisasters] = useState([]);

  useEffect(() => {
    fetch("https://eonet.gsfc.nasa.gov/api/v3/events")
      .then((res) => res.json())
      .then((data) => {
        const filteredEvents = data.events
          .map((event) => {
            if (event.geometries?.length > 0) {
              const lastGeo = event.geometries[event.geometries.length - 1];

              if (lastGeo.type === "Point" && lastGeo.coordinates?.length === 2) {
                const [lon, lat] = lastGeo.coordinates;
                return { title: event.title, type: "Point", coordinates: [lat, lon] };
              } else if (lastGeo.type === "Polygon" && lastGeo.coordinates?.length > 0) {
                return {
                  title: event.title,
                  type: "Polygon",
                  coordinates: lastGeo.coordinates[0].map(([lon, lat]) => [lat, lon]),
                };
              } else {
                return null;
              }
            }
            return null;
          })
          .filter((event) => event !== null);

        setDisasters(filteredEvents);
      })
      .catch((error) => console.error("❌ Fetch Error:", error));
  }, []);

  // ✅ Manual Markers with Labels
  const manualMarkers = [
    { title: "Ethiopia Wildfire", coordinates: [9.145, 40.4897] },
    { title: "Australia Wildfire", coordinates: [-25.2744, 133.7751] },
    { title: "Venezuela Wildfire", coordinates: [6.4238, -66.5897] },
  ];

  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: "100vh", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />

      {/* 🔥 Render Polygon Disasters (Fiery Effect) */}
      {disasters
        .filter((d) => d.type === "Polygon")
        .map((disaster, index) => (
          <Polygon
            key={index}
            positions={disaster.coordinates}
            pathOptions={{
              color: "#ff4500", // Fire Orange
              fillColor: "#ff0000", // Deep Red Fire
              fillOpacity: 0.6, // Semi-Transparent Fire Effect
            }}
          />
        ))}

      {/* 🔥 Render Point Disasters with Labels */}
      {disasters
        .filter((d) => d.type === "Point")
        .map((disaster, index) => (
          <Marker key={index} position={disaster.coordinates} icon={fireIcon}>
            <Tooltip direction="top" offset={[0, -35]} opacity={1} permanent>
              <strong>{disaster.title}</strong>
            </Tooltip>
            <Popup>
              <strong>{disaster.title}</strong>
            </Popup>
          </Marker>
        ))}

      {/* ✅ Manual Markers with Labels */}
      {manualMarkers.map((marker, index) => (
        <Marker key={`manual-${index}`} position={marker.coordinates} icon={fireIcon}>
          <Tooltip direction="top" offset={[0, -35]} opacity={1} permanent>
            <strong>{marker.title}</strong>
          </Tooltip>
          <Popup>
            <strong>{marker.title}</strong>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default EONETMap;
