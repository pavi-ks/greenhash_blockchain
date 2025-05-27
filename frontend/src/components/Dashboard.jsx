import React, { useEffect, useState } from "react";
import NPKLineGraph from "./NPKLineGraph";
import PHColorBar from "./PHColorBar";
import TemperatureBars from "./TemperatureBars";
import RainfallVisual from "./RainfallVisual";
import HumidityVisual from "./HumidityVisual";
import WaterLevelVisual from "./WaterLevelVisual";

function Dashboard() {
  const [fullData, setFullData] = useState([]);
  const [data, setData] = useState([]);
  const [pointer, setPointer] = useState(10);

  const MAX_WATER_LEVEL = 300;

  // 🔁 Fetch entire dataset once on load
  useEffect(() => {
    fetch("http://127.0.0.1:8000/realtime-data/")
      .then((res) => res.json())
      .then((json) => {
        setFullData(json);
        setData(json.slice(0, 10));
        setPointer(10);
      });
  }, []);

  // 🔄 Update every 5 seconds with next record
  useEffect(() => {
    const interval = setInterval(() => {
      if (fullData.length === 0) return;
      const next = fullData[pointer % fullData.length];
      setData((prev) => [...prev.slice(1), next]);
      setPointer((p) => p + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [fullData, pointer]);

  const latest = data[data.length - 1];

  // 💧 Calculate scaled water level
  const waterLevels = data.map((d) => {
    const ET = 0.6 * d.temperature + 0.2 * (100 - d.humidity);
    const actual = d.rainfall - ET;
    const capped = Math.max(0, Math.min(actual, MAX_WATER_LEVEL));
    const percent = ((capped / MAX_WATER_LEVEL) * 100).toFixed(1);
    return parseFloat(percent);
  });

  return (
    <div className="min-h-screen bg-green-50 px-4 md:px-10 py-4">
      {latest ? (
        <>
          {/* Summary Strip */}
          <div className="bg-green-700 text-white py-2 px-4 flex flex-col md:flex-row justify-between items-center text-sm font-medium rounded-t">
            <span>📊 Total Entries: {data.length}</span>
            <span className="mx-2">🌐 Backend Dataset Streaming</span>
            <span>
              🌾 Current Crop: <strong>{latest.label?.toUpperCase()}</strong>
            </span>
          </div>

          
          {/* NPK + pH */}
          <div className="flex flex-col md:flex-row gap-6 my-6">
            <NPKLineGraph data={data} />
            <PHColorBar data={data} />
          </div>

          {/* Rainfall */}
          <RainfallVisual data={data} />

          {/* Temperature and Badge */}
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <TemperatureBars data={data} />
          </div>


          {/* Water Level and Humidity */}
          <WaterLevelVisual levels={waterLevels} />
          <HumidityVisual data={data} />
        </>
      ) : (
        <div className="text-center text-slate-500 py-12 text-lg">
          ⏳ Waiting for real-time data stream...
        </div>
      )}
    </div>
  );
}

export default Dashboard;
