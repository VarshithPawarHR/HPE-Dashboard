"use client";

import { Waves } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusCard } from "@/components/status-card";
import { ResponseTimeChart } from "@/components/line-plot";
import { ResponseTimeChart1week } from "@/components/lineplot1week";
import { ResponseTimeChart1month } from "@/components/lineplot1month";
import { ResponseTimeChart3month } from "@/components/lineplot3month";
import { StorageForecastSlider } from "@/components/storage-forecast-slider";
import { StorageConsumptionCard } from "@/components/storage-consumption-card";
import { GrowthRateCard } from "@/components/growth-rate-card";
import { SummaryCards } from "@/components/summary-cards";
import { LiveTime } from "@/components/live-time";
import { useState } from "react";

export default function Dashboard() {
  // Separate states
  const [liveDirectory, setLiveDirectory] = useState("/info");
  const [predictionDirectory, setPredictionDirectory] = useState("/info");
  const [selectedDuration, setSelectedDuration] = useState("1week");

  return (
    <div className="min-h-screen bg-[#0f1520] text-slate-200">
      <main className="container mx-auto max-w-7xl p-4">
        {/* Header */}
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
            onClick={() =>
              window.open("https://github.com/VarshithPawarHR/HPE-StoragePrediction")
            }
          >
            GitHub Repository
          </Button>
        </div>

        {/* Live Time Card */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-1">
          <StatusCard
            title="Current Date & Time"
            status={<LiveTime />}
            statusColor="text-green-500"
            description="Today"
          />
        </div>

        {/* 🔵 LIVE MONITORING SECTION */}
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
                  onClick={() => setLiveDirectory(item.value)}
                  className={`px-4 py-1 text-xs rounded-md border transition-all duration-200 ${
                    liveDirectory === item.value
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
              <StorageConsumptionCard directory={liveDirectory} />
              <GrowthRateCard directory={liveDirectory} />
            </div>
            <ResponseTimeChart directory={liveDirectory} />
            <SummaryCards directory={liveDirectory} />
          </CardContent>
        </Card>

        {/* 🔮 STORAGE FORECASTING SLIDER */}
        <Card className="border-slate-800 bg-[#131926] mb-6">
          <CardHeader>
            <CardTitle className="text-base font-medium text-slate-300">
              Storage Forecasting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <StorageForecastSlider />
          </CardContent>
        </Card>

        {/* 📊 PREDICTION SECTION */}
        <Card className="mb-6 border-slate-800 bg-[#131926]">
          <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between pb-2 gap-3">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base font-medium text-slate-300">
                Storage Prediction Line Graphs
              </CardTitle>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Info", value: "/info" },
                { label: "Scratch", value: "/scratch" },
                { label: "Customer", value: "/customer" },
                { label: "Project", value: "/projects" },
              ].map((item) => (
                <button
                  key={item.value}
                  onClick={() => setPredictionDirectory(item.value)}
                  className={`px-4 py-1 text-xs rounded-md border transition-all duration-200 ${
                    predictionDirectory === item.value
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
            {/* Duration Selector */}
            <div className="flex space-x-2 mb-4">
              {["1week", "1month", "3month"].map((duration) => (
                <button
                  key={duration}
                  onClick={() => setSelectedDuration(duration)}
                  className={`px-4 py-1 text-xs rounded-md border transition-all duration-200 ${
                    selectedDuration === duration
                      ? "bg-slate-700 text-white border-slate-600"
                      : "bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700"
                  }`}
                >
                  {duration === "1week"
                    ? "1-Week"
                    : duration === "1month"
                    ? "1-Month"
                    : "3-Month"}
                </button>
              ))}
            </div>

            {/* Conditional Chart Rendering */}
            {selectedDuration === "1week" && (
              <ResponseTimeChart1week directory={predictionDirectory} />
            )}
            {selectedDuration === "1month" && (
              <ResponseTimeChart1month directory={predictionDirectory} />
            )}
            {selectedDuration === "3month" && (
              <ResponseTimeChart3month directory={predictionDirectory} />
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
