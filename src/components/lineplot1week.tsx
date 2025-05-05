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
import { getLineGraph1week } from "@/api/getLineGraph1week";

// Define the expected data type
type ChartPoint = {
  time: string; // store time as IST format string
  storage: number;
};

export function ResponseTimeChart1week({ directory }: { directory: string }) {
  const [chartData, setChartData] = useState<ChartPoint[]>([]);

  // Function to convert UTC timestamp to IST (Indian Standard Time)
  const convertToIST = (timestamp: string) => {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleString("en-IN", options);
  };

  const fetchData = () => {
    console.log("Fetching for directory:", directory);

    getLineGraph1week(directory)
      .then((data) => {
        console.log("Raw data received:", data);

        const key = directory.replace("/", ""); // e.g., "/projects" → "projects"
        const values = data[key];

        if (values && Array.isArray(values)) {
          const formattedData = values.map((item: { predicted_value: number }, index: number) => {
            // Calculate future time (current time + index hours)
            const rawTime = new Date(Date.now() + index * 3600 * 1000).toISOString(); // Add hours for future predictions
            return {
              time: convertToIST(rawTime), // Convert to IST format
              storage: item.predicted_value,
            };
          });

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
            tickFormatter={(time) => {
              // Extract and return only the time (HH:mm AM/PM)
              const timeOnly = new Date(time).toLocaleTimeString("en-IN", {
                timeZone: "Asia/Kolkata",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              });
              return timeOnly;
            }}
            interval={5}
            label={{ value: "Time", position: "insideBottom", offset: -5 }}
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
