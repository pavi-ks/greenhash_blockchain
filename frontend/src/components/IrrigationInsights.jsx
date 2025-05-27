import React, { useState } from "react";

const recommendedLevels = {
  rice: 250,
  wheat: 180,
  maize: 200,
  barley: 190,
};

const IrrigationInsights = () => {
  const [inputs, setInputs] = useState({
    crop: "rice",
    temperature: "",
    humidity: "",
    rainfall: ""
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const calculate = () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const crop = inputs.crop.toLowerCase();
      const temp = parseFloat(inputs.temperature);
      const hum = parseFloat(inputs.humidity);
      const rain = parseFloat(inputs.rainfall);
      const recommended = recommendedLevels[crop] || 200;

      const evapotranspiration = (0.6 * temp) + (0.2 * (100 - hum));
      const current = rain - evapotranspiration;
      const difference = recommended - current;

      let remark = "Sufficient";
      if (difference > 10) remark = `Deficit of ${difference.toFixed(1)} mm`;
      else if (difference < -10) remark = `Excess of ${(-difference).toFixed(1)} mm`;

      setResult({
        current: current.toFixed(1),
        recommended,
        difference: difference.toFixed(1),
        remark,
        suggestion: `💧 Use drip irrigation for ${inputs.crop} to add ${difference > 0 ? difference.toFixed(1) : 0} mm water over next 2 days.`
      });
    } catch (err) {
      console.error("🔥 ERROR:", err);
      setError("Something went wrong while calculating.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-green-800 mb-6">💧 Irrigation Insights</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium">🌾 Crop</label>
          <select name="crop" value={inputs.crop} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="rice">Rice</option>
            <option value="wheat">Wheat</option>
            <option value="maize">Maize</option>
            <option value="barley">Barley</option>
          </select>
        </div>
        {["temperature", "humidity", "rainfall"].map((field, i) => (
          <div key={i}>
            <label className="block text-sm font-medium capitalize">
              {field} ({field === "temperature" ? "°C" : field === "humidity" ? "%" : "mm"})
            </label>
            <input
              type="number"
              name={field}
              value={inputs[field]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}
      </div>

      <button
        onClick={calculate}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        disabled={loading}
      >
        {loading ? "Calculating..." : "Generate Insights"}
      </button>

      {error && <div className="mt-4 text-red-600">{error}</div>}

      {result && (
        <div className="mt-6 bg-green-50 p-4 rounded shadow">
          <p>✅ <strong>Crop:</strong> {inputs.crop}</p>
          <p>💧 <strong>Recommended:</strong> {result.recommended} mm</p>
          <p>📏 <strong>Current Level:</strong> {result.current} mm</p>
          <p>⚠️ <strong>Status:</strong> {result.remark}</p>
          <p className="text-blue-700 font-medium mt-2">💡 {result.suggestion}</p>
        </div>
      )}
    </div>
  );
};

export default IrrigationInsights;
