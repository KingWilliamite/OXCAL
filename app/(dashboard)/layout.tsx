import type React from "react"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <DashboardSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </>
  )
}
