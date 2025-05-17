"use client"

import type React from "react"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MeetingDetailsFormProps {
  formData: any
  onChange: (field: string, value: any) => void
}

export function MeetingDetailsForm({ formData, onChange }: MeetingDetailsFormProps) {
  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(field, e.target.value)
  }

  const handleSelectChange = (field: string) => (value: string) => {
    onChange(field, value)
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    onChange("meetingName", name)
    onChange("slug", generateSlug(name))
  }

  return (
    <div className="space-y-6 text-white">
      <h2 className="text-xl font-semibold">Meeting Details</h2>
      <p className="text-gray-400">Set up the basic information for your booking link.</p>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="meetingName" className="text-white">
            Meeting Name
          </Label>
          <Input
            id="meetingName"
            value={formData.meetingName}
            onChange={handleNameChange}
            placeholder="e.g. Initial Consultation"
            className="bg-[#2A2A2A] border-[#3A3A3A] text-white placeholder:text-gray-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="meetingType" className="text-white">
            Meeting Type
          </Label>
          <Select value={formData.meetingType} onValueChange={handleSelectChange("meetingType")}>
            <SelectTrigger id="meetingType" className="bg-[#2A2A2A] border-[#3A3A3A] text-white">
              <SelectValue placeholder="Select meeting type" />
            </SelectTrigger>
            <SelectContent className="bg-[#2A2A2A] border-[#3A3A3A] text-white">
              <SelectItem value="Consultation" className="text-white hover:bg-[#3A3A3A]">
                Consultation
              </SelectItem>
              <SelectItem value="Sales Call" className="text-white hover:bg-[#3A3A3A]">
                Sales Call
              </SelectItem>
              <SelectItem value="Interview" className="text-white hover:bg-[#3A3A3A]">
                Interview
              </SelectItem>
              <SelectItem value="Coaching" className="text-white hover:bg-[#3A3A3A]">
                Coaching
              </SelectItem>
              <SelectItem value="Service Work" className="text-white hover:bg-[#3A3A3A]">
                Service Work
              </SelectItem>
              <SelectItem value="Other" className="text-white hover:bg-[#3A3A3A]">
                Other
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration" className="text-white">
            Duration
          </Label>
          <Select value={formData.duration} onValueChange={handleSelectChange("duration")}>
            <SelectTrigger id="duration" className="bg-[#2A2A2A] border-[#3A3A3A] text-white">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent className="bg-[#2A2A2A] border-[#3A3A3A] text-white">
              <SelectItem value="15" className="text-white hover:bg-[#3A3A3A]">
                15 minutes
              </SelectItem>
              <SelectItem value="30" className="text-white hover:bg-[#3A3A3A]">
                30 minutes
              </SelectItem>
              <SelectItem value="45" className="text-white hover:bg-[#3A3A3A]">
                45 minutes
              </SelectItem>
              <SelectItem value="60" className="text-white hover:bg-[#3A3A3A]">
                60 minutes
              </SelectItem>
              <SelectItem value="90" className="text-white hover:bg-[#3A3A3A]">
                90 minutes
              </SelectItem>
              <SelectItem value="120" className="text-white hover:bg-[#3A3A3A]">
                2 hours
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="calendar" className="text-white">
            Calendar
          </Label>
          <Select value={formData.calendar} onValueChange={handleSelectChange("calendar")}>
            <SelectTrigger id="calendar" className="bg-[#2A2A2A] border-[#3A3A3A] text-white">
              <SelectValue placeholder="Select calendar" />
            </SelectTrigger>
            <SelectContent className="bg-[#2A2A2A] border-[#3A3A3A] text-white">
              <SelectItem value="Google Calendar" className="text-white hover:bg-[#3A3A3A]">
                Google Calendar
              </SelectItem>
              <SelectItem value="Outlook" className="text-white hover:bg-[#3A3A3A]">
                Outlook
              </SelectItem>
              <SelectItem value="iCloud" className="text-white hover:bg-[#3A3A3A]">
                iCloud
              </SelectItem>
              <SelectItem value="Office 365" className="text-white hover:bg-[#3A3A3A]">
                Office 365
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-white">Buffer Time</h3>
          <p className="text-xs text-gray-400">
            Add buffer time before and after your meetings to prepare or take a break.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bufferBefore" className="text-white">
                Before
              </Label>
              <Select value={formData.bufferBefore} onValueChange={handleSelectChange("bufferBefore")}>
                <SelectTrigger id="bufferBefore" className="bg-[#2A2A2A] border-[#3A3A3A] text-white">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent className="bg-[#2A2A2A] border-[#3A3A3A] text-white">
                  <SelectItem value="0" className="text-white hover:bg-[#3A3A3A]">
                    0 minutes
                  </SelectItem>
                  <SelectItem value="5" className="text-white hover:bg-[#3A3A3A]">
                    5 minutes
                  </SelectItem>
                  <SelectItem value="10" className="text-white hover:bg-[#3A3A3A]">
                    10 minutes
                  </SelectItem>
                  <SelectItem value="15" className="text-white hover:bg-[#3A3A3A]">
                    15 minutes
                  </SelectItem>
                  <SelectItem value="30" className="text-white hover:bg-[#3A3A3A]">
                    30 minutes
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bufferAfter" className="text-white">
                After
              </Label>
              <Select value={formData.bufferAfter} onValueChange={handleSelectChange("bufferAfter")}>
                <SelectTrigger id="bufferAfter" className="bg-[#2A2A2A] border-[#3A3A3A] text-white">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent className="bg-[#2A2A2A] border-[#3A3A3A] text-white">
                  <SelectItem value="0" className="text-white hover:bg-[#3A3A3A]">
                    0 minutes
                  </SelectItem>
                  <SelectItem value="5" className="text-white hover:bg-[#3A3A3A]">
                    5 minutes
                  </SelectItem>
                  <SelectItem value="10" className="text-white hover:bg-[#3A3A3A]">
                    10 minutes
                  </SelectItem>
                  <SelectItem value="15" className="text-white hover:bg-[#3A3A3A]">
                    15 minutes
                  </SelectItem>
                  <SelectItem value="30" className="text-white hover:bg-[#3A3A3A]">
                    30 minutes
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug" className="text-white">
            Booking Link URL
          </Label>
          <div className="flex items-center rounded-md border border-[#3A3A3A] bg-[#2A2A2A] px-3 py-2">
            <span className="text-gray-400">oxcal.com/yourname/</span>
            <Input
              id="slug"
              value={formData.slug}
              onChange={handleInputChange("slug")}
              className="border-0 bg-transparent p-0 text-white focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
