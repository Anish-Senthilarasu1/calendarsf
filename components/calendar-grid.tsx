import type { CalendarDay as CalendarDayType } from "@/types/event"
import { CalendarDay } from "./calendar-day"

interface CalendarGridProps {
  days: CalendarDayType[]
  monthName: string
}

const dayHeaders = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export function CalendarGrid({ days, monthName }: CalendarGridProps) {
  return (
    <div className="sm:bg-white sm:border sm:border-neutral-200 bg-transparent border-0 rounded-lg overflow-hidden">
      {/* Day headers - hidden on mobile */}
      <div className="hidden sm:grid grid-cols-7 border-b border-neutral-200">
        {dayHeaders.map((day) => (
          <div
            key={day}
            className="p-2 sm:p-4 text-center text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wide bg-gray-50"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 sm:gap-0 gap-[1px]">
        {days.map((day, index) => (
          <CalendarDay key={index} day={day} monthName={monthName} />
        ))}
      </div>
    </div>
  )
}
