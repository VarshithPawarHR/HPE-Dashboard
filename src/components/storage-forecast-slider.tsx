"use client"

import { useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const COLORS = ["#00C853", "#2196F3", "#FF9800", "#F44336"]

const forecastData = [
  {
    title: "Current Storage",
    data: [
      { name: "Used", value: 450 },
      { name: "Available", value: 550 },
    ],
  },
  {
    title: "30 Day Forecast",
    data: [
      { name: "Used", value: 580 },
      { name: "Available", value: 420 },
    ],
  },
  {
    title: "60 Day Forecast",
    data: [
      { name: "Used", value: 720 },
      { name: "Available", value: 280 },
    ],
  },
  {
    title: "90 Day Forecast",
    data: [
      { name: "Used", value: 850 },
      { name: "Available", value: 150 },
    ],
  },
]

export function StorageForecastSlider() {
  const [activeTab, setActiveTab] = useState("current")

  const tabs = [
    { id: "current", label: "Current" },
    { id: "30day", label: "30 Days" },
    { id: "60day", label: "60 Days" },
    { id: "90day", label: "90 Days" },
  ]

  return (
    <div className="space-y-4">
      <Tabs defaultValue="current" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList className="bg-slate-800">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="data-[state=active]:bg-slate-700 text-slate-300">
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
                const currentIndex = tabs.findIndex((tab) => tab.id === activeTab)
                const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length
                setActiveTab(tabs[prevIndex].id)
              }}
            >
              <ChevronLeft className="h-4 w-4 text-white" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-slate-700 bg-slate-800/50"
              onClick={() => {
                const currentIndex = tabs.findIndex((tab) => tab.id === activeTab)
                const nextIndex = (currentIndex + 1) % tabs.length
                setActiveTab(tabs[nextIndex].id)
              }}
            >
              <ChevronRight className="h-4 w-4 text-white" />
            </Button>
          </div>
        </div>

        {tabs.map((tab, index) => (
          <TabsContent key={tab.id} value={tab.id} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-slate-800 bg-slate-800/30">
                <CardContent className="pt-6">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={forecastData[index].data}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {forecastData[index].data.map((entry, i) => (
                            <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                          ))}
                        </Pie>
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">{forecastData[index].title}</h3>
                <p className="text-slate-400">
                  {index === 0
                    ? "Current storage utilization shows your system is at 45% capacity with 550GB available."
                    : `Based on current usage patterns, in ${index * 30} days your storage is projected to reach ${forecastData[index].data[0].value / 10}% capacity with ${forecastData[index].data[1].value}GB remaining.`}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="border-slate-800 bg-slate-800/30">
                    <CardContent className="p-4">
                      <div className="text-sm text-slate-400">Total Capacity</div>
                      <div className="text-2xl font-bold text-white">1000 GB</div>
                    </CardContent>
                  </Card>
                  <Card className="border-slate-800 bg-slate-800/30">
                    <CardContent className="p-4">
                      <div className="text-sm text-slate-400">Used Storage</div>
                      <div className="text-2xl font-bold text-white">{forecastData[index].data[0].value} GB</div>
                    </CardContent>
                  </Card>
                  <Card className="border-slate-800 bg-slate-800/30">
                    <CardContent className="p-4">
                      <div className="text-sm text-slate-400">Available</div>
                      <div className="text-2xl font-bold text-white">{forecastData[index].data[1].value} GB</div>
                    </CardContent>
                  </Card>
                  <Card className="border-slate-800 bg-slate-800/30">
                    <CardContent className="p-4">
                      <div className="text-sm text-slate-400">Growth Rate</div>
                      <div className="text-2xl font-bold text-white">{index === 0 ? "N/A" : `${index * 4}%`}</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
