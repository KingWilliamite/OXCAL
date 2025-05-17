import Link from "next/link"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { BookingLinksList } from "@/components/booking-links/booking-links-list"
import { Plus } from "lucide-react"

export default function BookingLinksPage() {
  return (
    <div className="flex h-screen w-full bg-[#121212] text-white">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto">
        <div className="flex h-16 items-center justify-between border-b border-[#2A2A2A] px-6">
          <h1 className="text-xl font-bold">Booking Links</h1>
          <Link
            href="/booking-links/create"
            className="flex items-center gap-2 rounded-md bg-[#7747FF] px-4 py-2 text-sm font-medium text-white hover:bg-[#8A5CFF]"
          >
            <Plus className="h-4 w-4" />
            Create New Link
          </Link>
        </div>
        <div className="p-6">
          <BookingLinksList />
        </div>
      </main>
    </div>
  )
}
