"use client"

import { useState } from "react"
import type { Meeting } from "./meeting-management"
import { MeetingCard } from "./meeting-card"
import { DateHeader } from "./date-header"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MeetingListProps {
  viewMode: "standard" | "compact"
}

export function MeetingList({ viewMode }: MeetingListProps) {
  // Mock meetings data
  const [meetings] = useState<Meeting[]>([])

  // Group meetings by date
  const groupedMeetings: Record<string, Meeting[]> = {}

  meetings.forEach((meeting) => {
    if (!groupedMeetings[meeting.date]) {
      groupedMeetings[meeting.date] = []
    }
    groupedMeetings[meeting.date].push(meeting)
  })

  // Sort dates
  const sortedDates = Object.keys(groupedMeetings).sort()

  return (
    <div className="space-y-6">
      {sortedDates.length > 0 ? (
        sortedDates.map((date) => (
          <div key={date} className="space-y-3">
            <DateHeader date={date} count={groupedMeetings[date].length} />
            <div
              className={`grid gap-3 ${viewMode === "compact" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
            >
              {groupedMeetings[date]
                .sort((a, b) => a.startTime.localeCompare(b.startTime))
                .map((meeting) => (
                  <MeetingCard key={meeting.id} meeting={meeting} viewMode={viewMode} />
                ))}
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-[#1E1E1E] p-4">
            <Calendar className="h-8 w-8 text-[#7747FF]" />
          </div>
          <h3 className="mt-4 text-xl font-medium text-white">No meetings found</h3>
          <p className="mt-2 max-w-md text-gray-400">
            There are no meetings matching your current filters. Try adjusting your search or create a new meeting.
          </p>
          <Button className="mt-6 bg-[#7747FF] text-white hover:bg-[#8A5CFF]">Create New Meeting</Button>
        </div>
      )}
    </div>
  )
}
