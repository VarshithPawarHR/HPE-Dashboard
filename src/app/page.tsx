"use client";

import { Bell, ChevronDown, LineChart, Waves } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusCard } from "@/components/status-card";
import { ResponseTimeChart } from "@/components/response-time-chart";
import { StorageForecastSlider } from "@/components/storage-forecast-slider";

export default function Dashboard() {
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
            <Bell className="h-4 w-4" />
            Test Button
          </Button>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <StatusCard
            title="Current status"
            status="Up"
            statusColor="text-green-500"
            description="Currently up for 3d 11h 37m"
          />
          <StatusCard
            title="Last check"
            status="Coming soon"
            statusColor="text-white"
            description="Checked every 5 minutes"
          />
          <StatusCard
            title="Last 24 hours"
            status="100%"
            statusColor="text-white"
            description="0 incidents, 0m down"
            chart={
              <div className="flex h-6 w-full gap-0.5">
                {Array(24)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="h-full w-full rounded-sm bg-green-500"
                    />
                  ))}
              </div>
            }
          />
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
          <StatusCard
            title="Last 7 days"
            status="100%"
            statusColor="text-green-500"
            description="0 incidents, 0m down"
            className="md:col-span-1"
          />
          <StatusCard
            title="Last 30 days"
            status="100%"
            statusColor="text-green-500"
            description="0 incidents, 0m down"
            className="md:col-span-1"
          />
          <StatusCard
            title="Last 365 days"
            status="----%"
            statusColor="text-slate-300"
            description={
              <span className="text-green-500">Unlock with paid plans</span>
            }
            className="md:col-span-1"
          />
          <StatusCard
            title="Pick a date range"
            status="----%"
            statusColor="text-slate-300"
            description="- incidents, - down"
            className="md:col-span-1"
            action={
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-1 text-xs text-slate-400"
              >
                <ChevronDown className="h-3 w-3" />
              </Button>
            }
          />
        </div>

        <Card className="mb-6 border-slate-800 bg-[#131926]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base font-medium text-slate-300">
                Live Storage Monitor
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                className="h-7 gap-1 border-amber-500/20 bg-amber-500/10 px-2 text-xs text-amber-500"
              >
                <Bell className="h-3 w-3" />
                Setup alerts
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1 text-xs text-slate-400"
            >
              Last 24 hours
              <ChevronDown className="h-3 w-3" />
            </Button>
          </CardHeader>
          <CardContent>
            <ResponseTimeChart />
            <div className="mt-4 grid grid-cols-3 gap-4 border-t border-slate-800 pt-4">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Waves className="h-4 w-4 text-slate-400" />
                  <span className="text-xl font-semibold">392 ms</span>
                </div>
                <span className="text-sm text-slate-400">Average</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <LineChart className="h-4 w-4 text-green-500" />
                  <span className="text-xl font-semibold">255 ms</span>
                </div>
                <span className="text-sm text-slate-400">Minimum</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <LineChart className="h-4 w-4 text-red-500" />
                  <span className="text-xl font-semibold">1167 ms</span>
                </div>
                <span className="text-sm text-slate-400">Maximum</span>
              </div>
            </div>
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
