"use client"

import { useState } from "react"
import { PlusCircle, Trash2 } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface Question {
  id: string
  text: string
  type: "short" | "long" | "single" | "multiple"
  required: boolean
  options?: string[]
}

interface QualificationFormProps {
  formData: any
  onChange: (field: string, value: any) => void
}

export function QualificationForm({ formData, onChange }: QualificationFormProps) {
  const [newQuestionText, setNewQuestionText] = useState("")
  const [newQuestionType, setNewQuestionType] = useState<"short" | "long" | "single" | "multiple">("short")
  const [newQuestionRequired, setNewQuestionRequired] = useState(true)
  const [newOption, setNewOption] = useState("")

  const addQuestion = () => {
    if (!newQuestionText.trim()) return

    const newQuestion: Question = {
      id: Math.random().toString(36).substring(2, 9),
      text: newQuestionText,
      type: newQuestionType,
      required: newQuestionRequired,
      options: ["single", "multiple"].includes(newQuestionType) ? [] : undefined,
    }

    onChange("questions", [...formData.questions, newQuestion])
    setNewQuestionText("")
    setNewQuestionType("short")
    setNewQuestionRequired(true)
  }

  const removeQuestion = (id: string) => {
    onChange(
      "questions",
      formData.questions.filter((q: Question) => q.id !== id),
    )
  }

  const addOption = (questionId: string) => {
    if (!newOption.trim()) return

    const updatedQuestions = formData.questions.map((q: Question) => {
      if (q.id === questionId) {
        return {
          ...q,
          options: [...(q.options || []), newOption],
        }
      }
      return q
    })

    onChange("questions", updatedQuestions)
    setNewOption("")
  }

  const removeOption = (questionId: string, optionIndex: number) => {
    const updatedQuestions = formData.questions.map((q: Question) => {
      if (q.id === questionId) {
        return {
          ...q,
          options: q.options?.filter((_, i) => i !== optionIndex),
        }
      }
      return q
    })

    onChange("questions", updatedQuestions)
  }

  return (
    <div className="space-y-6 text-white">
      <h2 className="text-xl font-semibold">Qualification Questions</h2>
      <p className="text-gray-400">Add questions to gather information from attendees before they book.</p>

      <div className="space-y-6">
        {formData.questions.length > 0 ? (
          <div className="space-y-6">
            {formData.questions.map((question: Question) => (
              <div key={question.id} className="rounded-md border border-[#3A3A3A] bg-[#1A1A1A] p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">{question.text}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                      <span>
                        {question.type === "short"
                          ? "Short answer"
                          : question.type === "long"
                            ? "Long answer"
                            : question.type === "single"
                              ? "Single choice"
                              : "Multiple choice"}
                      </span>
                      <span>•</span>
                      <span>{question.required ? "Required" : "Optional"}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeQuestion(question.id)}
                    className="h-8 w-8 rounded-full p-0 text-gray-400 hover:bg-[#2A2A2A] hover:text-white"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove question</span>
                  </Button>
                </div>

                {["single", "multiple"].includes(question.type) && (
                  <div className="mt-4 space-y-3">
                    <p className="text-sm font-medium">Options</p>
                    <ul className="space-y-2">
                      {question.options?.map((option, index) => (
                        <li key={index} className="flex items-center justify-between">
                          <span className="text-sm">{option}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeOption(question.id, index)}
                            className="h-6 w-6 rounded-full p-0 text-gray-400 hover:bg-[#2A2A2A] hover:text-white"
                          >
                            <Trash2 className="h-3 w-3" />
                            <span className="sr-only">Remove option</span>
                          </Button>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center space-x-2">
                      <Input
                        value={newOption}
                        onChange={(e) => setNewOption(e.target.value)}
                        placeholder="Add new option"
                        className="bg-[#2A2A2A] border-[#3A3A3A] text-white placeholder:text-gray-500"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addOption(question.id)}
                        className="border-[#3A3A3A] bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-32 flex-col items-center justify-center rounded-md border border-dashed border-[#3A3A3A] bg-[#1A1A1A] p-4 text-center">
            <p className="text-gray-400">No questions added yet</p>
            <p className="text-xs text-gray-500">Add questions to gather information from attendees</p>
          </div>
        )}

        <div className="space-y-4 rounded-md border border-[#3A3A3A] bg-[#1A1A1A] p-4">
          <h3 className="text-sm font-medium">Add New Question</h3>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="questionText" className="text-white">
                Question
              </Label>
              <Input
                id="questionText"
                value={newQuestionText}
                onChange={(e) => setNewQuestionText(e.target.value)}
                placeholder="e.g. What would you like to discuss?"
                className="bg-[#2A2A2A] border-[#3A3A3A] text-white placeholder:text-gray-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="questionType" className="text-white">
                  Type
                </Label>
                <Select value={newQuestionType} onValueChange={(value: any) => setNewQuestionType(value)}>
                  <SelectTrigger id="questionType" className="bg-[#2A2A2A] border-[#3A3A3A] text-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2A2A2A] border-[#3A3A3A] text-white">
                    <SelectItem value="short" className="text-white hover:bg-[#3A3A3A]">
                      Short answer
                    </SelectItem>
                    <SelectItem value="long" className="text-white hover:bg-[#3A3A3A]">
                      Long answer
                    </SelectItem>
                    <SelectItem value="single" className="text-white hover:bg-[#3A3A3A]">
                      Single choice
                    </SelectItem>
                    <SelectItem value="multiple" className="text-white hover:bg-[#3A3A3A]">
                      Multiple choice
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="questionRequired" className="text-white">
                  Required
                </Label>
                <Select
                  value={newQuestionRequired ? "yes" : "no"}
                  onValueChange={(value) => setNewQuestionRequired(value === "yes")}
                >
                  <SelectTrigger id="questionRequired" className="bg-[#2A2A2A] border-[#3A3A3A] text-white">
                    <SelectValue placeholder="Required?" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2A2A2A] border-[#3A3A3A] text-white">
                    <SelectItem value="yes" className="text-white hover:bg-[#3A3A3A]">
                      Required
                    </SelectItem>
                    <SelectItem value="no" className="text-white hover:bg-[#3A3A3A]">
                      Optional
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={addQuestion}
              disabled={!newQuestionText.trim()}
              className="mt-2 w-full bg-[#7747FF] text-white hover:bg-[#8A5CFF]"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Question
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
