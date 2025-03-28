import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDisasterData } from "../services/nasaApi";
import "../styles.css";

const DisasterDetails = () => {
  const { id } = useParams(); // Get disaster ID from URL
  const [disaster, setDisaster] = useState(null);

  useEffect(() => {
    const getDisaster = async () => {
      const data = await fetchDisasterData();
      console.log("Fetched Disasters:", data); // Debugging Log
      console.log("Current ID:", id); // Debugging Log

      const foundDisaster = data.find((d) => d.id.toString() === id);
      console.log("Found Disaster:", foundDisaster); // Debugging Log

      setDisaster(foundDisaster);
    };
    getDisaster();
  }, [id]);

  return (
    <div className="container">
      {disaster ? (
        <>
          <h2>{disaster.title}</h2>
          <p><strong>Category:</strong> {disaster.categories[0].title}</p>
          <p><strong>Source:</strong> <a href={disaster.sources[0].url} target="_blank" rel="noopener noreferrer">More Info</a></p>
          <p><strong>Location Type:</strong> {disaster.geometries[0].type}</p>
        </>
      ) : (
        <p>Loading disaster details...</p>
      )}
    </div>
  );
};

export default DisasterDetails;
