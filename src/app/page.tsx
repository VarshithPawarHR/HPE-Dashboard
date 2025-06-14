"use client";

import { useEffect, useState } from "react";
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
import { getDirectoryNames } from "@/api/getDirectoryNames";

export default function Dashboard() {
  const [directories, setDirectories] = useState<string[]>([]);
  const [liveDirectory, setLiveDirectory] = useState("");
  const [predictionDirectory, setPredictionDirectory] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("1week");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDirectories = async () => {
      try {
        setLoading(true);
        const data = await getDirectoryNames();
        setDirectories(data || []);
        setLiveDirectory(data[0]);
        setPredictionDirectory(data[0]);
      } catch (err) {
        console.error("Failed to fetch directories", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDirectories();
  }, []);

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
              <h1 className="text-xl font-semibold text-white">
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
              window.open(
                "https://github.com/VarshithPawarHR/HPE-StoragePrediction"
              )
            }
          >
            GitHub Repository
          </Button>
        </div>

        {/* Live Time Card */}
        <div className="mb-6 grid grid-cols-1 gap-4">
          <StatusCard
            title="Current Date & Time"
            status={<LiveTime />}
            statusColor="text-green-500"
            description="Today"
          />
        </div>

        {/* 🔵 Live Monitoring */}
        <Card className="mb-6 border-slate-800 bg-[#131926]">
          <CardHeader className="flex flex-row justify-between pb-2">
            <CardTitle className="text-base font-medium text-slate-300">
              Live Storage Monitor
            </CardTitle>
            <div className="flex space-x-2">
              {directories.map((dir) => (
                <button
                  key={dir}
                  onClick={() => setLiveDirectory(dir)}
                  className={`px-4 py-1 text-xs rounded-md border transition-all duration-200 ${
                    liveDirectory === dir
                      ? "bg-slate-700 text-white border-slate-600"
                      : "bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700"
                  }`}
                >
                  {dir.replace("/", "").toUpperCase()}
                </button>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <span className="text-slate-400">Loading...</span>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <StorageConsumptionCard directory={liveDirectory} />
                  <GrowthRateCard directory={liveDirectory} />
                </div>
                <ResponseTimeChart directory={liveDirectory} />
                <SummaryCards directory={liveDirectory} />
              </>
            )}
          </CardContent>
        </Card>

        {/* 🔮 Forecast Slider */}
        <Card className="mb-6 border-slate-800 bg-[#131926]">
          <CardHeader>
            <CardTitle className="text-base font-medium text-slate-300">
              Storage Forecasting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <StorageForecastSlider />
          </CardContent>
        </Card>

        {/* 📊 Prediction Section */}
        <Card className="mb-6 border-slate-800 bg-[#131926]">
          <CardHeader className="flex flex-col md:flex-row justify-between pb-2 gap-3">
            <CardTitle className="text-base font-medium text-slate-300">
              Storage Prediction Line Graphs
            </CardTitle>
            <div className="flex flex-wrap gap-2">
              {directories.map((dir) => (
                <button
                  key={dir}
                  onClick={() => setPredictionDirectory(dir)}
                  className={`px-4 py-1 text-xs rounded-md border transition-all duration-200 ${
                    predictionDirectory === dir
                      ? "bg-slate-700 text-white border-slate-600"
                      : "bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700"
                  }`}
                >
                  {dir.replace("/", "").toUpperCase()}
                </button>
              ))}
            </div>
          </CardHeader>

          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <span className="text-slate-400">Loading...</span>
              </div>
            ) : (
              <>
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
              </>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
