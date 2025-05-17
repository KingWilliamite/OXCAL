import { CheckCircle2 } from "lucide-react"

interface ProgressIndicatorProps {
  currentStep: "details" | "availability" | "forms" | "share"
}

export function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  const steps = [
    { id: "details", label: "Details" },
    { id: "availability", label: "Availability" },
    { id: "forms", label: "Forms" },
    { id: "share", label: "Share" },
  ]

  const getCurrentStepIndex = () => {
    return steps.findIndex((step) => step.id === currentStep)
  }

  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => {
        const currentIndex = getCurrentStepIndex()
        const isCompleted = index < currentIndex
        const isCurrent = index === currentIndex
        const isUpcoming = index > currentIndex

        return (
          <div key={step.id} className="flex flex-1 items-center">
            <div className="flex items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                  isCompleted
                    ? "bg-[#7747FF] text-white"
                    : isCurrent
                      ? "border-2 border-[#7747FF] bg-transparent text-white"
                      : "border-2 border-[#3A3A3A] bg-transparent text-gray-400"
                }`}
              >
                {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : index + 1}
              </div>
              <span className={`ml-2 text-sm font-medium ${isCompleted || isCurrent ? "text-white" : "text-gray-400"}`}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`ml-2 h-0.5 flex-1 ${index < currentIndex ? "bg-[#7747FF]" : "bg-[#3A3A3A]"}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
