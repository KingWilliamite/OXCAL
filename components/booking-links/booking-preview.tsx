"use client"

import { CalendarIcon, Clock, Video } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useMemo } from "react"

interface BookingPreviewProps {
  formData: any
}

export function BookingPreview({ formData }: BookingPreviewProps) {
  // Generate time slots based on available hours
  const timeSlots = useMemo(() => {
    const slots = []
    const startHour = Number.parseInt(formData.availableHours?.start?.split(":")[0] || "9", 10)
    const endHour = Number.parseInt(formData.availableHours?.end?.split(":")[0] || "17", 10)

    // Show a sample of time slots (up to 6)
    const maxSlotsToShow = 6
    const totalHours = endHour - startHour
    const step = totalHours > maxSlotsToShow ? Math.ceil(totalHours / maxSlotsToShow) : 1

    for (let hour = startHour; hour <= endHour && slots.length < maxSlotsToShow; hour += step) {
      const formattedHour = hour % 12 || 12
      const ampm = hour < 12 ? "AM" : "PM"
      slots.push(`${formattedHour}:00 ${ampm}`)
    }

    return slots
  }, [formData.availableHours?.start, formData.availableHours?.end])

  return (
    <div className="rounded-lg bg-[#1A1A1A] overflow-hidden">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-10 w-10 bg-[#7747FF]">
            <AvatarImage src="/abstract-profile.png" alt="Your Name" />
            <AvatarFallback className="text-white">OC</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-white">Your Name</h3>
            <p className="text-xs text-gray-400">OxCal Scheduling</p>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-2 text-white">{formData.meetingName || "Initial Consultation"}</h2>

        <div className="flex items-center gap-2 mb-2 text-sm text-gray-300">
          <Clock className="h-4 w-4" />
          <span>{formData.duration || 30} minutes</span>
        </div>

        <div className="flex items-center gap-2 mb-4 text-sm text-gray-300">
          <Video className="h-4 w-4" />
          <span>Web conferencing details provided upon confirmation</span>
        </div>
      </div>

      <div className="border-t border-[#2A2A2A] p-4">
        <div className="flex items-center gap-2 mb-4 text-white">
          <CalendarIcon className="h-5 w-5 text-[#7747FF]" />
          <span className="font-medium">Select a Date & Time</span>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="text-center p-2 rounded-md bg-[#2A2A2A]">
            <div className="text-xs text-gray-400">Thu</div>
            <div className="text-lg font-medium text-white">8</div>
            <div className="text-xs text-gray-400">May</div>
          </div>
          <div className="text-center p-2 rounded-md bg-[#2A2A2A]">
            <div className="text-xs text-gray-400">Fri</div>
            <div className="text-lg font-medium text-white">9</div>
            <div className="text-xs text-gray-400">May</div>
          </div>
          <div className="text-center p-2 rounded-md bg-[#7747FF]">
            <div className="text-xs text-white">Sat</div>
            <div className="text-lg font-medium text-white">10</div>
            <div className="text-xs text-white">May</div>
          </div>
          <div className="text-center p-2 rounded-md bg-[#2A2A2A]">
            <div className="text-xs text-gray-400">Sun</div>
            <div className="text-lg font-medium text-white">11</div>
            <div className="text-xs text-gray-400">May</div>
          </div>
        </div>

        <div className="mb-2 text-sm font-medium text-white">Available Times</div>
        <div className="grid grid-cols-3 gap-2">
          {timeSlots.map((time, index) => (
            <div
              key={index}
              className={`text-center p-2 rounded-md border border-[#3A3A3A] bg-[#2A2A2A] text-white text-sm ${
                index === 1 ? "border-[#7747FF] bg-[#7747FF]" : ""
              }`}
            >
              {time}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
