"use client"

import { useState, useEffect } from "react"
import { format, addDays, startOfWeek, addWeeks, isSameDay } from "date-fns"
import { CalendarIcon, Clock, ChevronRight, ChevronLeft, Video, Globe, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { AvatarImage } from "@/components/ui/avatar"
import { AvatarFallback } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"

export default function BookingPage({ params }: { params: { slug: string } }) {
  // Sample meeting data - in a real app, this would be fetched based on the slug
  const meeting = {
    name: "Initial Consultation",
    host: "Alex Johnson",
    hostTitle: "Senior Consultant",
    duration: 30,
    description: "A brief introduction call to discuss your needs and how we might work together.",
    type: "Consultation",
    availableHours: {
      start: "00:00",
      end: "23:00",
    },
  }

  // State for selected date and time
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [timeSlots, setTimeSlots] = useState<string[]>([])

  const router = useRouter()

  // Current date for calendar navigation
  const [currentDate, setCurrentDate] = useState(new Date())

  // Get the start of the current week (Monday)
  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 })

  // Generate dates for the next 2 weeks
  const dates = Array.from({ length: 14 }, (_, i) => addDays(startOfCurrentWeek, i))

  // Generate time slots based on available hours - only once when component mounts
  useEffect(() => {
    const generateTimeSlots = () => {
      const slots: string[] = []
      // Default to 9-17 if no hours are provided
      const startHour = Number.parseInt(meeting.availableHours?.start?.split(":")[0] || "9", 10)
      const endHour = Number.parseInt(meeting.availableHours?.end?.split(":")[0] || "17", 10)

      for (let hour = startHour; hour <= endHour; hour++) {
        const formattedHour = hour % 12 || 12
        const ampm = hour < 12 ? "AM" : "PM"

        slots.push(`${formattedHour}:00 ${ampm}`)

        // Add half-hour slots
        if (hour < endHour) {
          slots.push(`${formattedHour}:30 ${ampm}`)
        }
      }

      return slots
    }

    setTimeSlots(generateTimeSlots())
  }, []) // Empty dependency array - only run once on mount

  // Navigate to previous/next week
  const goToPreviousWeek = () => {
    setCurrentDate(addWeeks(currentDate, -1))
  }

  const goToNextWeek = () => {
    setCurrentDate(addWeeks(currentDate, 1))
  }

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setSelectedTime(null) // Reset time selection when date changes
  }

  // Handle time selection
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  // Format date for display
  const formatDateForDisplay = (date: Date) => {
    return format(date, "EEE, MMM d")
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Progress indicator */}
      <div className="border-b border-[#2A2A2A]">
        <div className="container mx-auto max-w-4xl px-4 py-3">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#7747FF] text-xs font-medium text-white">
                1
              </div>
              <span className="text-sm font-medium text-white">Time</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2A2A2A] text-xs font-medium text-gray-300">
                2
              </div>
              <span className="text-sm text-gray-300">Details</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2A2A2A] text-xs font-medium text-gray-300">
                3
              </div>
              <span className="text-sm text-gray-300">Confirmation</span>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="grid gap-8 md:grid-cols-5">
          {/* Meeting info - takes up 2 columns on medium screens and above */}
          <div className="md:col-span-2">
            <div className="sticky top-8">
              <div className="flex items-center gap-3 mb-6">
                <Avatar className="h-12 w-12 border border-[#2A2A2A] bg-[#1A1A1A]">
                  <AvatarImage src="/abstract-profile.png" alt={meeting.host} />
                  <AvatarFallback className="bg-[#2A2A2A] text-white">AJ</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-white">{meeting.host}</h3>
                  <p className="text-sm text-gray-400">{meeting.hostTitle}</p>
                </div>
              </div>

              <h1 className="text-2xl font-bold mb-4 text-white">{meeting.name}</h1>

              <div className="flex items-start gap-3 mb-3">
                <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium text-white">{meeting.duration} minutes</p>
                </div>
              </div>

              <div className="flex items-start gap-3 mb-6">
                <Video className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Web conferencing</p>
                  <p className="text-sm text-gray-400">Details provided upon confirmation</p>
                </div>
              </div>

              <p className="text-gray-300">{meeting.description}</p>
            </div>
          </div>

          {/* Date and time selection - takes up 3 columns on medium screens and above */}
          <div className="md:col-span-3">
            <Card className="p-6 bg-[#1A1A1A] border-[#2A2A2A]">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-white">
                <CalendarIcon className="h-5 w-5 text-[#7747FF]" />
                Select a Date & Time
              </h2>

              {/* Date selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-white">Date</h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={goToPreviousWeek}
                      className="h-8 w-8 bg-[#2A2A2A] border-[#3A3A3A] text-white hover:bg-[#3A3A3A] hover:text-white"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={goToNextWeek}
                      className="h-8 w-8 bg-[#2A2A2A] border-[#3A3A3A] text-white hover:bg-[#3A3A3A] hover:text-white"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {dates.slice(0, 7).map((date, index) => (
                    <button
                      key={index}
                      className={`flex flex-col items-center rounded-md p-2 ${
                        selectedDate && isSameDay(date, selectedDate)
                          ? "bg-[#7747FF] text-white"
                          : "bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]"
                      }`}
                      onClick={() => handleDateSelect(date)}
                    >
                      <span className="text-xs">{format(date, "EEE")}</span>
                      <span className="text-lg font-medium">{format(date, "d")}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-2 grid grid-cols-7 gap-2">
                  {dates.slice(7, 14).map((date, index) => (
                    <button
                      key={index + 7}
                      className={`flex flex-col items-center rounded-md p-2 ${
                        selectedDate && isSameDay(date, selectedDate)
                          ? "bg-[#7747FF] text-white"
                          : "bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]"
                      }`}
                      onClick={() => handleDateSelect(date)}
                    >
                      <span className="text-xs">{format(date, "EEE")}</span>
                      <span className="text-lg font-medium">{format(date, "d")}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time selector - only show if a date is selected */}
              {selectedDate && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-white">Time slots for {formatDateForDisplay(selectedDate)}</h3>
                    <span className="text-sm text-gray-400">Eastern Time</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 max-h-[300px] overflow-y-auto pr-2">
                    {timeSlots.map((time, index) => (
                      <button
                        key={index}
                        className={`rounded-md border p-2 text-center text-sm ${
                          selectedTime === time
                            ? "border-[#7747FF] bg-[#7747FF] text-white"
                            : "border-[#3A3A3A] bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]"
                        }`}
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Timezone information */}
              <div className="mt-8 flex items-center gap-2 text-sm text-gray-400">
                <Globe className="h-4 w-4" />
                <span>Times shown in Eastern Time (GMT-4)</span>
              </div>

              {/* Next button - only enable if both date and time are selected */}
              <div className="mt-8 flex justify-end">
                <Button
                  className="bg-[#7747FF] hover:bg-[#6a3ee6] text-white"
                  disabled={!selectedDate || !selectedTime}
                  onClick={() => {
                    if (selectedDate && selectedTime) {
                      router.push(`/booking/${params.slug}/details`)
                    }
                  }}
                >
                  Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t border-[#2A2A2A] py-6">
        <div className="container mx-auto max-w-4xl px-4">
          <p className="text-center text-sm text-gray-400">
            Powered by <span className="font-semibold text-[#7747FF]">OxCal</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
