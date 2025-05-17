"use client"

import { useRouter } from "next/navigation"
import { Calendar, Clock, CheckCircle, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function BookingConfirmationPage({ params }: { params: { slug: string } }) {
  const router = useRouter()

  // In a real app, this would be fetched from state or API
  const booking = {
    meetingName: "Initial Consultation",
    host: "Alex Johnson",
    date: "Monday, May 13, 2025",
    time: "10:00 AM",
    duration: 30,
    timezone: "Eastern Time",
    location: "Web conferencing (details sent via email)",
  }

  // Handle add to calendar
  const handleAddToCalendar = () => {
    // In a real app, this would generate and download an .ics file
    console.log("Adding to calendar...")

    // Simulate download delay
    setTimeout(() => {
      alert("Calendar invite downloaded!")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Progress indicator */}
      <div className="border-b border-[#2A2A2A]">
        <div className="container mx-auto max-w-4xl px-4 py-3">
          <div className="flex justify-between">
            <div className="flex items-center gap-2 text-gray-400">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2A2A2A] text-xs font-medium text-gray-300">
                1
              </div>
              <span className="text-sm text-gray-300">Time</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2A2A2A] text-xs font-medium text-gray-300">
                2
              </div>
              <span className="text-sm text-gray-300">Details</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#7747FF] text-xs font-medium text-white">
                3
              </div>
              <span className="text-sm font-medium text-white">Confirmation</span>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto max-w-2xl px-4 py-12">
        <Card className="p-8 text-center bg-[#1A1A1A] border-[#2A2A2A]">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-[#7747FF]" />
          </div>

          <h1 className="text-2xl font-bold mb-2 text-white">Booking Confirmed!</h1>
          <p className="text-gray-300 mb-8">
            You're scheduled with {booking.host} for a {booking.duration}-minute meeting.
          </p>

          <div className="bg-[#2A2A2A] rounded-lg p-6 mb-8">
            <h2 className="font-semibold text-lg mb-4 text-white">{booking.meetingName}</h2>

            <div className="flex items-start gap-3 mb-3 justify-center">
              <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="font-medium text-white">{booking.date}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 mb-3 justify-center">
              <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="font-medium text-white">
                  {booking.time} ({booking.timezone})
                </p>
                <p className="text-sm text-gray-400">{booking.duration} minutes</p>
              </div>
            </div>

            <p className="text-sm text-gray-400 mt-4">
              A calendar invitation and confirmation email have been sent to your email address.
            </p>
          </div>

          <Button onClick={handleAddToCalendar} className="bg-[#7747FF] hover:bg-[#6a3ee6] text-white">
            <Download className="mr-2 h-4 w-4" />
            Add to Calendar
          </Button>
        </Card>
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
