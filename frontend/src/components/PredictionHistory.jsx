// src/components/PredictionHistory.jsx
import React, { useEffect, useState } from "react";
import { getContract } from "../utils/ethers";
import { format } from "date-fns";

const PredictionHistory = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPredictions = async () => {
    try {
      const contract = await getContract();
      const count = await contract.getPredictionCount();

      const all = [];
      for (let i = 0; i < count; i++) {
        const pred = await contract.predictions(i);
        all.push({
          user: pred.user,
          type: pred.predictionType,
          inputs: JSON.parse(pred.inputData),
          result: pred.predictionResult,
          timestamp: new Date(Number(pred.timestamp) * 1000),
        });
      }

      setPredictions(all.reverse()); // Show latest first
    } catch (err) {
      console.error("Error loading predictions:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPredictions();
  }, []);

  if (loading) return <div className="text-center py-8">⏳ Loading predictions...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold text-green-800 mb-4">🧾 Prediction History</h2>
      <table className="w-full border text-sm text-left">
        <thead className="bg-green-700 text-white">
          <tr>
            <th className="p-2">User</th>
            <th className="p-2">Type</th>
            <th className="p-2">Inputs</th>
            <th className="p-2">Result</th>
            <th className="p-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {predictions.map((p, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-50">
              <td className="p-2 truncate">{p.user}</td>
              <td className="p-2 capitalize">{p.type}</td>
              <td className="p-2 max-w-xs overflow-x-auto text-xs">
                <pre>{JSON.stringify(p.inputs, null, 2)}</pre>
              </td>
              <td className="p-2 font-semibold text-green-600">{p.result}</td>
              <td className="p-2">{format(p.timestamp, "yyyy-MM-dd HH:mm:ss")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PredictionHistory;
