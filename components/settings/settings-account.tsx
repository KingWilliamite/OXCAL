import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Lock, Shield } from "lucide-react"

export function SettingsAccount() {
  return (
    <div className="space-y-6">
      <Card className="border-[#2A2A2A] bg-[#1E1E1E]">
        <CardHeader>
          <CardTitle className="text-xl text-white">Profile Information</CardTitle>
          <CardDescription className="text-gray-400">
            Update your personal information and profile settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="bg-[#7747FF] text-xl">OC</AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="border-[#3A3A3A] bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]"
              >
                <Upload className="mr-2 h-4 w-4" /> Upload Photo
              </Button>
              <p className="text-xs text-gray-400">Recommended: Square image, at least 400x400 pixels, less than 2MB</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-white">
                First Name
              </Label>
              <Input
                id="firstName"
                placeholder="Enter your first name"
                className="border-[#3A3A3A] bg-[#2A2A2A] text-white placeholder:text-gray-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-white">
                Last Name
              </Label>
              <Input
                id="lastName"
                placeholder="Enter your last name"
                className="border-[#3A3A3A] bg-[#2A2A2A] text-white placeholder:text-gray-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              className="border-[#3A3A3A] bg-[#2A2A2A] text-white placeholder:text-gray-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobTitle" className="text-white">
              Job Title
            </Label>
            <Input
              id="jobTitle"
              placeholder="Enter your job title"
              className="border-[#3A3A3A] bg-[#2A2A2A] text-white placeholder:text-gray-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timezone" className="text-white">
              Timezone
            </Label>
            <Select>
              <SelectTrigger id="timezone" className="border-[#3A3A3A] bg-[#2A2A2A] text-white">
                <SelectValue placeholder="Select a timezone" />
              </SelectTrigger>
              <SelectContent className="border-[#3A3A3A] bg-[#2A2A2A] text-white">
                <SelectItem value="eastern">Eastern Time (GMT-4)</SelectItem>
                <SelectItem value="central">Central Time (GMT-5)</SelectItem>
                <SelectItem value="mountain">Mountain Time (GMT-6)</SelectItem>
                <SelectItem value="pacific">Pacific Time (GMT-7)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#2A2A2A] bg-[#1E1E1E]">
        <CardHeader>
          <CardTitle className="text-xl text-white">Security Settings</CardTitle>
          <CardDescription className="text-gray-400">Manage your password and account security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-[#3A3A3A] bg-[#2A2A2A] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7747FF]/20">
                  <Lock className="h-5 w-5 text-[#7747FF]" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Password</h3>
                  <p className="text-sm text-gray-400">Set a strong password for your account</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-[#3A3A3A] bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]"
              >
                Set Password
              </Button>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-[#3A3A3A] bg-[#2A2A2A] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7747FF]/20">
                  <Shield className="h-5 w-5 text-[#7747FF]" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                </div>
              </div>
              <Switch className="data-[state=checked]:bg-[#7747FF]" />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Session Management</Label>
            <div className="rounded-lg border border-[#3A3A3A] bg-[#2A2A2A] p-4 text-center">
              <p className="text-sm text-gray-400">No active sessions</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="bg-[#7747FF] hover:bg-[#6a3dd6]">Save Account Settings</Button>
      </div>
    </div>
  )
}
