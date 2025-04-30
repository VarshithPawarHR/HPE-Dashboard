"use client";

import { useEffect, useState } from "react";
import { StatusCard } from "@/components/status-card";
import { getStorageConsumption } from "@/api/getStorageConsumption";

interface StorageConsumptionCardProps {
  directory: string;
}

export function StorageConsumptionCard({
  directory,
}: StorageConsumptionCardProps) {
  const [storageConsumption, setStorageConsumption] =
    useState<string>("Loading...");

  useEffect(() => {
    async function fetchStorageConsumption() {
      try {
        const data = await getStorageConsumption(directory);
        setStorageConsumption(`${data.total_storage_consumed_gb} GB`);
      } catch (error) {
        console.error("Failed to fetch storage consumption:", error);
        setStorageConsumption("Error");
      }
    }

    fetchStorageConsumption();
  }, [directory]);

  const statusColor = storageConsumption.includes("-")
    ? "text-red-500"
    : "text-green-500";

  return (
    <StatusCard
      title="Last 24 Hours Consumption"
      status={storageConsumption}
      statusColor={statusColor}
      description="Storage used in the last 24 hours"
    />
  );
}
