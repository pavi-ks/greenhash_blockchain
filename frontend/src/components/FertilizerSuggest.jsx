// src/components/FertilizerSuggest.jsx
import React, { useEffect, useState } from "react";
import { getContract } from "../utils/ethers";

const FERT_TIMER_KEY = "lastPaidFertilizerAt";
const ACCESS_WINDOW = 60;

const FertilizerSuggest = () => {
  const [formData, setFormData] = useState({
    Temperature: "", Moisture: "", Rainfall: "", PH: "",
    Nitrogen: "", Phosphorous: "", Potassium: "", Carbon: "",
    Soil: "", Crop: ""
  });

  const [soilTypes, setSoilTypes] = useState([]);
  const [cropTypes, setCropTypes] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [predictionCount, setPredictionCount] = useState(null);
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/get_labels/")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setSoilTypes(data.soil_types);
          setCropTypes(data.crop_types);
        }
      });
  }, []);

  useEffect(() => {
    const updateTimer = () => {
      const lastPaid = localStorage.getItem(FERT_TIMER_KEY);
      if (lastPaid) {
        const elapsed = Math.floor(Date.now() / 1000) - parseInt(lastPaid);
        const remaining = Math.max(0, ACCESS_WINDOW - elapsed);
        setRemainingTime(remaining);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePredict = async () => {
    setLoading(true);
    setError("");
    setResult(null);
    setPredictionCount(null);

    try {
      const contract = await getContract();
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      const user = accounts[0];

      const lastPaid = localStorage.getItem(FERT_TIMER_KEY);
      const isFree = lastPaid && (Math.floor(Date.now() / 1000) - parseInt(lastPaid) < ACCESS_WINDOW);

      if (!isFree) {
        const fee = await contract.predictionFee();
        const tx = await contract.payForPrediction({ value: fee });
        await tx.wait();
        localStorage.setItem(FERT_TIMER_KEY, Math.floor(Date.now() / 1000).toString());
      }

      const response = await fetch("http://127.0.0.1:8000/predict_fertilizer/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.error) {
        setError("Prediction failed.");
      } else {
        setResult(data);
        const count = await contract.predictionsUsed(user);
        setPredictionCount(count.toString());
      }
    } catch (err) {
      setError("Something went wrong: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-green-800">Fertilizer Advisory</h2>

      <div className="grid grid-cols-2 gap-4">
        {["Temperature", "Moisture", "Rainfall", "PH", "Nitrogen", "Phosphorous", "Potassium", "Carbon"].map((field) => (
          <input key={field} name={field} type="number" step="any" placeholder={field}
            value={formData[field]} onChange={handleChange} className="p-2 border border-gray-300 rounded" />
        ))}
        <select name="Soil" value={formData.Soil} onChange={handleChange} className="p-2 border border-gray-300 rounded">
          <option value="">Select Soil Type</option>
          {soilTypes.map((soil, index) => (
            <option key={index} value={soil}>{soil}</option>
          ))}
        </select>
        <select name="Crop" value={formData.Crop} onChange={handleChange} className="p-2 border border-gray-300 rounded">
          <option value="">Select Crop</option>
          {cropTypes.map((crop, index) => (
            <option key={index} value={crop}>{crop}</option>
          ))}
        </select>
      </div>

      <button onClick={handlePredict}
        className="mt-4 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition"
        disabled={loading}>
        {loading ? "Predicting..." : "Predict Fertilizer"}
      </button>

      {remainingTime > 0 && (
        <div className="mt-2 text-sm text-green-600">
          Access valid for {remainingTime}s
        </div>
      )}

      {error && <div className="mt-4 text-red-600 font-medium">{error}</div>}

      {result && (
        <div className="mt-4 bg-green-50 p-4 rounded text-green-900">
          <p><strong>Recommended Fertilizer:</strong> {result.predicted_fertilizer}</p>
          {/* <p><strong>Reason:</strong> {result.remark}</p> */}

        </div>
      )}
    </div>
  );
};

export default FertilizerSuggest;
