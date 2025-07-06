"use client";

import { getLineGraph1month } from "@/api/getLineGraph1month";
import { useEffect, useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Define the expected data type
type ChartPoint = {
  time: string;
  storage: number;
};

export function ResponseTimeChart1month({ directory }: { directory: string }) {
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

    getLineGraph1month(directory)
      .then((data) => {
        console.log("Raw data received:", data);

        const key = directory.replace("/", "");
        const values = data[key];

        if (values && Array.isArray(values)) {
          const today = new Date();

          const formattedData = values.map(
            (item: { predicted_value: number }, index: number) => {
              const futureDate = new Date(today);
              futureDate.setTime(today.getTime() + index * 4 * 60 * 60 * 1000); // 4-hour interval
              return {
                time: futureDate.toISOString(), // store full ISO timestamp
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
            interval={11} // Show every 12th data point (every 2 days)
            tickFormatter={(time) =>
              new Date(time).toLocaleDateString("en-IN", {
                timeZone: "Asia/Kolkata",
                day: "2-digit",
                month: "short",
              })
            }
            angle={0}
            textAnchor="end"
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
            labelFormatter={(time) =>
              new Date(time).toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
                day: "2-digit",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
            }
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
