import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

function NPKLineGraph({ data }) {
  return (
    <div className="bg-white p-4 rounded shadow w-full md:w-2/3">
      <h3 className="text-lg font-semibold text-green-800 mb-2">📈 NPK Nutrient Levels</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="N" stroke="#34D399" strokeWidth={2} name="Nitrogen (N)" />
          <Line type="monotone" dataKey="P" stroke="#FBBF24" strokeWidth={2} name="Phosphorus (P)" />
          <Line type="monotone" dataKey="K" stroke="#FB7185" strokeWidth={2} name="Potassium (K)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default NPKLineGraph;
