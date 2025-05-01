"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDailyPrediction } from "@/api/getDailyPrediction";

const COLORS = ["#00C853", "#2196F3", "#FF9800", "#F44336"];

export function StorageForecastSlider() {
  const [activeTab, setActiveTab] = useState("current");
  const [pieChartData, setPieChartData] = useState<
    { name: string; value: number }[]
  >([]);

  const tabs = [
    { id: "current", label: "Current" },
    { id: "1day", label: "1 Day" },
    { id: "1week", label: "1 Week" },
    { id: "1month", label: "1 Month" },
    { id: "3months", label: "3 Months" },
  ];

  useEffect(() => {
    async function fetchDailyPrediction() {
      try {
        const data = await getDailyPrediction();
        const formattedData = Object.entries(data).map(([name, value]) => ({
          name,
          value: Number(value),
        }));
        setPieChartData(formattedData);
      } catch (error) {
        console.error("Failed to fetch daily predictions:", error);
      }
    }

    fetchDailyPrediction();
  }, [activeTab]);

  return (
    <div className="space-y-4">
      <Tabs
        defaultValue="current"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="flex items-center justify-between mb-4">
          <TabsList className="bg-slate-800">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="data-[state=active]:bg-slate-700 text-slate-300"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-slate-700 bg-slate-800/50 "
              onClick={() => {
                const currentIndex = tabs.findIndex(
                  (tab) => tab.id === activeTab
                );
                const prevIndex =
                  (currentIndex - 1 + tabs.length) % tabs.length;
                setActiveTab(tabs[prevIndex].id);
              }}
            >
              <ChevronLeft className="h-4 w-4 text-white" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-slate-700 bg-slate-800/50"
              onClick={() => {
                const currentIndex = tabs.findIndex(
                  (tab) => tab.id === activeTab
                );
                const nextIndex = (currentIndex + 1) % tabs.length;
                setActiveTab(tabs[nextIndex].id);
              }}
            >
              <ChevronRight className="h-4 w-4 text-white" />
            </Button>
          </div>
        </div>

        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-slate-800 bg-slate-800/30">
                <CardContent className="pt-6">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieChartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                          labelLine={false}
                          animationDuration={1000} // Set animation duration to 1 second
                        >
                          {pieChartData.map((entry, i) => (
                            <Cell
                              key={`cell-${i}`}
                              fill={COLORS[i % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">
                  {tab.label} Storage Distribution
                </h3>
                <p className="text-slate-400">
                  This chart shows the storage distribution across the four
                  directories: Info, Scratch, Customer, and Projects for the{" "}
                  {tab.label.toLowerCase()} forecast.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {pieChartData.map((entry) => (
                    <Card
                      key={entry.name}
                      className="border-slate-800 bg-slate-800/30"
                    >
                      <CardContent className="p-4">
                        <div className="text-sm text-slate-400">
                          {entry.name}
                        </div>
                        <div className="text-2xl font-bold text-white">
                          {entry.value} GB
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
