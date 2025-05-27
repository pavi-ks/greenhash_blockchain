import React from "react";
import { motion } from "framer-motion";

function getRainColor(value) {
  if (value < 180) return "#93C5FD"; // Light Blue
  if (value < 210) return "#3B82F6"; // Normal Blue
  return "#1D4ED8";                  // Deep Blue
}

const Droplet = ({ delay = 0 }) => (
  <motion.div
    className="absolute top-0 w-2 h-3 bg-blue-400 rounded-full opacity-70"
    animate={{ y: ["0%", "80%"], opacity: [0.7, 0] }}
    transition={{
      duration: 1.2,
      ease: "easeIn",
      repeat: Infinity,
      delay
    }}
    style={{ left: "50%", transform: "translateX(-50%)" }}
  />
);

function RainfallVisual({ data }) {
  return (
    <div className="bg-blue-50 p-6 rounded shadow w-full text-center">
      <h2 className="text-xl font-semibold text-blue-800 mb-4">
        🌧️ Rainfall Intensity
      </h2>

      <div className="flex flex-wrap justify-center items-end gap-6 h-55 relative overflow-visible">
        {data.map((reading, i) => {
          const heightPercent = Math.min(reading.rainfall / 300, 1) * 100;
          const fillColor = getRainColor(reading.rainfall);
          const curveY = 100 - heightPercent;

          return (
            <div key={i} className="flex flex-col items-center w-14 relative">
              {/* Animated Raindrop */}
              <Droplet delay={i * 0.2} />

              {/* Container (Tube) */}
              <svg viewBox="0 0 64 100" width="50" height="100" className="mt-4">
                <defs>
                  <clipPath id={`tube-clip-${i}`}>
                    <rect x="14" y="10" width="36" height="85" rx="8" ry="8" />
                  </clipPath>
                </defs>

                {/* Tube outline */}
                <rect
                  x="14"
                  y="10"
                  width="36"
                  height="85"
                  rx="8"
                  ry="8"
                  fill="#fff"
                  stroke="#60A5FA"
                  strokeWidth="2"
                />

                {/* Wavy surface fill */}
                <motion.path
                  d={`
                    M14 ${curveY}
                    Q32 ${curveY - 6}, 50 ${curveY}
                    V95 H14 Z
                  `}
                  fill={fillColor}
                  clipPath={`url(#tube-clip-${i})`}
                  animate={{
                    d: [
                      `M14 ${curveY} Q32 ${curveY - 6}, 50 ${curveY} V95 H14 Z`,
                      `M14 ${curveY} Q32 ${curveY + 6}, 50 ${curveY} V95 H14 Z`,
                      `M14 ${curveY} Q32 ${curveY - 6}, 50 ${curveY} V95 H14 Z`
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </svg>

              <div className="text-sm font-semibold text-slate-700 mt-1">
                {Math.round(reading.rainfall)} mm
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RainfallVisual;