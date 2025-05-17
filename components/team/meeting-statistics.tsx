import { Calendar, Clock, AlertTriangle, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface StatisticsProps {
  statistics: {
    today: number
    upcoming: number
    needsPreparation: number
    completionRate: number
  }
}

export function MeetingStatistics({ statistics }: StatisticsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-[#2A2A2A] bg-[#1E1E1E]">
        <CardContent className="flex items-center p-6">
          <div className="mr-4 rounded-full bg-[#7747FF]/10 p-2">
            <Calendar className="h-6 w-6 text-[#7747FF]" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Today's Meetings</p>
            <h3 className="text-2xl font-bold text-white">{statistics.today}</h3>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#2A2A2A] bg-[#1E1E1E]">
        <CardContent className="flex items-center p-6">
          <div className="mr-4 rounded-full bg-[#4285F4]/10 p-2">
            <Clock className="h-6 w-6 text-[#4285F4]" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Upcoming Meetings</p>
            <h3 className="text-2xl font-bold text-white">{statistics.upcoming}</h3>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#2A2A2A] bg-[#1E1E1E]">
        <CardContent className="flex items-center p-6">
          <div className="mr-4 rounded-full bg-[#FBBC05]/10 p-2">
            <AlertTriangle className="h-6 w-6 text-[#FBBC05]" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Needs Preparation</p>
            <h3 className="text-2xl font-bold text-white">{statistics.needsPreparation}</h3>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#2A2A2A] bg-[#1E1E1E]">
        <CardContent className="flex items-center p-6">
          <div className="mr-4 rounded-full bg-[#34A853]/10 p-2">
            <CheckCircle className="h-6 w-6 text-[#34A853]" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Completion Rate</p>
            <h3 className="text-2xl font-bold text-white">{statistics.completionRate}%</h3>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
