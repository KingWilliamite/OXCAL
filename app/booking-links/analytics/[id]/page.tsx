"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, Info } from "lucide-react"
import Link from "next/link"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Button } from "@/components/ui/button"

export default function BookingLinkAnalyticsPage() {
  const params = useParams()
  const id = params?.id as string
  const [bookingLink, setBookingLink] = useState<{
    id: string
    name: string
    link: string
    views: number
    createdAt: string
  } | null>(null)
  const [dateRange, setDateRange] = useState("last7Days")
  const [selectedDateLabel, setSelectedDateLabel] = useState("Last 7 Days")

  useEffect(() => {
    // Load booking links from localStorage
    const savedLinks = localStorage.getItem("bookingLinks")
    if (savedLinks) {
      try {
        const parsedLinks = JSON.parse(savedLinks)
        if (Array.isArray(parsedLinks)) {
          const link = parsedLinks.find((link) => link.id === id)
          if (link) {
            setBookingLink(link)
          }
        }
      } catch (error) {
        console.error("Error parsing booking links from localStorage:", error)
      }
    }
  }, [id])

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

  // Empty data for charts
  const emptyTimeData = [
    { date: "Mon", views: 0, bookings: 0 },
    { date: "Tue", views: 0, bookings: 0 },
    { date: "Wed", views: 0, bookings: 0 },
    { date: "Thu", views: 0, bookings: 0 },
    { date: "Fri", views: 0, bookings: 0 },
    { date: "Sat", views: 0, bookings: 0 },
    { date: "Sun", views: 0, bookings: 0 },
  ]

  const emptyConversionData = [{ name: "No Data", value: 1 }]

  const emptyTimeSlotData = [
    { time: "9:00 AM", bookings: 0 },
    { time: "10:00 AM", bookings: 0 },
    { time: "11:00 AM", bookings: 0 },
    { time: "12:00 PM", bookings: 0 },
    { time: "1:00 PM", bookings: 0 },
    { time: "2:00 PM", bookings: 0 },
    { time: "3:00 PM", bookings: 0 },
    { time: "4:00 PM", bookings: 0 },
  ]

  const COLORS = ["#7747FF", "#FF6B6B", "#4ECDC4", "#FFD166"]

  // Empty state component
  const EmptyState = ({ message }: { message: string }) => (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <Info className="h-12 w-12 text-gray-500 mb-4" />
      <p className="text-gray-400 mb-2">{message}</p>
      <p className="text-sm text-gray-500">Data will appear here once your booking link receives activity.</p>
    </div>
  )

  if (!bookingLink) {
    return (
      <div className="flex h-screen bg-[#121212]">
        <DashboardSidebar />
        <div className="flex-1 p-6">
          <div className="flex items-center mb-6">
            <Link href="/booking-links" className="flex items-center text-gray-400 hover:text-white mr-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back to Booking Links</span>
            </Link>
          </div>
          <div className="flex items-center justify-center h-full">
            <p className="text-white">Booking link not found.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-[#121212]">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link href="/booking-links" className="flex items-center text-gray-400 hover:text-white mr-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back to Booking Links</span>
            </Link>
            <h1 className="text-2xl font-bold text-white">{bookingLink.name} Analytics</h1>
          </div>
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
              <CardDescription className="text-gray-400">Total Views</CardDescription>
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
              <CardDescription className="text-gray-400">Total Bookings</CardDescription>
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
              <CardDescription className="text-gray-400">Conversion Rate</CardDescription>
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
              <CardTitle className="text-lg">Views & Bookings Over Time</CardTitle>
              <CardDescription className="text-gray-400">{selectedDateLabel}</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              {bookingLink.views > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={emptyTimeData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="date" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#2A2A2A", border: "1px solid #3A3A3A", color: "#fff" }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="views" stroke="#7747FF" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="bookings" stroke="#4ECDC4" />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <EmptyState message="No view or booking data available yet" />
              )}
            </CardContent>
          </Card>

          <Card className="bg-[#1A1A1A] border-[#3A3A3A] text-white">
            <CardHeader>
              <CardTitle className="text-lg">Popular Time Slots</CardTitle>
              <CardDescription className="text-gray-400">{selectedDateLabel}</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              {bookingLink.views > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={emptyTimeSlotData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="time" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#2A2A2A", border: "1px solid #3A3A3A", color: "#fff" }}
                    />
                    <Legend />
                    <Bar dataKey="bookings" fill="#7747FF" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <EmptyState message="No time slot data available yet" />
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-[#1A1A1A] border-[#3A3A3A] text-white">
            <CardHeader>
              <CardTitle className="text-lg">Conversion Rate</CardTitle>
              <CardDescription className="text-gray-400">{selectedDateLabel}</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              {bookingLink.views > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={emptyConversionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {emptyConversionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="#333" />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: "#2A2A2A", border: "1px solid #3A3A3A", color: "#fff" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <EmptyState message="No conversion data available yet" />
              )}
            </CardContent>
          </Card>

          <Card className="bg-[#1A1A1A] border-[#3A3A3A] text-white">
            <CardHeader>
              <CardTitle className="text-lg">Link Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Link Name</h3>
                  <p className="text-white">{bookingLink.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Link URL</h3>
                  <div className="flex items-center">
                    <p className="text-blue-500 truncate mr-2">{bookingLink.link}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white hover:bg-[#2A2A2A]"
                      onClick={() => {
                        navigator.clipboard.writeText(bookingLink.link)
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Created At</h3>
                  <p className="text-white">{bookingLink.createdAt}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Total Views</h3>
                  <p className="text-white">0</p>
                </div>
                <div className="pt-4">
                  <Link
                    href={`/booking-links/edit/${bookingLink.id}`}
                    className="inline-flex items-center justify-center rounded-md bg-[#7747FF] px-4 py-2 text-sm font-medium text-white hover:bg-[#6a3ee6] transition-colors"
                  >
                    Edit Booking Link
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
