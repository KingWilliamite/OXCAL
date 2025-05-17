"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Upload, ImageIcon, Code } from "lucide-react"

export function SettingsBranding() {
  const [brandColors, setBrandColors] = useState({
    primary: "#7747FF",
    secondary: "#1E1E1E",
    accent: "#4285F4",
  })

  return (
    <div className="space-y-6">
      <Card className="border-[#2A2A2A] bg-[#1E1E1E]">
        <CardHeader>
          <CardTitle className="text-xl text-white">Brand Identity</CardTitle>
          <CardDescription className="text-gray-400">
            Customize your brand appearance across the platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-white">Logo</Label>
              <div className="flex h-32 flex-col items-center justify-center rounded-lg border border-dashed border-[#3A3A3A] bg-[#2A2A2A] p-4">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="rounded-full bg-[#7747FF]/20 p-2">
                    <ImageIcon className="h-6 w-6 text-[#7747FF]" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-white">Drag and drop or click to upload</p>
                    <p className="text-xs text-gray-400">SVG, PNG or JPG (max. 2MB)</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 border-[#3A3A3A] bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]"
                  >
                    <Upload className="mr-2 h-4 w-4" /> Upload Logo
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Favicon</Label>
              <div className="flex h-32 flex-col items-center justify-center rounded-lg border border-dashed border-[#3A3A3A] bg-[#2A2A2A] p-4">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="rounded-full bg-[#7747FF]/20 p-2">
                    <ImageIcon className="h-6 w-6 text-[#7747FF]" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-white">Drag and drop or click to upload</p>
                    <p className="text-xs text-gray-400">ICO, PNG (max. 1MB)</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 border-[#3A3A3A] bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]"
                  >
                    <Upload className="mr-2 h-4 w-4" /> Upload Favicon
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-white">
              Company Name
            </Label>
            <Input
              id="companyName"
              placeholder="Enter your company name"
              className="border-[#3A3A3A] bg-[#2A2A2A] text-white placeholder:text-gray-500"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#2A2A2A] bg-[#1E1E1E]">
        <CardHeader>
          <CardTitle className="text-xl text-white">Brand Colors</CardTitle>
          <CardDescription className="text-gray-400">
            Customize the colors used throughout your booking pages
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="primaryColor" className="text-white">
                Primary Color
              </Label>
              <div className="flex">
                <div className="flex h-10 w-10 items-center justify-center rounded-l-md bg-[#7747FF]"></div>
                <Input
                  id="primaryColor"
                  defaultValue="#7747FF"
                  className="rounded-l-none border-[#3A3A3A] bg-[#2A2A2A] text-white placeholder:text-gray-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondaryColor" className="text-white">
                Secondary Color
              </Label>
              <div className="flex">
                <div className="flex h-10 w-10 items-center justify-center rounded-l-md bg-[#1E1E1E]"></div>
                <Input
                  id="secondaryColor"
                  defaultValue="#1E1E1E"
                  className="rounded-l-none border-[#3A3A3A] bg-[#2A2A2A] text-white placeholder:text-gray-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accentColor" className="text-white">
                Accent Color
              </Label>
              <div className="flex">
                <div className="flex h-10 w-10 items-center justify-center rounded-l-md bg-[#4285F4]"></div>
                <Input
                  id="accentColor"
                  defaultValue="#4285F4"
                  className="rounded-l-none border-[#3A3A3A] bg-[#2A2A2A] text-white placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#2A2A2A] bg-[#1E1E1E]">
        <CardHeader>
          <CardTitle className="text-xl text-white">Booking Page Customization</CardTitle>
          <CardDescription className="text-gray-400">
            Customize how your booking pages appear to clients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="appearance" className="w-full">
            <TabsList className="mb-4 grid w-full grid-cols-2 bg-[#2A2A2A] p-1">
              <TabsTrigger value="appearance" className="data-[state=active]:bg-[#7747FF]">
                Appearance
              </TabsTrigger>
              <TabsTrigger value="content" className="data-[state=active]:bg-[#7747FF]">
                Content
              </TabsTrigger>
            </TabsList>
            <TabsContent value="appearance" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme" className="text-white">
                  Theme
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex cursor-pointer flex-col items-center rounded-lg border border-[#7747FF] bg-[#2A2A2A] p-4">
                    <div className="mb-2 h-20 w-full rounded bg-[#121212]"></div>
                    <span className="text-sm text-white">Dark Theme</span>
                  </div>
                  <div className="flex cursor-pointer flex-col items-center rounded-lg border border-[#3A3A3A] bg-[#2A2A2A] p-4">
                    <div className="mb-2 h-20 w-full rounded bg-white"></div>
                    <span className="text-sm text-white">Light Theme</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customCss" className="text-white">
                  Custom CSS
                </Label>
                <div className="relative">
                  <Textarea
                    id="customCss"
                    placeholder="/* Add your custom CSS here */"
                    className="min-h-32 border-[#3A3A3A] bg-[#2A2A2A] font-mono text-white placeholder:text-gray-500"
                  />
                  <div className="absolute right-3 top-3">
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-white">
                      <Code className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-gray-400">
                  Advanced: Add custom CSS to further customize your booking pages
                </p>
              </div>
            </TabsContent>
            <TabsContent value="content" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pageTitle" className="text-white">
                  Page Title
                </Label>
                <Input
                  id="pageTitle"
                  placeholder="Book a meeting with me"
                  className="border-[#3A3A3A] bg-[#2A2A2A] text-white placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="welcomeMessage" className="text-white">
                  Welcome Message
                </Label>
                <Textarea
                  id="welcomeMessage"
                  placeholder="Thanks for scheduling a meeting with me. Please select a date and time that works for you."
                  className="min-h-20 border-[#3A3A3A] bg-[#2A2A2A] text-white placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmationMessage" className="text-white">
                  Confirmation Message
                </Label>
                <Textarea
                  id="confirmationMessage"
                  placeholder="Your meeting has been scheduled. You'll receive a confirmation email shortly."
                  className="min-h-20 border-[#3A3A3A] bg-[#2A2A2A] text-white placeholder:text-gray-500"
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="bg-[#7747FF] hover:bg-[#6a3dd6]">Save Branding Settings</Button>
      </div>
    </div>
  )
}
