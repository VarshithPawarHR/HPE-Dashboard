"use client"
import { Line } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Generate sample data for the response time chart
const generateChartData = () => {
  const data = []
  const baseTime = new Date("2023-04-29T00:00:00")

  for (let i = 0; i < 100; i++) {
    const time = new Date(baseTime.getTime() + i * 30 * 60000) // 30 min intervals

    // Generate a value between 200-600 with occasional spikes
    let value = 300 + Math.random() * 200

    // Add occasional spikes
    if (i === 25) value = 1100
    if (i === 80) value = 900
    if (i === 95) value = 1200

    data.push({
      time: time.toISOString(),
      value: Math.round(value),
    })
  }

  return data
}

export function ResponseTimeChart() {
  const chartData = generateChartData()

  return (
    <div className="h-64 w-full">
      <ChartContainer
        config={{
          response: {
            label: "Response Time",
            color: "hsl(142, 76%, 36%)",
          },
        }}
      >
        <Line
          data={chartData}
          dataKey="value"
          stroke="var(--color-response)"
          strokeWidth={2}
          dot={false}
          type="monotone"
        />
        <ChartTooltip content={<ChartTooltipContent />} />
      </ChartContainer>
    </div>
  )
}
