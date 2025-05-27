import React from "react";
import { motion } from "framer-motion";

function WaterLevelVisual({ levels }) {
  return (
    <div className="bg-teal-50 p-4 rounded shadow w-full mb-6">
      <h3 className="text-lg font-semibold text-teal-800 mb-4 text-center">
        Water Level
      </h3>

      <div className="flex justify-around items-end h-64 px-4">
        {levels.map((level, i) => {
          const fillHeight = Math.min(level, 100); // Max 100%
          const rippleY = 100 - fillHeight - 5; // ripple offset from top

          return (
            <div key={i} className="flex flex-col items-center justify-end relative w-10">
              {/* Tube */}
              <div className="h-40 w-6 bg-white border-2 border-teal-300 rounded-md overflow-hidden relative shadow-inner">
                {/* Water fill */}
                <motion.div
                  className="absolute bottom-0 left-0 w-full bg-teal-400"
                  style={{ height: `${fillHeight}%` }}
                  initial={{ height: 0 }}
                  animate={{ height: `${fillHeight}%` }}
                  transition={{ duration: 1 }}
                />

                {/* Ripple */}
                <motion.div
                  className="absolute left-0 w-full h-2 bg-white opacity-30 rounded-full"
                  style={{ bottom: `${fillHeight}%` }}
                  animate={{
                    y: [0, -2, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                />
              </div>

              <div className="text-xs text-slate-700 mt-1">{level}%</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WaterLevelVisual;
