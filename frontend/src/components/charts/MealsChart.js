import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", meals: 1200 },
  { month: "Feb", meals: 2100 },
  { month: "Mar", meals: 3500 },
  { month: "Apr", meals: 5200 },
  { month: "May", meals: 7600 },
  { month: "Jun", meals: 9800 },
  { month: "Jul", meals: 12450 },
];

const MealsChart = () => {
  return (
    <div className="chart-card">
      <h3>🍽 Meals Saved</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="4 4" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="meals"
            stroke="#22C55E"
            strokeWidth={4}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MealsChart;