import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
 YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", waste: 200 },
  { month: "Feb", waste: 450 },
  { month: "Mar", waste: 700 },
  { month: "Apr", waste: 1100 },
  { month: "May", waste: 1600 },
  { month: "Jun", waste: 2200 },
];

const WasteChart = () => {
  return (
    <div className="chart-card">
      <h3>♻ Food Waste Reduced</h3>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />

          <Area
            dataKey="waste"
            fill="#22C55E"
            stroke="#22C55E"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WasteChart;