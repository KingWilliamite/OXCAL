"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Calendar, Clock, User, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function BookingDetailsPage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [bookingLink, setBookingLink] = useState<any>(null)

  // In a real app, this would be passed from the previous page via state management
  const selectedDate = new Date()
  const selectedTime = "10:00 AM"

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
    termsAccepted: false,
    // This will hold answers to custom questions
    questionAnswers: {} as Record<string, string>,
    // For checkbox type questions
    checkboxAnswers: {} as Record<string, boolean[]>,
  })

  // Fetch booking link data
  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll simulate by getting data from localStorage
    const fetchBookingLink = () => {
      setLoading(true)
      try {
        // Get booking links from localStorage
        const savedLinks = localStorage.getItem("bookingLinks")
        if (savedLinks) {
          const parsedLinks = JSON.parse(savedLinks)
          // Find the link with the matching slug
          const link = parsedLinks.find((link: any) => link.slug === params.slug)

          if (link) {
            setBookingLink(link)

            // Initialize question answers
            if (link.questions && link.questions.length > 0) {
              const initialQuestionAnswers = {} as Record<string, string>
              const initialCheckboxAnswers = {} as Record<string, boolean[]>

              link.questions.forEach((question: any) => {
                if (question.type === "checkbox" && question.options) {
                  initialCheckboxAnswers[question.id] = new Array(question.options.length).fill(false)
                } else {
                  initialQuestionAnswers[question.id] = ""
                }
              })

              setFormData((prev) => ({
                ...prev,
                questionAnswers: initialQuestionAnswers,
                checkboxAnswers: initialCheckboxAnswers,
              }))
            }
          } else {
            // If not found in localStorage, use default data
            setBookingLink({
              id: params.slug,
              name: "Initial Consultation",
              meetingName: "Initial Consultation",
              duration: 30,
              description: "A brief introduction call to discuss your needs and how we might work together.",
              questions: [
                {
                  id: "q1",
                  text: "What topics would you like to discuss?",
                  type: "long",
                  required: true,
                },
                {
                  id: "q2",
                  text: "How did you hear about us?",
                  type: "single",
                  required: false,
                  options: ["Google", "Referral", "Social Media", "Other"],
                },
              ],
            })
          }
        } else {
          // If no links in localStorage, use default data
          setBookingLink({
            id: params.slug,
            name: "Initial Consultation",
            meetingName: "Initial Consultation",
            duration: 30,
            description: "A brief introduction call to discuss your needs and how we might work together.",
            questions: [
              {
                id: "q1",
                text: "What topics would you like to discuss?",
                type: "long",
                required: true,
              },
              {
                id: "q2",
                text: "How did you hear about us?",
                type: "single",
                required: false,
                options: ["Google", "Referral", "Social Media", "Other"],
              },
            ],
          })
        }
      } catch (error) {
        console.error("Error fetching booking link:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBookingLink()
  }, [params.slug])

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle question answers
  const handleQuestionChange = (questionId: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      questionAnswers: {
        ...prev.questionAnswers,
        [questionId]: value,
      },
    }))
  }

  // Handle checkbox type questions
  const handleCheckboxQuestionChange = (questionId: string, optionIndex: number, checked: boolean) => {
    setFormData((prev) => {
      const newCheckboxAnswers = { ...prev.checkboxAnswers }
      if (!newCheckboxAnswers[questionId]) {
        newCheckboxAnswers[questionId] = []
      }
      newCheckboxAnswers[questionId] = [...(newCheckboxAnswers[questionId] || [])]
      newCheckboxAnswers[questionId][optionIndex] = checked
      return {
        ...prev,
        checkboxAnswers: newCheckboxAnswers,
      }
    })
  }

  // Handle terms checkbox change
  const handleTermsChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      termsAccepted: checked,
    }))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit this data to your API
    console.log("Form submitted:", formData)

    // Navigate to confirmation page
    router.push(`/booking/${params.slug}/confirmation`)
  }

  // Go back to date selection
  const handleBack = () => {
    router.push(`/booking/${params.slug}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#121212] text-white">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#7747FF] border-r-transparent"></div>
          <p className="mt-4 text-white">Loading booking details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Progress indicator */}
      <div className="border-b border-[#2A2A2A]">
        <div className="container mx-auto max-w-4xl px-4 py-3">
          <div className="flex justify-between">
            <div className="flex items-center gap-2 text-gray-400">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2A2A2A] text-xs font-medium text-gray-300">
                1
              </div>
              <span className="text-sm text-gray-300">Time</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#7747FF] text-xs font-medium text-white">
                2
              </div>
              <span className="text-sm font-medium text-white">Details</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2A2A2A] text-xs font-medium text-gray-300">
                3
              </div>
              <span className="text-sm text-gray-300">Confirmation</span>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="grid gap-8 md:grid-cols-5">
          {/* Meeting info - takes up 2 columns on medium screens and above */}
          <div className="md:col-span-2">
            <div className="sticky top-8">
              <h1 className="text-2xl font-bold mb-6 text-white">{bookingLink?.meetingName || bookingLink?.name}</h1>

              <div className="flex items-start gap-3 mb-3">
                <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium text-white">
                    {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                  </p>
                  <p className="text-sm text-gray-400">{selectedTime}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 mb-6">
                <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium text-white">{bookingLink?.duration} minutes</p>
                </div>
              </div>

              <p className="text-gray-300">{bookingLink?.description}</p>
            </div>
          </div>

          {/* Client details form - takes up 3 columns on medium screens and above */}
          <div className="md:col-span-3">
            <Card className="p-6 bg-[#1A1A1A] border-[#2A2A2A]">
              <h2 className="text-xl font-semibold mb-6 text-white">Enter your details</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  {/* Essential fields */}
                  <div>
                    <Label htmlFor="name" className="flex items-center gap-2 text-white">
                      <User className="h-4 w-4 text-gray-400" />
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                      className="mt-1 bg-[#2A2A2A] border-[#3A3A3A] text-white placeholder:text-gray-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="flex items-center gap-2 text-white">
                      <Mail className="h-4 w-4 text-gray-400" />
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      required
                      className="mt-1 bg-[#2A2A2A] border-[#3A3A3A] text-white placeholder:text-gray-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="flex items-center gap-2 text-white">
                      <Phone className="h-4 w-4 text-gray-400" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                      className="mt-1 bg-[#2A2A2A] border-[#3A3A3A] text-white placeholder:text-gray-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes" className="text-white">
                      Additional Notes
                    </Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Please share anything that will help prepare for our meeting."
                      className="mt-1 min-h-[100px] bg-[#2A2A2A] border-[#3A3A3A] text-white placeholder:text-gray-500"
                    />
                  </div>

                  {/* Custom questions from the booking link */}
                  {bookingLink?.questions && bookingLink.questions.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-[#2A2A2A]">
                      <h3 className="text-md font-medium mb-4 text-white">Additional Information</h3>

                      <div className="space-y-4">
                        {bookingLink.questions.map((question: any, index: number) => (
                          <div key={question.id || index}>
                            <Label htmlFor={question.id || `question-${index}`} className="text-white">
                              {question.text || question.label}{" "}
                              {question.required && <span className="text-red-500">*</span>}
                            </Label>

                            {/* Render different input types based on question type */}
                            {(question.type === "text" || question.type === "short" || !question.type) && (
                              <Input
                                id={question.id || `question-${index}`}
                                value={formData.questionAnswers[question.id || `question-${index}`] || ""}
                                onChange={(e) =>
                                  handleQuestionChange(question.id || `question-${index}`, e.target.value)
                                }
                                placeholder="Your answer"
                                required={question.required}
                                className="mt-1 bg-[#2A2A2A] border-[#3A3A3A] text-white placeholder:text-gray-500"
                              />
                            )}

                            {(question.type === "textarea" || question.type === "long") && (
                              <Textarea
                                id={question.id || `question-${index}`}
                                value={formData.questionAnswers[question.id || `question-${index}`] || ""}
                                onChange={(e) =>
                                  handleQuestionChange(question.id || `question-${index}`, e.target.value)
                                }
                                placeholder="Your answer"
                                required={question.required}
                                className="mt-1 bg-[#2A2A2A] border-[#3A3A3A] text-white placeholder:text-gray-500"
                              />
                            )}

                            {(question.type === "select" || question.type === "single") && question.options && (
                              <Select
                                value={formData.questionAnswers[question.id || `question-${index}`] || ""}
                                onValueChange={(value) =>
                                  handleQuestionChange(question.id || `question-${index}`, value)
                                }
                              >
                                <SelectTrigger className="mt-1 bg-[#2A2A2A] border-[#3A3A3A] text-white">
                                  <SelectValue placeholder="Select an option" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#2A2A2A] border-[#3A3A3A] text-white">
                                  {question.options.map((option: string, optIndex: number) => (
                                    <SelectItem key={optIndex} value={option} className="text-white hover:bg-[#3A3A3A]">
                                      {option}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}

                            {question.type === "radio" && question.options && (
                              <RadioGroup
                                className="mt-1 space-y-2"
                                value={formData.questionAnswers[question.id || `question-${index}`] || ""}
                                onValueChange={(value) =>
                                  handleQuestionChange(question.id || `question-${index}`, value)
                                }
                              >
                                {question.options.map((option: string, optIndex: number) => (
                                  <div key={optIndex} className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value={option}
                                      id={`${question.id || `question-${index}`}-option-${optIndex}`}
                                      className="border-[#3A3A3A] text-[#7747FF]"
                                    />
                                    <Label
                                      htmlFor={`${question.id || `question-${index}`}-option-${optIndex}`}
                                      className="text-white"
                                    >
                                      {option}
                                    </Label>
                                  </div>
                                ))}
                              </RadioGroup>
                            )}

                            {(question.type === "checkbox" || question.type === "multiple") && question.options && (
                              <div className="mt-1 space-y-2">
                                {question.options.map((option: string, optIndex: number) => (
                                  <div key={optIndex} className="flex items-center space-x-2">
                                    <Checkbox
                                      id={`${question.id || `question-${index}`}-option-${optIndex}`}
                                      checked={
                                        formData.checkboxAnswers[question.id || `question-${index}`]?.[optIndex] ||
                                        false
                                      }
                                      onCheckedChange={(checked) =>
                                        handleCheckboxQuestionChange(
                                          question.id || `question-${index}`,
                                          optIndex,
                                          checked as boolean,
                                        )
                                      }
                                      className="border-[#3A3A3A] text-[#7747FF] data-[state=checked]:bg-[#7747FF] data-[state=checked]:text-white"
                                    />
                                    <Label
                                      htmlFor={`${question.id || `question-${index}`}-option-${optIndex}`}
                                      className="text-white"
                                    >
                                      {option}
                                    </Label>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-start space-x-2 pt-4">
                    <Checkbox
                      id="termsAccepted"
                      checked={formData.termsAccepted}
                      onCheckedChange={(checked) => handleTermsChange(checked as boolean)}
                      required
                      className="border-[#3A3A3A] text-[#7747FF] data-[state=checked]:bg-[#7747FF] data-[state=checked]:text-white"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="termsAccepted"
                        className="text-sm font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the terms and conditions
                      </label>
                      <p className="text-sm text-gray-400">
                        By scheduling this meeting, you agree to our privacy policy and terms of service.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    className="bg-[#2A2A2A] border-[#3A3A3A] text-white hover:bg-[#3A3A3A] hover:text-white"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button type="submit" className="bg-[#7747FF] hover:bg-[#6a3ee6] text-white">
                    Complete Booking
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t border-[#2A2A2A] py-6">
        <div className="container mx-auto max-w-4xl px-4">
          <p className="text-center text-sm text-gray-400">
            Powered by <span className="font-semibold text-[#7747FF]">OxCal</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
