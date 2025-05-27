import React from "react";
import { motion } from "framer-motion";

function HumidityVisual({ data }) {
  return (
    <div className="bg-white p-4 rounded shadow w-full mb-6 flex flex-col md:flex-row gap-4">
      {/* Left text/info box */}
      <div className="w-full md:w-1/5 flex flex-col justify-center items-center text-center">
        <h2 className="text-xl font-bold text-blue-900 mb-2">💧 Humidity Insights</h2>
        <p className="text-sm text-slate-700">
          Each droplet shows the current humidity reading. Rippling waves indicate fluidity and change in atmospheric moisture!
        </p>
      </div>

      {/* Right: Droplets with animated wave fills */}
      <div className="w-full md:w-4/5 flex justify-around items-end h-64 flex-wrap gap-4 px-2">
        {data.map((reading, i) => {
          const value = Math.min(reading.humidity, 100);
          const waveHeight = 100 - value; // Y position for wave base

          return (
            <div key={i} className="flex flex-col items-center w-16 relative">
              <svg viewBox="0 0 64 100" width="64" height="100">
                {/* Define clipping path as drop */}
                <defs>
                  <clipPath id={`drop-clip-${i}`}>
                    <path d="M32 0C32 0 0 46 0 72C0 90 14 100 32 100C50 100 64 90 64 72C64 46 32 0 32 0Z" />
                  </clipPath>
                </defs>

                {/* Droplet outline */}
                <path
                  d="M32 0C32 0 0 46 0 72C0 90 14 100 32 100C50 100 64 90 64 72C64 46 32 0 32 0Z"
                  fill="#E0F2FE"
                  stroke="#3B82F6"
                  strokeWidth="2"
                />

                {/* Animated wave fill inside clip path */}
                <motion.path
                  d={`
                    M0 ${waveHeight}
                    Q16 ${waveHeight - 4}, 32 ${waveHeight}
                    T64 ${waveHeight}
                    V100 H0 Z
                  `}
                  fill="#3B82F6"
                  clipPath={`url(#drop-clip-${i})`}
                  animate={{
                    d: [
                      `M0 ${waveHeight} Q16 ${waveHeight - 4}, 32 ${waveHeight} T64 ${waveHeight} V100 H0 Z`,
                      `M0 ${waveHeight} Q16 ${waveHeight + 4}, 32 ${waveHeight} T64 ${waveHeight} V100 H0 Z`,
                      `M0 ${waveHeight} Q16 ${waveHeight - 4}, 32 ${waveHeight} T64 ${waveHeight} V100 H0 Z`
                    ]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut"
                  }}
                />
              </svg>

              <div className="text-xs text-slate-600 mt-1">
                {Math.round(value)}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HumidityVisual;
