"use client";

import { Waves } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusCard } from "@/components/status-card";
import { ResponseTimeChart } from "@/components/line-plot";
import { StorageForecastSlider } from "@/components/storage-forecast-slider";
import { StorageConsumptionCard } from "@/components/storage-consumption-card";
import { GrowthRateCard } from "@/components/growth-rate-card";
import { SummaryCards } from "@/components/summary-cards";
import { LiveTime } from "@/components/live-time";
import { useState } from "react";

export default function Dashboard() {
  const [selectedDirectory, setSelectedDirectory] = useState("/info");

  return (
    <div className="min-h-screen bg-[#0f1520] text-slate-200">
      <main className="container mx-auto max-w-7xl p-4">
        <div className="mb-6 mt-2 flex items-center justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20 text-green-500">
              <Waves className="h-5 w-5" />
            </div>
            <div>
              <h1 className="flex items-center gap-2 text-xl font-semibold text-white">
                Storage Monitoring System
              </h1>
              <p className="text-sm text-slate-400">
                Monitor your storage system and never run out of space again.
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="gap-2 border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-800"
          >
            GitHub Repository
          </Button>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <StatusCard
            title="Current Date & Time"
            status={<LiveTime />}
            statusColor="text-green-500"
            description="Today"
          />
          <StatusCard
            title="Last Updation"
            status="5 minutes ago"
            statusColor="text-white"
            description="Data is inserted every 15 minutes"
          />
        </div>

        <Card className="mb-6 border-slate-800 bg-[#131926]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base font-medium text-slate-300">
                Live Storage Monitor
              </CardTitle>
            </div>
            <div className="flex space-x-2">
              {[
                { label: "Info", value: "/info" },
                { label: "Scratch", value: "/scratch" },
                { label: "Customer", value: "/customer" },
                { label: "Project", value: "/projects" },
              ].map((item) => (
                <button
                  key={item.value}
                  onClick={() => setSelectedDirectory(item.value)}
                  className={`px-4 py-1 text-xs rounded-md border transition-all duration-200 ${
                    selectedDirectory === item.value
                      ? "bg-slate-700 text-white border-slate-600"
                      : "bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <StorageConsumptionCard directory={selectedDirectory} />
              <GrowthRateCard directory={selectedDirectory} />
            </div>

            <ResponseTimeChart directory={selectedDirectory} />
            <SummaryCards directory={selectedDirectory} />
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-[#131926]">
          <CardHeader>
            <CardTitle className="text-base font-medium text-slate-300">
              Storage Forecasting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <StorageForecastSlider />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}