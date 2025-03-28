import { useState, useRef } from "react";
// import * as tf from "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "../styles.css"; // CSS file for styling

const DamageAssessment = () => {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState("");
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      analyzeImage(imageUrl);
    }
  };

  const analyzeImage = async (imageUrl) => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = async () => {
      const model = await cocoSsd.load();
      const predictions = await model.detect(img);
      if (predictions.length > 0) {
        setPrediction(predictions[0].class + " (Confidence: " + Math.round(predictions[0].score * 100) + "%)");
      } else {
        setPrediction("No damage detected.");
      }
    };
  };

  return (
    <div className="container">
      <h2>📸 AI Damage Assessment</h2>
      <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} />
      {image && <img src={image} alt="Uploaded Preview" className="preview" />}
      {prediction && <p><strong>Prediction:</strong> {prediction}</p>}
    </div>
  );
};

export default DamageAssessment;
