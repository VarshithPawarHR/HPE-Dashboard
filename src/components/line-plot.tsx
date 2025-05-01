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
import { getLineGraph } from "@/api/getLineGraph";

export function ResponseTimeChart({ directory }: { directory: string }) {
  const [chartData, setChartData] = useState([]);

  const fetchData = () => {
    getLineGraph(directory)
      .then((data) => {
        if (data && data.data) {
          const formattedData = data.data
            .map((item: { timestamp: string | number | Date; storage_gb: string | number }) => ({
              time: new Date(item.timestamp).toISOString(),
              storage: item.storage_gb,
            }))
            .reverse();
          setChartData(formattedData);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch line graph data:", error);
      });
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      console.log("Fetching data...");
      fetchData();
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

    return () => clearInterval(intervalId);
  }, [directory]);

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis
            dataKey="time"
            tickFormatter={(time) =>
              new Date(time).toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
              })
            }
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
              new Date(time).toLocaleString([], {
                hour: "2-digit",
                minute: "2-digit",
                day: "2-digit",
                month: "short",
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