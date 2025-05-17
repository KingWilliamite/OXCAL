"use client"

import { useEffect, useState } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { DateRange } from "react-day-picker"

// Define the props type
interface MeetingTrendsChartProps {
  dateRange: string
  customDateRange?: DateRange
}

export function MeetingTrendsChart({ dateRange, customDateRange }: MeetingTrendsChartProps) {
  const [data, setData] = useState<any[]>([])

  // Generate data based on dateRange
  useEffect(() => {
    // Data for different date ranges
    const rangeData = {
      today: [
        { name: "12 AM", meetings: 0 },
        { name: "6 AM", meetings: 0 },
        { name: "12 PM", meetings: 0 },
        { name: "6 PM", meetings: 0 },
      ],
      thisWeek: [
        { name: "Mon", meetings: 0 },
        { name: "Tue", meetings: 0 },
        { name: "Wed", meetings: 0 },
        { name: "Thu", meetings: 0 },
        { name: "Fri", meetings: 0 },
        { name: "Sat", meetings: 0 },
        { name: "Sun", meetings: 0 },
      ],
      thisMonth: [
        { name: "Week 1", meetings: 0 },
        { name: "Week 2", meetings: 0 },
        { name: "Week 3", meetings: 0 },
        { name: "Week 4", meetings: 0 },
      ],
      lastMonth: [
        { name: "Week 1", meetings: 0 },
        { name: "Week 2", meetings: 0 },
        { name: "Week 3", meetings: 0 },
        { name: "Week 4", meetings: 0 },
      ],
      last3Months: [
        { name: "Month 1", meetings: 0 },
        { name: "Month 2", meetings: 0 },
        { name: "Month 3", meetings: 0 },
      ],
      thisYear: [
        { name: "Jan", meetings: 0 },
        { name: "Feb", meetings: 0 },
        { name: "Mar", meetings: 0 },
        { name: "Apr", meetings: 0 },
        { name: "May", meetings: 0 },
        { name: "Jun", meetings: 0 },
      ],
      custom: [
        { name: "Start", meetings: 0 },
        { name: "Middle", meetings: 0 },
        { name: "End", meetings: 0 },
      ],
    }

    // Set data based on dateRange
    setData(rangeData[dateRange as keyof typeof rangeData] || rangeData.thisMonth)
  }, [dateRange, customDateRange])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorMeetings" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#7747FF" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#7747FF" stopOpacity={0} />
          </linearGradient>
        </defs>
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
        <Area type="monotone" dataKey="meetings" stroke="#7747FF" fillOpacity={1} fill="url(#colorMeetings)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
