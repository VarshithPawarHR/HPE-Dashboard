"use client";

import { useEffect, useState } from "react";
import { StatusCard } from "@/components/status-card";
import { getGrowthRate } from "@/api/getGrowthRate";

interface GrowthRateCardProps {
  directory: string;
}

export function GrowthRateCard({ directory }: GrowthRateCardProps) {
  const [growthRate, setGrowthRate] = useState<string>("Loading...");

  useEffect(() => {
    async function fetchGrowthRate() {
      try {
        const data = await getGrowthRate(directory);
        setGrowthRate(`${data.growth_rate_percent}%`);
      } catch (error) {
        console.error("Failed to fetch growth rate:", error);
        setGrowthRate("Error");
      }
    }

    fetchGrowthRate();
  }, [directory]);

const statusColor = growthRate.includes("-") ? "text-red-500" : "text-green-500";

return (
    <StatusCard
        title="Growth Rate"
        status={growthRate}
        statusColor={statusColor}
        description="Growth in the last 24 hours"
    />
);
}