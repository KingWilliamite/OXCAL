"use client"

import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

interface MeetingTypeDistributionProps {
  dateRange: string
}

export function MeetingTypeDistribution({ dateRange }: MeetingTypeDistributionProps) {
  const [data, setData] = useState<any[]>([])

  // Update data based on dateRange
  useEffect(() => {
    // Different data for different date ranges
    const dataByRange = {
      today: [
        { name: "One-on-One", value: 1, color: "#7747FF" },
        { name: "Team Meeting", value: 1, color: "#4285F4" },
      ],
      thisWeek: [
        { name: "One-on-One", value: 1, color: "#7747FF" },
        { name: "Team Meeting", value: 1, color: "#4285F4" },
        { name: "Client Call", value: 1, color: "#34A853" },
      ],
      thisMonth: [
        { name: "One-on-One", value: 1, color: "#7747FF" },
        { name: "Team Meeting", value: 1, color: "#4285F4" },
        { name: "Client Call", value: 1, color: "#34A853" },
        { name: "Interview", value: 1, color: "#FBBC05" },
      ],
      lastMonth: [
        { name: "One-on-One", value: 1, color: "#7747FF" },
        { name: "Team Meeting", value: 1, color: "#4285F4" },
        { name: "Client Call", value: 1, color: "#34A853" },
        { name: "Interview", value: 1, color: "#FBBC05" },
        { name: "Training", value: 1, color: "#EA4335" },
      ],
      last3Months: [
        { name: "One-on-One", value: 1, color: "#7747FF" },
        { name: "Team Meeting", value: 1, color: "#4285F4" },
        { name: "Client Call", value: 1, color: "#34A853" },
        { name: "Interview", value: 1, color: "#FBBC05" },
        { name: "Training", value: 1, color: "#EA4335" },
        { name: "Workshop", value: 1, color: "#9C27B0" },
      ],
      thisYear: [
        { name: "One-on-One", value: 1, color: "#7747FF" },
        { name: "Team Meeting", value: 1, color: "#4285F4" },
        { name: "Client Call", value: 1, color: "#34A853" },
        { name: "Interview", value: 1, color: "#FBBC05" },
        { name: "Training", value: 1, color: "#EA4335" },
        { name: "Workshop", value: 1, color: "#9C27B0" },
        { name: "Conference", value: 1, color: "#00BCD4" },
      ],
      custom: [
        { name: "One-on-One", value: 1, color: "#7747FF" },
        { name: "Team Meeting", value: 1, color: "#4285F4" },
        { name: "Client Call", value: 1, color: "#34A853" },
        { name: "Other", value: 1, color: "#FBBC05" },
      ],
    }

    // Set data based on dateRange
    setData(dataByRange[dateRange as keyof typeof dataByRange] || dataByRange.thisMonth)
  }, [dateRange])

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Manual legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {data.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center">
            <div className="mr-2 h-3 w-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-sm text-white">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
