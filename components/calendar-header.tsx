"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CalendarHeaderProps {
  currentMonth: string
  onPreviousMonth: () => void
  onNextMonth: () => void
}

export function CalendarHeader({ currentMonth, onPreviousMonth, onNextMonth }: CalendarHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 gap-4">
      <div className="flex items-center gap-4">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 sm:text-gray-900 text-red-500">{currentMonth}</h1>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={onPreviousMonth} className="h-8 w-8 p-0 hover:bg-gray-100 sm:hover:bg-gray-100 hover:bg-gray-800 sm:text-gray-900 text-white">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onNextMonth} className="h-8 w-8 p-0 hover:bg-gray-100 sm:hover:bg-gray-100 hover:bg-gray-800 sm:text-gray-900 text-white">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
