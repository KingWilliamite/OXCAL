import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Meeting } from "./meeting-management"
import { Calendar, Clock, MapPin, MoreHorizontal, Repeat, Edit, X, UserPlus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface MeetingCardProps {
  meeting: Meeting
  viewMode: "standard" | "compact"
}

export function MeetingCard({ meeting, viewMode }: MeetingCardProps) {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
  }

  // Get status badge variant
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">Confirmed</Badge>
      case "pending":
        return <Badge className="bg-blue-500">Pending</Badge>
      case "needs-preparation":
        return <Badge className="bg-amber-500">Needs Preparation</Badge>
      case "completed":
        return <Badge className="bg-gray-500">Completed</Badge>
      case "canceled":
        return <Badge variant="destructive">Canceled</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  // Get meeting type color
  const getTypeColor = (type: string) => {
    // Map meeting types to colors
    const typeColors: Record<string, string> = {
      Consultation: "#7747FF",
      "Service Work": "#4285F4",
      "Sales Call": "#FF2D55",
      "Team Meeting": "#34A853",
      "Client Onboarding": "#FBBC05",
      "Project Review": "#EA4335",
      "Strategy Session": "#00C4CC",
      Interview: "#9C27B0",
    }

    return typeColors[type] || "#7747FF" // Default to purple
  }

  return (
    <Card className="border-[#2A2A2A] bg-[#1E1E1E] text-white">
      <CardContent className={`p-4 ${viewMode === "compact" ? "space-y-2" : "space-y-3"}`}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={meeting.clientAvatar || "/placeholder.svg"} alt={meeting.clientName} />
              <AvatarFallback className="bg-[#2A2A2A]">
                {meeting.clientName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{meeting.title}</h3>
              <p className="text-sm text-gray-400">{meeting.clientName}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {meeting.isRecurring && <Repeat className="h-4 w-4 text-gray-400" />}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-[#2A2A2A]">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#1E1E1E] text-white">
                <DropdownMenuItem className="hover:bg-[#2A2A2A]">
                  <Edit className="mr-2 h-4 w-4" />
                  Reschedule
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#2A2A2A]">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Delegate
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#2A2A2A]" />
                <DropdownMenuItem className="text-red-500 hover:bg-[#2A2A2A] hover:text-red-500">
                  <X className="mr-2 h-4 w-4" />
                  Cancel Meeting
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <div className="flex items-center gap-1 text-gray-300">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span>{formatDate(meeting.date)}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-300">
            <Clock className="h-4 w-4 text-gray-400" />
            <span>
              {meeting.startTime} - {meeting.endTime}
            </span>
          </div>
          <div className="flex items-center gap-1 text-gray-300">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span>{meeting.location}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: getTypeColor(meeting.type) }}></div>
            <span className="text-sm text-gray-300">{meeting.type}</span>
          </div>
          <div className="flex items-center gap-2">{getStatusBadge(meeting.status)}</div>
        </div>

        {viewMode === "standard" && meeting.notes && <p className="text-sm text-gray-400">{meeting.notes}</p>}

        {viewMode === "standard" && (
          <div className="flex items-center justify-between pt-2">
            <div className="flex -space-x-2">
              {meeting.teamMembers?.slice(0, 3).map((member, index) => (
                <Avatar key={index} className="h-6 w-6 border-2 border-[#1E1E1E]">
                  <AvatarFallback className="text-xs bg-[#2A2A2A]">{member.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
              {meeting.teamMembers && meeting.teamMembers.length > 3 && (
                <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#1E1E1E] bg-[#2A2A2A] text-xs">
                  +{meeting.teamMembers.length - 3}
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-8 border-[#2A2A2A] bg-[#121212] hover:bg-[#2A2A2A]">
                <Edit className="mr-1 h-3 w-3" />
                Edit
              </Button>
              <Button variant="outline" size="sm" className="h-8 border-[#2A2A2A] bg-[#121212] hover:bg-[#2A2A2A]">
                <UserPlus className="mr-1 h-3 w-3" />
                Invite
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
