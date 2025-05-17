"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, BarChart2, Settings, Users, Link2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function DashboardSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`)
  }

  return (
    <div className="flex h-screen w-64 flex-col border-r border-[#2A2A2A] bg-[#121212]">
      <div className="flex h-16 items-center border-b border-[#2A2A2A] px-6">
        <Link href="/dashboard" className="flex items-center">
          <span className="text-xl font-bold text-white">OxCal</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-[#2A2A2A] hover:text-white",
            isActive("/dashboard") && "bg-[#2A2A2A] text-white",
          )}
        >
          <Calendar className="mr-3 h-5 w-5" />
          Dashboard
        </Link>
        <Link
          href="/booking-links"
          className={cn(
            "flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-[#2A2A2A] hover:text-white",
            isActive("/booking-links") && "bg-[#2A2A2A] text-white",
          )}
        >
          <Link2 className="mr-3 h-5 w-5" />
          Booking Links
        </Link>
        <Link
          href="/team"
          className={cn(
            "flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-[#2A2A2A] hover:text-white",
            isActive("/team") && "bg-[#2A2A2A] text-white",
          )}
        >
          <Users className="mr-3 h-5 w-5" />
          Team
        </Link>
        <Link
          href="/analytics"
          className={cn(
            "flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-[#2A2A2A] hover:text-white",
            isActive("/analytics") && "bg-[#2A2A2A] text-white",
          )}
        >
          <BarChart2 className="mr-3 h-5 w-5" />
          Analytics
        </Link>
        <Link
          href="/settings"
          className={cn(
            "flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-[#2A2A2A] hover:text-white",
            isActive("/settings") && "bg-[#2A2A2A] text-white",
          )}
        >
          <Settings className="mr-3 h-5 w-5" />
          Settings
        </Link>
      </nav>
      <div className="border-t border-[#2A2A2A] p-4">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-[#7747FF]"></div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">OxCal User</p>
          </div>
        </div>
      </div>
    </div>
  )
}
