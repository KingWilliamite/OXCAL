"use client"

import { useState } from "react"
import { Search, Filter, Calendar, Users, BarChart3, Sliders } from "lucide-react"
import { MeetingStatistics } from "./meeting-statistics"
import { MeetingList } from "./meeting-list"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export type MeetingStatus = "confirmed" | "pending" | "canceled" | "completed" | "needs-preparation"
export type MeetingType =
  | "Consultation"
  | "Service Work"
  | "Sales Call"
  | "Team Meeting"
  | "Client Onboarding"
  | "Project Review"
  | "Strategy Session"
  | "Interview"

export interface Meeting {
  id: string
  title: string
  clientName: string
  clientEmail: string
  clientAvatar?: string
  date: string // ISO date string
  startTime: string
  endTime: string
  duration: number // in minutes
  type: MeetingType
  status: MeetingStatus
  location: string
  notes?: string
  isRecurring: boolean
  teamMembers?: string[]
}

export function MeetingManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [dateFilter, setDateFilter] = useState<string>("upcoming")
  const [viewMode, setViewMode] = useState<"standard" | "compact">("standard")

  // Mock statistics data
  const statistics = {
    today: 0,
    upcoming: 0,
    needsPreparation: 0,
    completionRate: 0,
  }

  // Filter meetings based on current filters
  const filterMeetings = (meetings: Meeting[]) => {
    return meetings.filter((meeting) => {
      // Search query filter
      if (
        searchQuery &&
        !meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !meeting.clientName.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      // Status filter
      if (statusFilter !== "all" && meeting.status !== statusFilter) {
        return false
      }

      // Type filter
      if (typeFilter !== "all" && meeting.type !== typeFilter) {
        return false
      }

      // Date filter
      const meetingDate = new Date(meeting.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (dateFilter === "today") {
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        return meetingDate >= today && meetingDate < tomorrow
      } else if (dateFilter === "upcoming") {
        return meetingDate >= today
      } else if (dateFilter === "past") {
        return meetingDate < today
      } else if (dateFilter === "thisWeek") {
        const endOfWeek = new Date(today)
        endOfWeek.setDate(endOfWeek.getDate() + (7 - endOfWeek.getDay()))
        return meetingDate >= today && meetingDate <= endOfWeek
      }

      return true
    })
  }

  return (
    <div className="flex h-full flex-col bg-[#121212]">
      <div className="flex items-center justify-between border-b border-[#2A2A2A] px-6 py-4">
        <h1 className="text-xl font-semibold text-white">Team Meeting Management</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 border-[#2A2A2A] bg-[#1E1E1E] text-white hover:bg-[#2A2A2A]">
            <Calendar className="h-4 w-4" />
            Calendar View
          </Button>
          <Button className="gap-2 bg-[#7747FF] text-white hover:bg-[#8A5CFF]">
            <Users className="h-4 w-4" />
            Team Availability
          </Button>
        </div>
      </div>

      {/* Statistics Section */}
      <MeetingStatistics statistics={statistics} />

      {/* Filters Section */}
      <div className="border-b border-[#2A2A2A] bg-[#1E1E1E] px-6 py-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search meetings or clients..."
                className="border-[#2A2A2A] bg-[#121212] pl-9 text-white placeholder:text-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="border-[#2A2A2A] bg-[#121212] text-white hover:bg-[#2A2A2A]">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px] border-[#2A2A2A] bg-[#121212] text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-[#1E1E1E] text-white">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="needs-preparation">Needs Prep</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="canceled">Canceled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[140px] border-[#2A2A2A] bg-[#121212] text-white">
                <SelectValue placeholder="Meeting Type" />
              </SelectTrigger>
              <SelectContent className="bg-[#1E1E1E] text-white">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Consultation">Consultation</SelectItem>
                <SelectItem value="Service Work">Service Work</SelectItem>
                <SelectItem value="Sales Call">Sales Call</SelectItem>
                <SelectItem value="Team Meeting">Team Meeting</SelectItem>
                <SelectItem value="Client Onboarding">Client Onboarding</SelectItem>
                <SelectItem value="Project Review">Project Review</SelectItem>
                <SelectItem value="Strategy Session">Strategy Session</SelectItem>
                <SelectItem value="Interview">Interview</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-[140px] border-[#2A2A2A] bg-[#121212] text-white">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent className="bg-[#1E1E1E] text-white">
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="thisWeek">This Week</SelectItem>
                <SelectItem value="past">Past</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center rounded-md border border-[#2A2A2A] bg-[#121212] p-1">
              <Button
                variant={viewMode === "standard" ? "default" : "ghost"}
                size="sm"
                className={viewMode === "standard" ? "bg-[#2A2A2A] text-white" : "text-white"}
                onClick={() => setViewMode("standard")}
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "compact" ? "default" : "ghost"}
                size="sm"
                className={viewMode === "compact" ? "bg-[#2A2A2A] text-white" : "text-white"}
                onClick={() => setViewMode("compact")}
              >
                <Sliders className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="bg-[#121212]">
              <TabsTrigger
                value="all"
                className="text-white data-[state=active]:bg-[#2A2A2A] data-[state=active]:text-white"
              >
                All Meetings
              </TabsTrigger>
              <TabsTrigger
                value="mine"
                className="text-white data-[state=active]:bg-[#2A2A2A] data-[state=active]:text-white"
              >
                My Meetings
              </TabsTrigger>
              <TabsTrigger
                value="team"
                className="text-white data-[state=active]:bg-[#2A2A2A] data-[state=active]:text-white"
              >
                Team Meetings
              </TabsTrigger>
              <TabsTrigger
                value="delegated"
                className="text-white data-[state=active]:bg-[#2A2A2A] data-[state=active]:text-white"
              >
                Delegated
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Meetings List */}
      <div className="flex-1 overflow-auto p-6">
        <MeetingList viewMode={viewMode} />
      </div>
    </div>
  )
}
