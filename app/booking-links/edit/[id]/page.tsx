import { BookingLinkCreator } from "@/components/booking-links/booking-link-creator"

interface EditBookingLinkPageProps {
  params: {
    id: string
  }
}

export default function EditBookingLinkPage({ params }: EditBookingLinkPageProps) {
  // In a real app, you would fetch the booking link data from your backend
  // For now, we'll use localStorage
  const getBookingLink = (id: string) => {
    if (typeof window !== "undefined") {
      const bookingLinks = JSON.parse(localStorage.getItem("bookingLinks") || "[]")
      return bookingLinks.find((link: any) => link.id === id)
    }
    return null
  }

  // This is a client component, so we'll use a placeholder for SSR
  // In a real app, you would use React Query or SWR to fetch the data
  const bookingLinkPlaceholder = {
    id: params.id,
    name: "Loading...",
    meetingName: "Loading...",
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
    slug: "loading",
  }

  return (
    <div className="h-screen w-screen overflow-hidden">
      <BookingLinkCreator editingBookingLink={bookingLinkPlaceholder} />
    </div>
  )
}
