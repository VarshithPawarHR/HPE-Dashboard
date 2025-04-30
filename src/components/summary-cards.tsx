"use client";

import { useEffect, useState } from "react";
import { Waves, LineChart } from "lucide-react";
import { getSummary } from "@/api/getSummary";

interface SummaryCardsProps {
  directory: string;
}

export function SummaryCards({ directory }: SummaryCardsProps) {
  const [summaryData, setSummaryData] = useState<{
    storage_gb: number;
    added_gb: number;
    deleted_gb: number;
  } | null>(null);

  // Fetch summary data based on the selected directory
  useEffect(() => {
    async function fetchSummary() {
      try {
        const data = await getSummary(directory);
        setSummaryData(data.summary[0]); // Use the latest summary data
      } catch (error) {
        console.error("Failed to fetch summary:", error);
      }
    }

    fetchSummary();
  }, [directory]);

  return (
    <div className="mt-4 grid grid-cols-1 gap-6 border-t border-slate-800 pt-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center gap-2">
          <Waves className="h-5 w-5 text-slate-300" />
          <span className="text-2xl font-bold text-white">
            {summaryData ? `${summaryData.storage_gb} GB` : "Loading..."}
          </span>
        </div>
        <span className="text-sm text-slate-400">Storage</span>
      </div>
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center gap-2">
          <LineChart className="h-5 w-5 text-green-400" />
          <span className="text-2xl font-bold text-white">
            {summaryData ? `${summaryData.added_gb} GB` : "Loading..."}
          </span>
        </div>
        <span className="text-sm text-slate-400">Added</span>
      </div>
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center gap-2">
          <LineChart className="h-5 w-5 text-red-400" />
          <span className="text-2xl font-bold text-white">
            {summaryData ? `${summaryData.deleted_gb} GB` : "Loading..."}
          </span>
        </div>
        <span className="text-sm text-slate-400">Deleted</span>
      </div>
    </div>
  );
}