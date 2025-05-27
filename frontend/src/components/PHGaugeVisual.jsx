import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

function PHGaugeVisual({ value }) {
  const color = value < 6 ? "#EF4444" : value > 8 ? "#3B82F6" : "#10B981"; // acidic/red, basic/blue, neutral/green

  return (
    <div className="bg-white p-4 rounded shadow w-full md:w-1/3 flex flex-col items-center justify-center">
      <h3 className="text-lg font-semibold text-purple-700 mb-4">🧪 pH Level</h3>
      <div className="w-36">
        <CircularProgressbar
          value={value * 10}
          maxValue={140}
          text={`${value.toFixed(1)}`}
          styles={buildStyles({
            pathColor: color,
            textColor: "#1E293B",
            trailColor: "#E5E7EB"
          })}
        />
      </div>
      <p className="text-sm text-gray-500 mt-2">
        {value < 6 ? "Acidic" : value > 8 ? "Alkaline" : "Neutral"}
      </p>
    </div>
  );
}

export default PHGaugeVisual;
