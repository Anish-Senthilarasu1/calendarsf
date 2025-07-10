"use client"

import { useState } from "react"
import type { CalendarDay as CalendarDayType } from "@/types/event"
import { EventCard } from "./event-card"

export function CalendarDay({ day }: { day: CalendarDayType }) {
  const [showAllEvents, setShowAllEvents] = useState(false)
  const visibleEvents = showAllEvents ? day.events : day.events.slice(0, 3)
  const remainingCount = day.events.length - 3

  return (
    <div
      className={`
        min-h-[120px] p-2 sm:p-3 bg-white border border-neutral-200 
        transition-all hover:shadow-sm hover:border-neutral-300
        ${!day.isCurrentMonth ? "opacity-40" : ""}
      `}
    >
      <div className="flex justify-between items-start mb-2">
        <span
          className={`
            text-sm font-semibold
            ${day.isCurrentMonth ? "text-gray-900" : "text-gray-400"}
          `}
        >
          {day.date}
        </span>
      </div>

      <div className="space-y-1">
        {visibleEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}

        {remainingCount > 0 && !showAllEvents && (
          <button
            onClick={() => setShowAllEvents(true)}
            className="text-xs text-gray-500 font-medium pt-1 hover:text-gray-700 cursor-pointer underline decoration-dotted"
          >
            + {remainingCount} more
          </button>
        )}

        {showAllEvents && remainingCount > 0 && (
          <button
            onClick={() => setShowAllEvents(false)}
            className="text-xs text-gray-500 font-medium pt-1 hover:text-gray-700 cursor-pointer underline decoration-dotted"
          >
            Show less
          </button>
        )}
      </div>
    </div>
  )
}
