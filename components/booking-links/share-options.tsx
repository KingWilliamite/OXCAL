"use client"

import type React from "react"

import { useState } from "react"
import { Copy, Mail, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ShareOptionsProps {
  formData: any
  onChange: (field: string, value: any) => void
}

export function ShareOptions({ formData }: ShareOptionsProps) {
  const [copied, setCopied] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const bookingLink = `https://oxcal.com/yourname/${formData.slug || "meeting"}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(bookingLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareViaEmail = () => {
    const subject = `Book a ${formData.meetingName || "meeting"} with me`
    const body = `Hi,\n\nYou can book a ${
      formData.meetingName || "meeting"
    } with me using this link:\n\n${bookingLink}\n\nLooking forward to our meeting!\n\nBest regards,\nYour Name`
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
  }

  const shareViaSMS = () => {
    if (!phoneNumber) return
    const message = `Book a ${formData.meetingName || "meeting"} with me: ${bookingLink}`
    window.open(`sms:${phoneNumber}?body=${encodeURIComponent(message)}`)
  }

  const formatPhoneNumber = (value: string) => {
    // Remove all non-numeric characters
    const cleaned = value.replace(/\D/g, "")

    // Format as (XXX) XXX-XXXX for US numbers
    if (cleaned.length <= 10) {
      let formatted = cleaned
      if (cleaned.length > 3) {
        formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`
      }
      if (cleaned.length > 6) {
        formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
      }
      return formatted
    }

    // For international numbers, just add a + at the beginning
    return `+${cleaned}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(formatPhoneNumber(e.target.value))
  }

  return (
    <div className="space-y-6 text-white">
      <h2 className="text-xl font-semibold">Share Your Booking Link</h2>
      <p className="text-gray-400">Share your booking link with others so they can schedule meetings with you.</p>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="bookingLink" className="text-white">
            Your Booking Link
          </Label>
          <div className="flex items-center space-x-2">
            <Input id="bookingLink" value={bookingLink} readOnly className="bg-[#2A2A2A] border-[#3A3A3A] text-white" />
            <Button onClick={copyToClipboard} className="border-[#3A3A3A] bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]">
              {copied ? "Copied!" : "Copy"}
              <Copy className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-[#2A2A2A]">
            <TabsTrigger value="email" className="data-[state=active]:bg-[#3A3A3A]">
              Email
            </TabsTrigger>
            <TabsTrigger value="sms" className="data-[state=active]:bg-[#3A3A3A]">
              SMS
            </TabsTrigger>
          </TabsList>

          <TabsContent value="email" className="mt-4">
            <div className="space-y-4 rounded-md border border-[#3A3A3A] bg-[#1A1A1A] p-4">
              <h3 className="text-sm font-medium">Share via Email</h3>
              <div className="space-y-2">
                <Label htmlFor="emailSubject" className="text-white">
                  Email Subject
                </Label>
                <Input
                  id="emailSubject"
                  defaultValue={`Book a ${formData.meetingName || "meeting"} with me`}
                  className="bg-[#2A2A2A] border-[#3A3A3A] text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emailBody" className="text-white">
                  Email Body
                </Label>
                <Textarea
                  id="emailBody"
                  rows={4}
                  defaultValue={`Hi,\n\nYou can book a ${
                    formData.meetingName || "meeting"
                  } with me using this link:\n\n${bookingLink}\n\nLooking forward to our meeting!\n\nBest regards,\nYour Name`}
                  className="bg-[#2A2A2A] border-[#3A3A3A] text-white"
                />
              </div>
              <Button onClick={shareViaEmail} className="mt-2 w-full bg-[#7747FF] text-white hover:bg-[#8A5CFF]">
                <Mail className="mr-2 h-4 w-4" />
                Share via Email
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="sms" className="mt-4">
            <div className="space-y-4 rounded-md border border-[#3A3A3A] bg-[#1A1A1A] p-4">
              <h3 className="text-sm font-medium">Share via SMS</h3>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-white">
                  Phone Number
                </Label>
                <Input
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="(555) 123-4567"
                  className="bg-[#2A2A2A] border-[#3A3A3A] text-white"
                />
                <p className="text-xs text-gray-400">
                  Enter the recipient's phone number to send them a text message with your booking link.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="smsMessage" className="text-white">
                  Message Preview
                </Label>
                <div className="rounded-md bg-[#2A2A2A] p-3 text-sm text-gray-300">
                  Book a {formData.meetingName || "meeting"} with me: {bookingLink}
                </div>
              </div>
              <Button
                onClick={shareViaSMS}
                disabled={!phoneNumber}
                className="mt-2 w-full bg-[#7747FF] text-white hover:bg-[#8A5CFF] disabled:bg-[#4A4A4A] disabled:text-gray-400"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Send SMS
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="rounded-md border border-[#3A3A3A] bg-[#1A1A1A] p-4">
          <h3 className="mb-2 text-sm font-medium">Embed on Your Website</h3>
          <div className="space-y-2">
            <p className="text-xs text-gray-400">Copy this code to embed your booking link on your website.</p>
            <div className="overflow-x-auto rounded-md bg-[#2A2A2A] p-3">
              <code className="text-xs text-white">
                {`<a href="${bookingLink}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 10px 20px; background-color: #7747FF; color: white; text-decoration: none; border-radius: 4px; font-family: sans-serif;">Book a ${formData.meetingName || "meeting"}</a>`}
              </code>
            </div>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(
                  `<a href="${bookingLink}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 10px 20px; background-color: #7747FF; color: white; text-decoration: none; border-radius: 4px; font-family: sans-serif;">Book a ${formData.meetingName || "meeting"}</a>`,
                )
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
              }}
              className="mt-2 w-full border-[#3A3A3A] bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]"
            >
              Copy Embed Code
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
