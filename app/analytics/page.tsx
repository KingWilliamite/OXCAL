"use client"

import { useState, useEffect } from "react"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Info } from "lucide-react"

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("last7Days")
  const [selectedDateLabel, setSelectedDateLabel] = useState("Last 7 Days")

  useEffect(() => {
    // Update the date range label when the date range changes
    switch (dateRange) {
      case "today":
        setSelectedDateLabel("Today")
        break
      case "yesterday":
        setSelectedDateLabel("Yesterday")
        break
      case "last7Days":
        setSelectedDateLabel("Last 7 Days")
        break
      case "last30Days":
        setSelectedDateLabel("Last 30 Days")
        break
      case "thisMonth":
        setSelectedDateLabel("This Month")
        break
      case "lastMonth":
        setSelectedDateLabel("Last Month")
        break
      case "customRange":
        setSelectedDateLabel("Custom Range")
        break
      default:
        setSelectedDateLabel("Last 7 Days")
    }
  }, [dateRange])

  // Empty state component
  const EmptyState = ({ message }: { message: string }) => (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <Info className="h-12 w-12 text-gray-500 mb-4" />
      <p className="text-gray-400 mb-2">{message}</p>
      <p className="text-sm text-gray-500">Data will appear here once your account has activity.</p>
    </div>
  )

  return (
    <div className="flex h-screen bg-[#121212]">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <div className="flex items-center">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px] bg-[#2A2A2A] border-[#3A3A3A] text-white">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent className="bg-[#2A2A2A] border-[#3A3A3A] text-white">
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="last7Days">Last 7 Days</SelectItem>
                <SelectItem value="last30Days">Last 30 Days</SelectItem>
                <SelectItem value="thisMonth">This Month</SelectItem>
                <SelectItem value="lastMonth">Last Month</SelectItem>
                <SelectItem value="customRange">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-medium text-white mb-2">Overview</h2>
          <p className="text-gray-400">{selectedDateLabel}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-[#1A1A1A] border-[#3A3A3A] text-white">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-400">Total Meetings</CardDescription>
              <CardTitle className="text-3xl">0</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-400 flex items-center">
                <span>No previous data</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#1A1A1A] border-[#3A3A3A] text-white">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-400">Average Duration</CardDescription>
              <CardTitle className="text-3xl">0 min</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-400 flex items-center">
                <span>No previous data</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#1A1A1A] border-[#3A3A3A] text-white">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-400">Completion Rate</CardDescription>
              <CardTitle className="text-3xl">0%</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-400 flex items-center">
                <span>No previous data</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="bg-[#1A1A1A] border-[#3A3A3A] text-white">
            <CardHeader>
              <CardTitle className="text-lg">Meeting Trends</CardTitle>
              <CardDescription className="text-gray-400">{selectedDateLabel}</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <EmptyState message="No meeting data available yet" />
            </CardContent>
          </Card>

          <Card className="bg-[#1A1A1A] border-[#3A3A3A] text-white">
            <CardHeader>
              <CardTitle className="text-lg">Meeting Type Distribution</CardTitle>
              <CardDescription className="text-gray-400">{selectedDateLabel}</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <EmptyState message="No meeting type data available yet" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-[#1A1A1A] border-[#3A3A3A] text-white">
            <CardHeader>
              <CardTitle className="text-lg">Time Usage by Day</CardTitle>
              <CardDescription className="text-gray-400">{selectedDateLabel}</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <EmptyState message="No time usage data available yet" />
            </CardContent>
          </Card>

          <Card className="bg-[#1A1A1A] border-[#3A3A3A] text-white">
            <CardHeader>
              <CardTitle className="text-lg">Completion Rate by Meeting Type</CardTitle>
              <CardDescription className="text-gray-400">{selectedDateLabel}</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <EmptyState message="No completion rate data available yet" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
