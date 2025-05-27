import React from "react";

function getPHColor(value) {
  if (value < 6) return "#EF4444";      // red → acidic
  if (value > 8) return "#3B82F6";      // blue → alkaline
  return "#10B981";                     // green → neutral
}

function getPHLabel(value) {
  if (value < 6) return "Acidic";
  if (value > 8) return "Alkaline";
  return "Neutral";
}

function PHColorBar({ data }) {
  return (
    <div className="bg-purple-50 p-4 rounded shadow w-full md:w-1/3">
      <h3 className="text-lg font-semibold text-purple-800 mb-4 text-center">
        🧪 pH Levels
      </h3>

      <div className="flex justify-around items-end h-40">
        {data.map((reading, i) => {
          const color = getPHColor(reading.ph);
          const label = getPHLabel(reading.ph);

          return (
            <div key={i} className="flex flex-col items-center w-8 mx-1">
              <div className="text-xs font-medium text-slate-700 mb-1">
                {reading.ph.toFixed(1)}
              </div>

              {/* Vertical Strip */}
              <div
                className="w-full h-28 rounded-sm shadow"
                style={{ backgroundColor: color }}
              ></div>

              <div className="text-xs text-slate-600 mt-1">{label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PHColorBar;
