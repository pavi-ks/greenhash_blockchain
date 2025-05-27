import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const TemperatureBars = ({ data }) => {
  const getBarColor = (temp) => {
    if (temp < 20) return "#FCA5A5"; // light red
    if (temp < 23) return "#F87171"; // medium red
    return "#DC2626"; // dark red
  };

  const latestCrop = data.length > 0 ? data[data.length - 1].label : "N/A";

  return (
    <div className="flex flex-col md:flex-row bg-red-50 p-6 rounded shadow w-full">
      {/* Temperature Graph */}
      <div className="w-full md:w-3/4">
        <h2 className="text-lg font-semibold text-red-700 mb-4 flex items-center gap-2">
          🌡️ Temperature Trend (°C)
        </h2>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
            <XAxis dataKey="label" tick={{ fontSize: 12 }} />
            <YAxis
              tick={{ fontSize: 12, fill: "#DC2626", fontWeight: 600 }}
              domain={[14, 28]}
              ticks={[14, 16, 18, 20, 22, 24, 26, 28]}
              tickLine={{ stroke: "#DC2626", strokeWidth: 1.5, length: 6 }}
              axisLine={{ stroke: "#DC2626", strokeWidth: 4 }}
              label={{
                value: "🌡️ Temperature (°C)",
                angle: -90,
                position: "insideLeft",
                offset: 10,
                fill: "#DC2626",
                fontSize: 14,
                fontWeight: 700,
              }}
            />
            <Tooltip
              formatter={(value) => [`${value.toFixed(1)} °C`, "Temperature"]}
              labelFormatter={(label) => `Crop: ${label}`}
            />
            <Bar dataKey="temperature" radius={[6, 6, 0, 0]} barSize={24}>
              {data.map((entry, index) => (
                <Cell key={index} fill={getBarColor(entry.temperature)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Crop Badge Section */}
      <div className="w-full md:w-1/4 flex flex-col items-center justify-center text-green-800 bg-green-50 rounded ml-4 p-4 shadow">
        <h3 className="text-md font-semibold mb-1">
          🌱 Recommended Crop
        </h3>
        <div className="bg-white text-green-700 font-bold text-2xl px-6 py-2 rounded-full border border-green-500 shadow-md">
          {latestCrop.toUpperCase()}
        </div>
        <p className="text-xs text-center mt-2 text-green-600">
          Based on soil & climate readings
        </p>
      </div>
    </div>
  );
};

export default TemperatureBars;
