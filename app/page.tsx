"use client"

import { useState, useMemo, useCallback } from "react"
import { CalendarHeader } from "@/components/calendar-header"
import { CalendarGrid } from "@/components/calendar-grid"
import type { Event, CalendarDay } from "@/types/event"

// Sample SF tech events data
const sampleEvents: Event[] = [
  {
    id: "1",
    title: "Eric Zhu Birthday",
    time: "",
    host: "Eric Zhu",
    location: "SF",
    category: "networking",
    rsvpUrl: "https://partiful.com/e/eZLDxYHRfHQYMeER3ZFy",
  },
  {
    id: "2",
    title: "Magical AI Hackathon",
    time: "All Day",
    host: "Replicate x BuildShip",
    location: "SF",
    category: "ai",
    rsvpUrl: "https://lu.ma/ai-magic-hack",
  },
  {
    id: "3",
    title: "WeaveHacks: Agent Protocols Hackathon",
    time: "All Day",
    host: "Weave",
    location: "SF",
    category: "ai",
    rsvpUrl: "https://lu.ma/weavehacks",
  },
  {
    id: "4",
    title: "AI Summit @ Viva Frontier Tower",
    time: "All Day",
    host: "Viva Frontier",
    location: "SF",
    category: "ai",
    rsvpUrl: "https://lu.ma/ai.summit",
  },
  {
    id: "5",
    title: "Manus AI & Friends: Sunday Hike in SF",
    time: "Morning",
    host: "Manus AI",
    location: "SF",
    category: "networking",
    rsvpUrl: "https://lu.ma/yhun3bmw",
  },
  {
    id: "6",
    title: "Hello, Self-Writing Internet",
    time: "",
    host: "Community",
    location: "SF",
    category: "ai",
    rsvpUrl: "https://lu.ma/hello-swi",
  },
  {
    id: "7",
    title: "SF RocketBoat: a16z x Cluely",
    time: "",
    host: "a16z x Cluely",
    location: "SF Bay",
    category: "networking",
    rsvpUrl: "https://partiful.com/e/y5uCoCv9KQCFwc6xszrq",
  },
  {
    id: "8",
    title: "pre everything dont",
    time: "",
    host: "afore.vc",
    location: "SF",
    category: "vc",
    rsvpUrl: "https://partiful.com/e/NnTDXd2lCSUaIU2FGEVEh",
  },
  {
    id: "9",
    title: "Tesla Meetup",
    time: "",
    host: "Tesla Community",
    location: "SF",
    category: "networking",
    rsvpUrl: "https://lu.ma/o7wbs0zn",
  },
  {
    id: "10",
    title: "Deep Tech x The Matrix",
    time: "7:00 PM",
    host: "Deep Tech Community",
    location: "SF",
    category: "networking",
    rsvpUrl: "https://lu.ma/9ti2oqpq",
  },
  {
    id: "11",
    title: "The Secret Soirée | SF Edition",
    time: "5:00 PM",
    host: "Secret Soirée",
    location: "SF",
    category: "networking",
    rsvpUrl: "https://lu.ma/tcda5wtx",
  },
  {
    id: "12",
    title: "Data Debug SF: Inaugural Happy Hour",
    time: "",
    host: "Data Debug SF",
    location: "SF",
    category: "networking",
    rsvpUrl: "https://lu.ma/g92ckftj",
  },
  {
    id: "13",
    title: "Bret Taylor",
    time: "",
    host: "SPC",
    location: "SF",
    category: "networking",
    rsvpUrl: "https://lu.ma/bret-taylor-spc-1",
  },
  {
    id: "14",
    title: "The Agentic Browser Summit",
    time: "",
    host: "Browser Community",
    location: "SF",
    category: "ai",
    rsvpUrl: "https://lu.ma/eqxs5f15",
  },
]

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 1)) // July 2025 (month is 0-indexed)

  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    // Get first day of month and how many days in month
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    // Get days from previous month to fill the grid
    const prevMonth = new Date(year, month - 1, 0)
    const daysInPrevMonth = prevMonth.getDate()

    const days: CalendarDay[] = []

    // Add days from previous month
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: daysInPrevMonth - i,
        isCurrentMonth: false,
        events: [],
      })
    }

    // Add days from current month with sample events
    for (let date = 1; date <= daysInMonth; date++) {
      const dayEvents = []

      // Add events to specific dates
      if (date === 11) dayEvents.push(sampleEvents[9]) // Deep Tech x The Matrix
      if (date === 12) dayEvents.push(sampleEvents[0]) // Eric Zhu Birthday
      if (date === 12) dayEvents.push(sampleEvents[1], sampleEvents[2], sampleEvents[3], sampleEvents[10]) // Magical AI Hackathon, WeaveHacks, AI Summit, Secret Soirée
      if (date === 13) dayEvents.push(sampleEvents[4]) // Manus AI Hike
      if (date === 15) dayEvents.push(sampleEvents[5], sampleEvents[13]) // Hello Self-Writing Internet, Agentic Browser Summit
      if (date === 16) dayEvents.push(sampleEvents[6], sampleEvents[12]) // SF RocketBoat, Bret Taylor
      if (date === 17) dayEvents.push(sampleEvents[7]) // pre everything dont
      if (date === 29) dayEvents.push(sampleEvents[11]) // Data Debug SF

      days.push({
        date,
        isCurrentMonth: true,
        events: dayEvents,
      })
    }

    // Add days from next month to complete the grid (42 total cells)
    const remainingCells = 42 - days.length
    for (let date = 1; date <= remainingCells; date++) {
      days.push({
        date,
        isCurrentMonth: false,
        events: [],
      })
    }

    // Add Tesla Meetup to August 1st (will show in next month navigation)

    return days
  }, [currentDate])

  const handlePreviousMonth = useCallback(() => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }, [currentDate])

  const handleNextMonth = useCallback(() => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }, [currentDate])

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-3 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center text-sm text-gray-500 mb-4 sm:mb-6">Built for founders, builders, and investors in SF</div>

        <CalendarHeader currentMonth={monthName} onPreviousMonth={handlePreviousMonth} onNextMonth={handleNextMonth} />

        <CalendarGrid days={calendarDays} monthName={monthName} />
      </div>
    </div>
  )
}
