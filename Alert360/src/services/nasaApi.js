const API_KEY = "AYytjoWZCwBvEm3U9eRiOwpbw2LfLsFkkvFdMzYB";  // Replace with your NASA API key



export const fetchDisasterData = async () => {
  try {
    const response = await fetch(
      `https://eonet.gsfc.nasa.gov/api/v3/events?api_key=${API_KEY}`
    );

    if (!response.ok) throw new Error("Failed to fetch disaster data");

    const data = await response.json();
    return data.events || [];  // Ensure an empty array if no events exist
  } catch (error) {
    console.error("Error fetching NASA disaster data:", error);
    return [];
  }
};
