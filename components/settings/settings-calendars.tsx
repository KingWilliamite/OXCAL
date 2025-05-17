import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Plus } from "lucide-react"

export function SettingsCalendars() {
  return (
    <div className="space-y-6">
      <Card className="border-[#2A2A2A] bg-[#1E1E1E]">
        <CardHeader>
          <CardTitle className="text-xl text-white">Connected Calendars</CardTitle>
          <CardDescription className="text-gray-400">Manage your connected calendar accounts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex min-h-[100px] flex-col items-center justify-center rounded-lg border border-dashed border-[#3A3A3A] bg-[#2A2A2A] p-6 text-center">
            <Calendar className="mb-2 h-10 w-10 text-gray-400" />
            <p className="mb-1 text-white">No calendars connected</p>
            <p className="mb-4 text-sm text-gray-400">Connect your calendar to manage your availability</p>
            <Button className="bg-[#7747FF] hover:bg-[#6a3dd6]">
              <Plus className="mr-2 h-4 w-4" /> Connect Calendar
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#2A2A2A] bg-[#1E1E1E]">
        <CardHeader>
          <CardTitle className="text-xl text-white">Calendar Settings</CardTitle>
          <CardDescription className="text-gray-400">Configure how your calendars work with OxCal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-white">Check for Conflicts</Label>
                <p className="text-sm text-gray-400">
                  Automatically check for conflicts across all connected calendars
                </p>
              </div>
              <Switch className="data-[state=checked]:bg-[#7747FF]" />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-white">Add Bookings to Calendar</Label>
                <p className="text-sm text-gray-400">Automatically add new bookings to your primary calendar</p>
              </div>
              <Switch className="data-[state=checked]:bg-[#7747FF]" />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Default Timezone</Label>
              <Select>
                <SelectTrigger className="border-[#3A3A3A] bg-[#2A2A2A] text-white">
                  <SelectValue placeholder="Select a timezone" />
                </SelectTrigger>
                <SelectContent className="border-[#3A3A3A] bg-[#2A2A2A] text-white">
                  <SelectItem value="eastern">Eastern Time (GMT-4)</SelectItem>
                  <SelectItem value="central">Central Time (GMT-5)</SelectItem>
                  <SelectItem value="mountain">Mountain Time (GMT-6)</SelectItem>
                  <SelectItem value="pacific">Pacific Time (GMT-7)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-400">All times will be displayed in this timezone by default</p>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Buffer Time</Label>
              <Select>
                <SelectTrigger className="border-[#3A3A3A] bg-[#2A2A2A] text-white">
                  <SelectValue placeholder="Select buffer time" />
                </SelectTrigger>
                <SelectContent className="border-[#3A3A3A] bg-[#2A2A2A] text-white">
                  <SelectItem value="0">No buffer</SelectItem>
                  <SelectItem value="5">5 minutes</SelectItem>
                  <SelectItem value="10">10 minutes</SelectItem>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-400">
                Add buffer time before and after meetings to prepare or take a break
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="bg-[#7747FF] hover:bg-[#6a3dd6]">Save Calendar Settings</Button>
      </div>
    </div>
  )
}
