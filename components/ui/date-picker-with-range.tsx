"use client"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

interface DatePickerWithRangeProps {
  date: DateRange | undefined
  onDateChange: (date: DateRange | undefined) => void
  className?: string
}

export function DatePickerWithRange({ date, onDateChange, className }: DatePickerWithRangeProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Calendar
        initialFocus
        mode="range"
        defaultMonth={date?.from}
        selected={date}
        onSelect={onDateChange}
        numberOfMonths={2}
        className="bg-[#1E1E1E] text-white"
        classNames={{
          day_selected: "bg-[#7747FF] text-white",
          day_today: "bg-[#2A2A2A] text-white",
          day_range_middle: "bg-[#7747FF]/20",
          day_range_end: "bg-[#7747FF] text-white",
          day_range_start: "bg-[#7747FF] text-white",
          day_outside: "text-gray-500 opacity-50",
          day: "text-white hover:bg-[#2A2A2A]",
          head_cell: "text-gray-400",
          caption: "text-white",
          nav_button: "text-white hover:bg-[#2A2A2A]",
          table: "border-[#2A2A2A]",
          cell: "text-white",
          month: "space-y-4",
        }}
      />
      <div className="flex justify-end gap-2 pt-2 border-t border-[#2A2A2A]">
        <Button
          variant="outline"
          className="text-white border-[#2A2A2A] bg-[#1E1E1E] hover:bg-[#2A2A2A]"
          onClick={() => onDateChange(undefined)}
        >
          Cancel
        </Button>
        <Button
          className="bg-[#7747FF] text-white hover:bg-[#6636EE]"
          onClick={() => {
            if (date?.from && date?.to) {
              onDateChange(date)
            }
          }}
        >
          Apply
        </Button>
      </div>
    </div>
  )
}
