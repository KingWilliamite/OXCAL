"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowDown, ArrowUp, BarChart3, Calendar, Filter, LineChart, TrendingUp } from "lucide-react"
import { MeetingTrendsChart } from "./meeting-trends-chart"
import { MeetingTypeDistribution } from "./meeting-type-distribution"
import { TimeUsageByDay } from "./time-usage-by-day"
import { CompletionRateChart } from "./completion-rate-chart"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { DateRange } from "react-day-picker"
import { format, subDays } from "date-fns"
import { DatePickerWithRange } from "../ui/date-picker-with-range"

export function AnalyticsDashboard() {
  const [dateRange, setDateRange] = useState("thisMonth")
  const [selectedDateLabel, setSelectedDateLabel] = useState("This Month")
  const [customDateRange, setCustomDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  })
  const [isCustomRangeOpen, setIsCustomRangeOpen] = useState(false)

  // Update the selected date label when dateRange changes
  useEffect(() => {
    switch (dateRange) {
      case "today":
        setSelectedDateLabel("Today")
        break
      case "thisWeek":
        setSelectedDateLabel("This Week")
        break
      case "thisMonth":
        setSelectedDateLabel("This Month")
        break
      case "lastMonth":
        setSelectedDateLabel("Last Month")
        break
      case "last3Months":
        setSelectedDateLabel("Last 3 Months")
        break
      case "thisYear":
        setSelectedDateLabel("This Year")
        break
      case "custom":
        if (customDateRange?.from && customDateRange?.to) {
          setSelectedDateLabel(
            `${format(customDateRange.from, "MMM d, yyyy")} - ${format(customDateRange.to, "MMM d, yyyy")}`,
          )
        } else {
          setSelectedDateLabel("Custom Range")
        }
        break
      default:
        setSelectedDateLabel("This Month")
    }
  }, [dateRange, customDateRange])

  // Function to handle date range change
  const handleDateRangeChange = (value: string) => {
    console.log("Date range changed to:", value)
    setDateRange(value)

    // If custom is selected, open the date picker
    if (value === "custom") {
      setIsCustomRangeOpen(true)
    } else {
      setIsCustomRangeOpen(false)
    }
  }

  // Function to handle custom date range selection
  const handleCustomDateChange = (range: DateRange | undefined) => {
    if (range) {
      setCustomDateRange(range)
      // Only close the popover if both from and to dates are selected
      if (range.from && range.to) {
        setIsCustomRangeOpen(false)
      }
    }
  }

  return (
    <div className="flex h-full flex-col bg-[#121212]">
      <div className="flex items-center justify-between border-b border-[#2A2A2A] px-6 py-4">
        <div>
          <h1 className="text-xl font-semibold text-white">Analytics Dashboard</h1>
          <p className="text-sm text-gray-400">
            Viewing data for <span className="font-medium text-white">{selectedDateLabel}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={dateRange} onValueChange={handleDateRangeChange}>
            <SelectTrigger className="w-[180px] border-[#2A2A2A] bg-[#1E1E1E] text-white">
              <SelectValue>{selectedDateLabel}</SelectValue>
            </SelectTrigger>
            <SelectContent className="border-[#2A2A2A] bg-[#1E1E1E] text-white">
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="thisWeek">This Week</SelectItem>
              <SelectItem value="thisMonth">This Month</SelectItem>
              <SelectItem value="lastMonth">Last Month</SelectItem>
              <SelectItem value="last3Months">Last 3 Months</SelectItem>
              <SelectItem value="thisYear">This Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>

          {/* Custom Date Range Picker */}
          <Popover open={isCustomRangeOpen} onOpenChange={setIsCustomRangeOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`border-[#2A2A2A] bg-[#1E1E1E] text-white hover:bg-[#2A2A2A] ${dateRange !== "custom" ? "hidden" : ""}`}
              >
                {customDateRange?.from && customDateRange?.to
                  ? `${format(customDateRange.from, "MMM d")} - ${format(customDateRange.to, "MMM d")}`
                  : "Select dates"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto border-[#2A2A2A] bg-[#1E1E1E] p-0" align="end">
              <DatePickerWithRange date={customDateRange} onDateChange={handleCustomDateChange} />
            </PopoverContent>
          </Popover>

          <Button variant="outline" className="border-[#2A2A2A] bg-[#1E1E1E] text-white hover:bg-[#2A2A2A]">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-[#2A2A2A] bg-[#1E1E1E]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-full bg-[#7747FF]/10 p-2">
                <Calendar className="h-5 w-5 text-[#7747FF]" />
              </div>
              <div className="flex items-center text-sm text-green-500">
                <ArrowUp className="mr-1 h-3 w-3" />
                0%
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-400">Total Meetings</p>
              <h3 className="text-3xl font-bold text-white">0</h3>
              <p className="mt-1 text-xs text-gray-400">vs. previous period</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#2A2A2A] bg-[#1E1E1E]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-full bg-[#4285F4]/10 p-2">
                <TrendingUp className="h-5 w-5 text-[#4285F4]" />
              </div>
              <div className="flex items-center text-sm text-red-500">
                <ArrowDown className="mr-1 h-3 w-3" />
                0%
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-400">Average Duration</p>
              <h3 className="text-3xl font-bold text-white">0 min</h3>
              <p className="mt-1 text-xs text-gray-400">vs. previous period</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#2A2A2A] bg-[#1E1E1E]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-full bg-[#34A853]/10 p-2">
                <BarChart3 className="h-5 w-5 text-[#34A853]" />
              </div>
              <div className="flex items-center text-sm text-green-500">
                <ArrowUp className="mr-1 h-3 w-3" />
                0%
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-400">Completion Rate</p>
              <h3 className="text-3xl font-bold text-white">0%</h3>
              <p className="mt-1 text-xs text-gray-400">vs. previous period</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#2A2A2A] bg-[#1E1E1E]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-full bg-[#FBBC05]/10 p-2">
                <LineChart className="h-5 w-5 text-[#FBBC05]" />
              </div>
              <div className="flex items-center text-sm text-green-500">
                <ArrowUp className="mr-1 h-3 w-3" />
                0%
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-400">Booking Conversion</p>
              <h3 className="text-3xl font-bold text-white">0%</h3>
              <p className="mt-1 text-xs text-gray-400">vs. previous period</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2">
        {/* Meeting Trends */}
        <Card className="border-[#2A2A2A] bg-[#1E1E1E]">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-white">Meeting Trends</CardTitle>
            <CardDescription className="text-gray-400">Number of meetings over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <MeetingTrendsChart dateRange={dateRange} customDateRange={customDateRange} />
            </div>
          </CardContent>
        </Card>

        {/* Meeting Type Distribution */}
        <Card className="border-[#2A2A2A] bg-[#1E1E1E]">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-white">Meeting Type Distribution</CardTitle>
            <CardDescription className="text-gray-400">Breakdown of meetings by type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <MeetingTypeDistribution dateRange={dateRange} customDateRange={customDateRange} />
            </div>
          </CardContent>
        </Card>

        {/* Time Usage by Day */}
        <Card className="border-[#2A2A2A] bg-[#1E1E1E]">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-white">Time Usage by Day</CardTitle>
            <CardDescription className="text-gray-400">Hours spent in meetings by day of week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <TimeUsageByDay dateRange={dateRange} customDateRange={customDateRange} />
            </div>
          </CardContent>
        </Card>

        {/* Completion Rate Over Time */}
        <Card className="border-[#2A2A2A] bg-[#1E1E1E]">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-white">Completion Rate</CardTitle>
            <CardDescription className="text-gray-400">Meeting completion rate over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <CompletionRateChart dateRange={dateRange} customDateRange={customDateRange} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
