// src/components/CropPredictor.jsx
import React, { useState, useEffect } from "react";
import { getContract } from "../utils/ethers";


const CROP_TIMER_KEY = "lastPaidCropAt";
const ACCESS_WINDOW = 60;

const CropPredictor = () => {
  const [formData, setFormData] = useState({
    temperature: "", humidity: "", moisture: "", ph: "",
    N: "", P: "", K: "", rainfall: ""
  });

  const [predictedCrop, setPredictedCrop] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [remainingTime, setRemainingTime] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateTimer = () => {
    const lastPaid = localStorage.getItem(CROP_TIMER_KEY);
    if (lastPaid) {
      const elapsed = Math.floor(Date.now() / 1000) - parseInt(lastPaid);
      const remaining = Math.max(0, ACCESS_WINDOW - elapsed);
      setRemainingTime(remaining);
    }
  };

  useEffect(() => {
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handlePredict = async () => {
    setLoading(true);
    setError("");
    setPredictedCrop("");

    try {
      const contract = await getContract();
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      const user = accounts[0];

      const lastPaid = localStorage.getItem(CROP_TIMER_KEY);
      const isFree = lastPaid && (Math.floor(Date.now() / 1000) - parseInt(lastPaid) < ACCESS_WINDOW);
      // const isFree = await contract.canPredictCrop(user);

      if (!isFree) {
        const fee = await contract.predictionFee();
        const tx = await contract.payForPrediction({ value: fee });
        await tx.wait();
        localStorage.setItem(CROP_TIMER_KEY, Math.floor(Date.now() / 1000).toString());
      }

      const response = await fetch("http://backend:8000/predict_crop/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          temperature: parseFloat(formData.temperature),
          humidity: parseFloat(formData.humidity),
          moisture: parseFloat(formData.moisture),
          ph: parseFloat(formData.ph),
          rainfall: parseFloat(formData.rainfall),
          N: parseInt(formData.N),
          P: parseInt(formData.P),
          K: parseInt(formData.K)
        }),
      });

      const data = await response.json();
      console.log("API Response:", data)

      if (data.predicted_crop) {
        setPredictedCrop(data.predicted_crop);
      
        // Call smart contract to store prediction info in the block
        try {
          const tx2 = await contract.storePrediction(
            "crop",
            JSON.stringify(formData),
            data.predicted_crop
          );
          await tx2.wait();
          console.log("Stored on-chain successfully.");
        } catch (err) {
          console.error("Failed to store on-chain:", err);
        }
      
      } else {
        setError("Prediction failed.");
      }
    } catch (err) {
      setError("Something went wrong: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-green-800">🌾 Predict Best Crop</h2>

      <div className="grid grid-cols-2 gap-4">
        {["temperature", "humidity", "moisture", "ph", "rainfall", "N", "P", "K"].map((field) => (
          <input key={field} name={field} type="number"
            placeholder={field.toUpperCase()} value={formData[field]} onChange={handleChange}
            className="p-2 border border-gray-300 rounded" />
        ))}
      </div>

      <button onClick={handlePredict}
        className="mt-4 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition"
        disabled={loading}>
        {loading ? "Processing..." : "Predict Crop"}
      </button>

      {remainingTime > 0 && (
        <div className="text-sm mt-2 text-green-600">Access valid for {remainingTime}s</div>
      )}

      {predictedCrop && (
        <div className="mt-4 text-xl text-green-800 font-bold">
          Recommended Crop: 🌱 {predictedCrop.toUpperCase()}
        </div>
      )}

      {error && (
        <div className="mt-2 text-red-600 text-sm font-medium">{error}</div>
      )}
    </div>
  );
};

export default CropPredictor;