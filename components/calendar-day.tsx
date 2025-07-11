"use client"

import { useState } from "react"
import type { CalendarDay as CalendarDayType } from "@/types/event"
import { EventCard } from "./event-card"
import { MobileDatePopup } from "./mobile-date-popup"

const categoryColors = {
  founders: "bg-amber-400",
  ai: "bg-blue-400", 
  vc: "bg-green-400",
  networking: "bg-purple-400",
  demo: "bg-orange-400",
}

interface CalendarDayProps {
  day: CalendarDayType
  monthName?: string
}

export function CalendarDay({ day, monthName = "" }: CalendarDayProps) {
  const [showAllEvents, setShowAllEvents] = useState(false)
  const [showMobilePopup, setShowMobilePopup] = useState(false)
  const visibleEvents = showAllEvents ? day.events : day.events.slice(0, 3)
  const remainingCount = day.events.length - 3

  const handleMobileClick = () => {
    if (day.isCurrentMonth && day.events.length > 0) {
      setShowMobilePopup(true)
    }
  }

  return (
    <>
      <div
        className={`
          min-h-[120px] sm:min-h-[120px] min-h-[100px] p-1 sm:p-3 
          sm:bg-white sm:border-neutral-200 bg-white border-gray-200 border
          transition-all hover:shadow-sm hover:border-neutral-300
          ${!day.isCurrentMonth ? "opacity-40" : ""}
          ${day.isCurrentMonth && day.events.length > 0 ? "sm:cursor-default cursor-pointer" : ""}
        `}
        onClick={handleMobileClick}
      >
      {/* Mobile layout */}
      <div className="sm:hidden flex flex-col h-full py-2">
        <div className="flex justify-center mb-3">
          <span
            className={`
              text-2xl font-light leading-none
              ${day.isCurrentMonth ? "text-gray-900" : "text-gray-500"}
              ${day.date === 10 ? "bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-medium" : ""}
            `}
          >
            {day.date}
          </span>
        </div>
        
        {/* Event indicators as colored bars */}
        <div className="flex-1 flex flex-col justify-end gap-1 px-2">
          {day.events.slice(0, 4).map((event, index) => (
            <div
              key={event.id}
              className={`h-1.5 rounded-full ${categoryColors[event.category]}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden sm:block">
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
      </div>

      <MobileDatePopup
        isOpen={showMobilePopup}
        onClose={() => setShowMobilePopup(false)}
        date={day.date}
        events={day.events}
        monthName={monthName}
      />
    </>
  )
}
