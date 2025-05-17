"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface TimeUsageByDayProps {
  dateRange: string
}

export function TimeUsageByDay({ dateRange }: TimeUsageByDayProps) {
  const [data, setData] = useState<any[]>([])

  // Update data based on dateRange
  useEffect(() => {
    // Different data for different date ranges
    const dataByRange = {
      today: [
        { name: "Morning", hours: 0 },
        { name: "Afternoon", hours: 0 },
        { name: "Evening", hours: 0 },
      ],
      thisWeek: [
        { name: "Mon", hours: 0 },
        { name: "Tue", hours: 0 },
        { name: "Wed", hours: 0 },
        { name: "Thu", hours: 0 },
        { name: "Fri", hours: 0 },
        { name: "Sat", hours: 0 },
        { name: "Sun", hours: 0 },
      ],
      thisMonth: [
        { name: "Week 1", hours: 0 },
        { name: "Week 2", hours: 0 },
        { name: "Week 3", hours: 0 },
        { name: "Week 4", hours: 0 },
      ],
      lastMonth: [
        { name: "Week 1", hours: 0 },
        { name: "Week 2", hours: 0 },
        { name: "Week 3", hours: 0 },
        { name: "Week 4", hours: 0 },
      ],
      last3Months: [
        { name: "Month 1", hours: 0 },
        { name: "Month 2", hours: 0 },
        { name: "Month 3", hours: 0 },
      ],
      thisYear: [
        { name: "Q1", hours: 0 },
        { name: "Q2", hours: 0 },
        { name: "Q3", hours: 0 },
        { name: "Q4", hours: 0 },
      ],
      custom: [
        { name: "Period 1", hours: 0 },
        { name: "Period 2", hours: 0 },
        { name: "Period 3", hours: 0 },
      ],
    }

    // Set data based on dateRange
    setData(dataByRange[dateRange as keyof typeof dataByRange] || dataByRange.thisMonth)
  }, [dateRange])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
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
        <Bar dataKey="hours" fill="#4285F4" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
