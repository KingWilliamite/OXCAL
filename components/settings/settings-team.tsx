import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Users } from "lucide-react"

export function SettingsTeam() {
  return (
    <div className="space-y-6">
      <Card className="border-[#2A2A2A] bg-[#1E1E1E]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-white">Team Members</CardTitle>
              <CardDescription className="text-gray-400">
                Manage your team members and their access levels
              </CardDescription>
            </div>
            <Button className="bg-[#7747FF] hover:bg-[#6a3dd6]">
              <Plus className="mr-2 h-4 w-4" /> Add Team Member
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex min-h-[100px] flex-col items-center justify-center rounded-lg border border-dashed border-[#3A3A3A] bg-[#2A2A2A] p-6 text-center">
            <Users className="mb-2 h-10 w-10 text-gray-400" />
            <p className="mb-1 text-white">No team members yet</p>
            <p className="text-sm text-gray-400">Add team members to collaborate on meetings and bookings</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#2A2A2A] bg-[#1E1E1E]">
        <CardHeader>
          <CardTitle className="text-xl text-white">Add New Team Member</CardTitle>
          <CardDescription className="text-gray-400">Add a colleague to your team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="memberEmail" className="text-white">
                Email Address
              </Label>
              <Input
                id="memberEmail"
                type="email"
                placeholder="colleague@example.com"
                className="border-[#3A3A3A] bg-[#2A2A2A] text-white placeholder:text-gray-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-white">
                Role
              </Label>
              <Select>
                <SelectTrigger id="role" className="border-[#3A3A3A] bg-[#2A2A2A] text-white">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent className="border-[#3A3A3A] bg-[#2A2A2A] text-white">
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-400">
                Admins have full access to all settings. Members can manage meetings but not settings. Viewers can only
                view meetings.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-white">
                Personal Message (Optional)
              </Label>
              <Textarea
                id="message"
                placeholder="I'd like to add you to our team calendar..."
                className="min-h-20 border-[#3A3A3A] bg-[#2A2A2A] text-white placeholder:text-gray-500"
              />
            </div>

            <Button className="bg-[#7747FF] hover:bg-[#6a3dd6]">Add Team Member</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
