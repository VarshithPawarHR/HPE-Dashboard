"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCurrentStorage } from "@/api/getCurrentStorage";
import { getDailyPrediction } from "@/api/getDailyPrediction";
import { getWeeklyPrediction } from "@/api/getWeeklyPrediction";
import { getMonthlyPrediction } from "@/api/getMontlyPrediction";
import { get3MonthsPrediction } from "@/api/get3MonthsPrediction";
import { getCategory } from "@/api/getCategory";

const COLORS = ["#00C853", "#2196F3", "#FF9800", "#F44336"];

export function StorageForecastSlider() {
  const [activeTab, setActiveTab] = useState("current");
  const [pieChartData, setPieChartData] = useState<
    { name: string; value: number }[]
  >([]);
  const [fetchDataFunction, setFetchDataFunction] = useState(
    () => getCurrentStorage
  );
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<string>(""); // Storage consumption status

  const tabs = [
    { id: "current", label: "Current", fetchFunction: getCurrentStorage },
    { id: "1day", label: "1 Day", fetchFunction: getDailyPrediction },
    { id: "1week", label: "1 Week", fetchFunction: getWeeklyPrediction },
    { id: "1month", label: "1 Month", fetchFunction: getMonthlyPrediction },
    { id: "3months", label: "3 Months", fetchFunction: get3MonthsPrediction },
  ];

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await fetchDataFunction();
        const formattedData = Object.entries(data).map(([name, value]) => ({
          name,
          value: Number(value),
        }));
        setPieChartData(formattedData);
        let categoryResponse = { overall_category: "" };
        if (activeTab !== "current" && activeTab !== "1day") {
          categoryResponse = await getCategory(data);
        }
        setCategory(categoryResponse.overall_category);
      } catch (error) {
        console.error("Failed to fetch data or category:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [activeTab, fetchDataFunction]);

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    const selectedTab = tabs.find((tab) => tab.id === newTab);
    if (selectedTab) {
      setFetchDataFunction(() => selectedTab.fetchFunction);
    }
  };

  return (
    <div className="space-y-4">
      <Tabs
        defaultValue="current"
        value={activeTab}
        onValueChange={handleTabChange}
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
                handleTabChange(tabs[prevIndex].id);
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
                handleTabChange(tabs[nextIndex].id);
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
                    {loading ? ( // Show loading state
                      <div className="flex items-center justify-center h-full">
                        <p className="text-slate-400">Loading...</p>
                      </div>
                    ) : (
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
                            animationDuration={1000}
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
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">
                  {tab.label} Storage Distribution
                </h3>
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
                {activeTab !== "current" && (
                  <div className="mt-4">
                    {loading ? (
                      <p className="text-slate-400">Loading...</p>
                    ) : (
                      <>
                      <p className="text-sm text-slate-400">
                        Storage consumption status:
                      </p>
                      <p
                      className={`text-2xl font-bold ${
                        category === "low"
                          ? "text-green-500"
                          : category === "moderate"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
                      {category.toUpperCase()}
                    </p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
