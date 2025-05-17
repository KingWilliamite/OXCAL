import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { MeetingManagement } from "@/components/team/meeting-management"

export default function TeamPage() {
  return (
    <div className="flex h-screen bg-[#121212]">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto p-6">
        <MeetingManagement />
      </main>
    </div>
  )
}
