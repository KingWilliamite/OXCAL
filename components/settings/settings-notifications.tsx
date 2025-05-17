"use client"

import type React from "react"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

export function SettingsNotifications() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [emailNotifications, setEmailNotifications] = useState({
    newBookings: false,
    cancellations: false,
    reminders: false,
    modifications: false,
    marketing: false,
  })
  const [smsNotifications, setSmsNotifications] = useState({
    newBookings: false,
    cancellations: false,
    reminders: false,
    modifications: false,
  })

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "")

    // Format as (XXX) XXX-XXXX
    if (digits.length <= 3) {
      return digits
    } else if (digits.length <= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    } else {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`
    }
  }

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setPhoneNumber(formatted)
  }

  const toggleEmailNotification = (key: keyof typeof emailNotifications) => {
    setEmailNotifications({
      ...emailNotifications,
      [key]: !emailNotifications[key],
    })
  }

  const toggleSmsNotification = (key: keyof typeof smsNotifications) => {
    setSmsNotifications({
      ...smsNotifications,
      [key]: !smsNotifications[key],
    })
  }

  return (
    <div className="space-y-6">
      <Card className="border-[#2A2A2A] bg-[#1E1E1E]">
        <CardHeader>
          <CardTitle className="text-xl text-white">Email Notifications</CardTitle>
          <CardDescription className="text-gray-400">
            Configure which email notifications you want to receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-white">New Bookings</Label>
              <p className="text-sm text-gray-400">Receive an email when someone books a meeting with you</p>
            </div>
            <Switch
              checked={emailNotifications.newBookings}
              onCheckedChange={() => toggleEmailNotification("newBookings")}
              className="data-[state=checked]:bg-[#7747FF]"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-white">Cancellations</Label>
              <p className="text-sm text-gray-400">Receive an email when a meeting is cancelled</p>
            </div>
            <Switch
              checked={emailNotifications.cancellations}
              onCheckedChange={() => toggleEmailNotification("cancellations")}
              className="data-[state=checked]:bg-[#7747FF]"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-white">Reminders</Label>
              <p className="text-sm text-gray-400">Receive email reminders before your scheduled meetings</p>
            </div>
            <Switch
              checked={emailNotifications.reminders}
              onCheckedChange={() => toggleEmailNotification("reminders")}
              className="data-[state=checked]:bg-[#7747FF]"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-white">Modifications</Label>
              <p className="text-sm text-gray-400">Receive an email when a meeting is rescheduled or modified</p>
            </div>
            <Switch
              checked={emailNotifications.modifications}
              onCheckedChange={() => toggleEmailNotification("modifications")}
              className="data-[state=checked]:bg-[#7747FF]"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-white">Marketing Emails</Label>
              <p className="text-sm text-gray-400">Receive occasional emails about new features and updates</p>
            </div>
            <Switch
              checked={emailNotifications.marketing}
              onCheckedChange={() => toggleEmailNotification("marketing")}
              className="data-[state=checked]:bg-[#7747FF]"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#2A2A2A] bg-[#1E1E1E]">
        <CardHeader>
          <CardTitle className="text-xl text-white">SMS Notifications</CardTitle>
          <CardDescription className="text-gray-400">
            Configure your phone number and SMS notification preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(555) 123-4567"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              className="border-[#3A3A3A] bg-[#2A2A2A] text-white placeholder:text-gray-500"
            />
            <p className="text-xs text-gray-400">Standard message and data rates may apply</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-white">New Bookings</Label>
                <p className="text-sm text-gray-400">Receive a text message when someone books a meeting with you</p>
              </div>
              <Switch
                checked={smsNotifications.newBookings}
                onCheckedChange={() => toggleSmsNotification("newBookings")}
                className="data-[state=checked]:bg-[#7747FF]"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-white">Cancellations</Label>
                <p className="text-sm text-gray-400">Receive a text message when a meeting is cancelled</p>
              </div>
              <Switch
                checked={smsNotifications.cancellations}
                onCheckedChange={() => toggleSmsNotification("cancellations")}
                className="data-[state=checked]:bg-[#7747FF]"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-white">Reminders</Label>
                <p className="text-sm text-gray-400">Receive text reminders before your scheduled meetings</p>
              </div>
              <Switch
                checked={smsNotifications.reminders}
                onCheckedChange={() => toggleSmsNotification("reminders")}
                className="data-[state=checked]:bg-[#7747FF]"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-white">Modifications</Label>
                <p className="text-sm text-gray-400">
                  Receive a text message when a meeting is rescheduled or modified
                </p>
              </div>
              <Switch
                checked={smsNotifications.modifications}
                onCheckedChange={() => toggleSmsNotification("modifications")}
                className="data-[state=checked]:bg-[#7747FF]"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="bg-[#7747FF] hover:bg-[#6a3dd6]">Save Notification Preferences</Button>
      </div>
    </div>
  )
}
