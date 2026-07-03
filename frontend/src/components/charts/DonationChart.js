import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "Restaurants", value: 55 },
  { name: "Homemade", value: 20 },
  { name: "Bakery", value: 10 },
  { name: "Groceries", value: 15 },
];

const COLORS = [
  "#22C55E",
  "#F97316",
  "#8B5CF6",
  "#3B82F6",
];

const DonationChart = () => {
  return (
    <div className="chart-card">
      <h3>❤️ Donation Categories</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonationChart;