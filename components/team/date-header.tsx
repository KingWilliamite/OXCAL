import { format, isToday, isTomorrow } from "date-fns"

interface DateHeaderProps {
  date: string
  count: number
}

export function DateHeader({ date, count }: DateHeaderProps) {
  const formatDateHeader = (dateString: string) => {
    const dateObj = new Date(dateString)

    if (isToday(dateObj)) {
      return "Today"
    } else if (isTomorrow(dateObj)) {
      return "Tomorrow"
    } else {
      return format(dateObj, "EEEE, MMMM d, yyyy")
    }
  }

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-medium text-white">{formatDateHeader(date)}</h2>
      <div className="rounded-full bg-[#2A2A2A] px-2 py-1 text-xs text-gray-300">{count} meetings</div>
    </div>
  )
}
