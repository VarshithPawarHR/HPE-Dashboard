"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Generate sample data for the response time chart
const generateChartData = () => {
  const data = [];
  const baseTime = new Date("2023-04-29T00:00:00");

  for (let i = 0; i < 100; i++) {
    const time = new Date(baseTime.getTime() + i * 30 * 60000); // 30 min intervals

    // Generate a value between 200-600 with occasional spikes
    let value = 300 + Math.random() * 200;

    // Add occasional spikes
    if (i === 25) value = 1100;
    if (i === 80) value = 900;
    if (i === 95) value = 1200;

    data.push({
      time: time.toISOString(),
      value: Math.round(value),
    });
  }

  return data;
};

export function ResponseTimeChart() {
  const chartData = generateChartData();

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis
            dataKey="time"
            tickFormatter={(time) => new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          />
          <YAxis />
          <Tooltip
            labelFormatter={(time) => new Date(time).toLocaleString()}
            formatter={(value) => [`${value} ms`, "Response Time"]}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="hsl(142, 76%, 36%)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}