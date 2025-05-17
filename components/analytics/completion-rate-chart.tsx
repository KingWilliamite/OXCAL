"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface CompletionRateChartProps {
  dateRange: string
}

export function CompletionRateChart({ dateRange }: CompletionRateChartProps) {
  const [data, setData] = useState<any[]>([])

  // Update data based on dateRange
  useEffect(() => {
    // Different data for different date ranges
    const dataByRange = {
      today: [
        { name: "Morning", rate: 0 },
        { name: "Afternoon", rate: 0 },
        { name: "Evening", rate: 0 },
      ],
      thisWeek: [
        { name: "Mon", rate: 0 },
        { name: "Tue", rate: 0 },
        { name: "Wed", rate: 0 },
        { name: "Thu", rate: 0 },
        { name: "Fri", rate: 0 },
        { name: "Sat", rate: 0 },
        { name: "Sun", rate: 0 },
      ],
      thisMonth: [
        { name: "Week 1", rate: 0 },
        { name: "Week 2", rate: 0 },
        { name: "Week 3", rate: 0 },
        { name: "Week 4", rate: 0 },
      ],
      lastMonth: [
        { name: "Week 1", rate: 0 },
        { name: "Week 2", rate: 0 },
        { name: "Week 3", rate: 0 },
        { name: "Week 4", rate: 0 },
      ],
      last3Months: [
        { name: "Jan", rate: 0 },
        { name: "Feb", rate: 0 },
        { name: "Mar", rate: 0 },
      ],
      thisYear: [
        { name: "Jan", rate: 0 },
        { name: "Feb", rate: 0 },
        { name: "Mar", rate: 0 },
        { name: "Apr", rate: 0 },
        { name: "May", rate: 0 },
        { name: "Jun", rate: 0 },
      ],
      custom: [
        { name: "Start", rate: 0 },
        { name: "Middle", rate: 0 },
        { name: "End", rate: 0 },
      ],
    }

    // Set data based on dateRange
    setData(dataByRange[dateRange as keyof typeof dataByRange] || dataByRange.thisMonth)
  }, [dateRange])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
        <XAxis
          dataKey="name"
          tick={{ fill: "#FFFFFF" }}
          axisLine={{ stroke: "#2A2A2A" }}
          tickLine={{ stroke: "#2A2A2A" }}
        />
        <YAxis tick={{ fill: "#FFFFFF" }} axisLine={{ stroke: "#2A2A2A" }} tickLine={{ stroke: "#2A2A2A" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1E1E1E",
            border: "1px solid #2A2A2A",
            borderRadius: "4px",
            color: "#FFFFFF",
          }}
          labelStyle={{ color: "#FFFFFF" }}
          itemStyle={{ color: "#FFFFFF" }}
        />
        <Line
          type="monotone"
          dataKey="rate"
          stroke="#34A853"
          strokeWidth={2}
          dot={{ r: 4, fill: "#34A853", stroke: "#34A853" }}
          activeDot={{ r: 6, fill: "#34A853", stroke: "#FFFFFF" }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
