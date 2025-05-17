"use client"

import type React from "react"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface AvailabilityFormProps {
  formData: any
  onChange: (field: string, value: any) => void
}

export function AvailabilityForm({ formData, onChange }: AvailabilityFormProps) {
  const daysOfWeek = [
    { id: "monday", label: "Monday" },
    { id: "tuesday", label: "Tuesday" },
    { id: "wednesday", label: "Wednesday" },
    { id: "thursday", label: "Thursday" },
    { id: "friday", label: "Friday" },
    { id: "saturday", label: "Saturday" },
    { id: "sunday", label: "Sunday" },
  ]

  const handleDayToggle = (day: string) => {
    const currentDays = [...formData.availableDays]
    if (currentDays.includes(day)) {
      onChange(
        "availableDays",
        currentDays.filter((d) => d !== day),
      )
    } else {
      onChange("availableDays", [...currentDays, day])
    }
  }

  const handleHoursChange = (type: "start" | "end") => (value: string) => {
    onChange("availableHours", {
      ...formData.availableHours,
      [type]: value,
    })
  }

  const handleSwitchChange = (field: string) => (checked: boolean) => {
    onChange(field, checked)
  }

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(field, Number.parseInt(e.target.value))
  }

  return (
    <div className="space-y-6 text-white">
      <h2 className="text-xl font-semibold">Availability</h2>
      <p className="text-gray-400">Set your available days and hours for this meeting type.</p>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Available Days</h3>
          <div className="flex flex-wrap gap-2">
            {daysOfWeek.map((day) => (
              <button
                key={day.id}
                type="button"
                onClick={() => handleDayToggle(day.id)}
                className={`rounded-md px-3 py-1 text-sm ${
                  formData.availableDays.includes(day.id)
                    ? "bg-[#7747FF] text-white"
                    : "bg-[#2A2A2A] text-gray-400 hover:bg-[#3A3A3A]"
                }`}
              >
                {day.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Available Hours</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime" className="text-white">
                Start Time
              </Label>
              <Select value={formData.availableHours.start} onValueChange={handleHoursChange("start")}>
                <SelectTrigger id="startTime" className="bg-[#2A2A2A] border-[#3A3A3A] text-white">
                  <SelectValue placeholder="Select start time" />
                </SelectTrigger>
                <SelectContent className="bg-[#2A2A2A] border-[#3A3A3A] text-white">
                  {Array.from({ length: 24 }).map((_, i) => {
                    const hour = i.toString().padStart(2, "0")
                    return (
                      <SelectItem key={hour} value={`${hour}:00`} className="text-white hover:bg-[#3A3A3A]">
                        {`${hour}:00`}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime" className="text-white">
                End Time
              </Label>
              <Select value={formData.availableHours.end} onValueChange={handleHoursChange("end")}>
                <SelectTrigger id="endTime" className="bg-[#2A2A2A] border-[#3A3A3A] text-white">
                  <SelectValue placeholder="Select end time" />
                </SelectTrigger>
                <SelectContent className="bg-[#2A2A2A] border-[#3A3A3A] text-white">
                  {Array.from({ length: 24 }).map((_, i) => {
                    const hour = i.toString().padStart(2, "0")
                    return (
                      <SelectItem key={hour} value={`${hour}:00`} className="text-white hover:bg-[#3A3A3A]">
                        {`${hour}:00`}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-md border border-[#3A3A3A] bg-[#1A1A1A] p-4">
          <h3 className="text-sm font-medium">Advanced Settings</h3>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="limitBookings" className="text-white">
                Limit bookings per day
              </Label>
              <p className="text-xs text-gray-400">Set a maximum number of meetings per day</p>
            </div>
            <Switch
              id="limitBookings"
              checked={formData.limitBookingsPerDay}
              onCheckedChange={handleSwitchChange("limitBookingsPerDay")}
              className="data-[state=checked]:bg-[#7747FF]"
            />
          </div>

          {formData.limitBookingsPerDay && (
            <div className="space-y-2">
              <Label htmlFor="maxBookings" className="text-white">
                Maximum bookings per day
              </Label>
              <Input
                id="maxBookings"
                type="number"
                min="1"
                max="20"
                value={formData.maxBookingsPerDay}
                onChange={handleInputChange("maxBookingsPerDay")}
                className="bg-[#2A2A2A] border-[#3A3A3A] text-white"
              />
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <div className="space-y-1">
              <Label htmlFor="minimumNotice" className="text-white">
                Require minimum notice
              </Label>
              <p className="text-xs text-gray-400">Prevent last-minute bookings</p>
            </div>
            <Switch
              id="minimumNotice"
              checked={formData.requireMinimumNotice}
              onCheckedChange={handleSwitchChange("requireMinimumNotice")}
              className="data-[state=checked]:bg-[#7747FF]"
            />
          </div>

          {formData.requireMinimumNotice && (
            <div className="space-y-2">
              <Label htmlFor="noticeHours" className="text-white">
                Minimum notice (hours)
              </Label>
              <Input
                id="noticeHours"
                type="number"
                min="1"
                max="72"
                value={formData.minimumNoticeHours}
                onChange={handleInputChange("minimumNoticeHours")}
                className="bg-[#2A2A2A] border-[#3A3A3A] text-white"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
