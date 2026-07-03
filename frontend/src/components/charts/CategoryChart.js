import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { category: "Rice", foods: 120 },
  { category: "Pizza", foods: 80 },
  { category: "Snacks", foods: 65 },
  { category: "Bakery", foods: 50 },
  { category: "Desserts", foods: 30 },
];

const CategoryChart = () => {
  return (
    <div className="chart-card">
      <h3>🍛 Food Categories</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="category" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="foods"
            fill="#F97316"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryChart;