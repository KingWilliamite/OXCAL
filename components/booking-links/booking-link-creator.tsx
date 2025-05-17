"use client"

import { useState, useEffect } from "react"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ProgressIndicator } from "./progress-indicator"
import { MeetingDetailsForm } from "./meeting-details-form"
import { AvailabilityForm } from "./availability-form"
import { QualificationForm } from "./qualification-form"
import { ShareOptions } from "./share-options"
import { BookingPreview } from "./booking-preview"

type Step = "details" | "availability" | "forms" | "share"

interface BookingLinkCreatorProps {
  editingBookingLink?: any
}

export function BookingLinkCreator({ editingBookingLink }: BookingLinkCreatorProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>("details")
  const [formData, setFormData] = useState({
    meetingName: "Initial Consultation",
    meetingType: "Consultation",
    duration: "30",
    calendar: "Google Calendar",
    bufferBefore: "15",
    bufferAfter: "15",
    availableDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    availableHours: {
      start: "09:00",
      end: "17:00",
    },
    limitBookingsPerDay: false,
    maxBookingsPerDay: 8,
    requireMinimumNotice: false,
    minimumNoticeHours: 24,
    questions: [],
    slug: "initial-consultation",
  })

  // If editing, populate form with existing data
  useEffect(() => {
    if (editingBookingLink) {
      setFormData({
        meetingName: editingBookingLink.meetingName || editingBookingLink.name || "Initial Consultation",
        meetingType: editingBookingLink.meetingType || "Consultation",
        duration: editingBookingLink.duration || "30",
        calendar: editingBookingLink.calendar || "Google Calendar",
        bufferBefore: editingBookingLink.bufferBefore || "15",
        bufferAfter: editingBookingLink.bufferAfter || "15",
        availableDays: editingBookingLink.availableDays || ["monday", "tuesday", "wednesday", "thursday", "friday"],
        availableHours: editingBookingLink.availableHours || {
          start: "09:00",
          end: "17:00",
        },
        limitBookingsPerDay: editingBookingLink.limitBookingsPerDay || false,
        maxBookingsPerDay: editingBookingLink.maxBookingsPerDay || 8,
        requireMinimumNotice: editingBookingLink.requireMinimumNotice || false,
        minimumNoticeHours: editingBookingLink.minimumNoticeHours || 24,
        questions: editingBookingLink.questions || [],
        slug: editingBookingLink.slug || "initial-consultation",
      })
    }
  }, [editingBookingLink])

  const handleFormChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleNext = () => {
    if (currentStep === "details") setCurrentStep("availability")
    else if (currentStep === "availability") setCurrentStep("forms")
    else if (currentStep === "forms") setCurrentStep("share")
  }

  const handleCancel = () => {
    router.push("/booking-links")
  }

  const handleCreateLink = () => {
    // In a real app, you would save the form data to your backend
    // For now, we'll use localStorage
    const bookingLinks = JSON.parse(localStorage.getItem("bookingLinks") || "[]")

    if (editingBookingLink) {
      // Update existing link
      const updatedLinks = bookingLinks.map((link: any) => {
        if (link.id === editingBookingLink.id) {
          return {
            ...link,
            name: formData.meetingName,
            link: `https://oxcal.com/yourname/${formData.slug}`,
            ...formData,
          }
        }
        return link
      })

      // If the link wasn't found in localStorage (it might be a default link),
      // add it as a new link
      if (!bookingLinks.some((link: any) => link.id === editingBookingLink.id)) {
        updatedLinks.push({
          id: editingBookingLink.id,
          name: formData.meetingName,
          link: `https://oxcal.com/yourname/${formData.slug}`,
          views: editingBookingLink.views || 0,
          createdAt: editingBookingLink.createdAt || new Date().toISOString().split("T")[0],
          ...formData,
        })
      }

      localStorage.setItem("bookingLinks", JSON.stringify(updatedLinks))
    } else {
      // Create new link
      const newLink = {
        id: Math.random().toString(36).substring(2, 9),
        name: formData.meetingName,
        link: `https://oxcal.com/yourname/${formData.slug}`,
        views: 0,
        createdAt: new Date().toISOString().split("T")[0],
        ...formData,
      }

      bookingLinks.push(newLink)
      localStorage.setItem("bookingLinks", JSON.stringify(bookingLinks))
    }

    // Redirect to the booking links page
    router.push("/booking-links")
  }

  return (
    <div className="flex h-full w-full flex-col bg-[#121212] text-white">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b border-[#2A2A2A] bg-[#1E1E1E] px-6">
        <div className="flex items-center gap-4">
          <Link href="/booking-links" className="flex items-center text-gray-400 hover:text-white">
            <ChevronLeft className="h-5 w-5" />
            <span>Back to Booking Links</span>
          </Link>
          <h1 className="text-xl font-bold">{editingBookingLink ? "Edit Booking Link" : "Create Booking Link"}</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Timezone: GMT-4 (Eastern Time)</span>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="border-b border-[#2A2A2A] bg-[#1E1E1E] px-6 py-4">
        <ProgressIndicator currentStep={currentStep} />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 w-full overflow-hidden">
        {/* Form Panel */}
        <div className="flex w-1/2 flex-col border-r border-[#2A2A2A] bg-[#1E1E1E] p-6 overflow-auto">
          {currentStep === "details" && <MeetingDetailsForm formData={formData} onChange={handleFormChange} />}
          {currentStep === "availability" && <AvailabilityForm formData={formData} onChange={handleFormChange} />}
          {currentStep === "forms" && <QualificationForm formData={formData} onChange={handleFormChange} />}
          {currentStep === "share" && <ShareOptions formData={formData} onChange={handleFormChange} />}
        </div>

        {/* Preview Panel */}
        <div className="w-1/2 overflow-auto bg-[#121212] p-6">
          <div className="mx-auto max-w-md">
            <h2 className="mb-4 text-lg font-medium text-gray-400">Preview</h2>
            <BookingPreview formData={formData} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="flex items-center justify-between border-t border-[#2A2A2A] bg-[#1E1E1E] px-6 py-4">
        <button
          className="rounded-md border border-[#2A2A2A] bg-transparent px-4 py-2 text-gray-300 hover:bg-[#2A2A2A] hover:text-white"
          onClick={handleCancel}
        >
          Cancel
        </button>
        {currentStep === "share" ? (
          <button
            className="rounded-md bg-[#7747FF] px-4 py-2 text-white hover:bg-[#8A5CFF]"
            onClick={handleCreateLink}
          >
            {editingBookingLink ? "Save Changes" : "Create Link"}
          </button>
        ) : (
          <button className="rounded-md bg-[#7747FF] px-4 py-2 text-white hover:bg-[#8A5CFF]" onClick={handleNext}>
            Next: {currentStep === "details" ? "Availability" : currentStep === "availability" ? "Forms" : "Share"}
          </button>
        )}
      </footer>
    </div>
  )
}
