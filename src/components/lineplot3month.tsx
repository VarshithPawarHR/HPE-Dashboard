"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getLineGraph3month } from "@/api/getLineGraph3month"; // Ensure you fetch 3-month data

// Define the expected data type
type ChartPoint = {
  time: string;
  storage: number;
};

export function ResponseTimeChart3month({ directory }: { directory: string }) {
  const [chartData, setChartData] = useState<ChartPoint[]>([]);

  const convertToISTDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
    });
  };

  const fetchData = () => {
    console.log("Fetching for directory:", directory);

    // Fetch 3 months' worth of data
    getLineGraph3month(directory)
      .then((data) => {
        console.log("Raw data received:", data);

        const key = directory.replace("/", "");
        const values = data[key];

        if (values && Array.isArray(values)) {
          const today = new Date();

          const formattedData = values.map(
            (item: { predicted_value: number }, index: number) => {
              const futureDate = new Date(today);
              futureDate.setDate(today.getDate() + index); // <-- FORWARD in time
              return {
                time: convertToISTDate(futureDate.toISOString()),
                storage: item.predicted_value,
              };
            }
          );

          console.log("Formatted chart data:", formattedData);
          setChartData(formattedData);
        } else {
          console.warn(`No valid data for directory: ${directory}`);
          setChartData([]);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch line graph data:", error);
      });
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 5 * 60 * 1000); // Refresh every 5 minutes

    return () => clearInterval(intervalId);
  }, [directory]);

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis
            dataKey="time"
            interval={26} // Adjust this interval to reduce congestion over 3 months
            angle={-360} // Rotate labels for better readability
            textAnchor="end" // Align the labels
            label={{ value: "Date", position: "insideBottom", offset: -5 }}
          />
          <YAxis
            label={{
              value: "Storage (GB)",
              angle: -90,
              position: "insideLeft",
            }}
            domain={["auto", "auto"]}
          />
          <Tooltip
            formatter={(value) => [`${value} GB`, "Storage"]}
          />
          <Line
            type="monotone"
            dataKey="storage"
            stroke="hsl(142, 76%, 36%)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
