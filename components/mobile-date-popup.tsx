"use client"

import { useState, useEffect } from "react"
import type { Event } from "@/types/event"
import { EventCard } from "./event-card"

interface MobileDatePopupProps {
  isOpen: boolean
  onClose: () => void
  date: number
  events: Event[]
  monthName: string
}

const categoryColors = {
  founders: "bg-amber-400",
  ai: "bg-blue-400", 
  vc: "bg-green-400",
  networking: "bg-purple-400",
  demo: "bg-orange-400",
}

export function MobileDatePopup({ isOpen, onClose, date, events, monthName }: MobileDatePopupProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10)
      document.body.style.overflow = 'hidden'
    } else {
      setIsVisible(false)
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div 
      className={`fixed inset-0 z-50 sm:hidden transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Popup */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl transition-transform duration-300 max-h-[80vh] overflow-hidden ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Handle bar */}
        <div className="flex justify-center py-3">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="px-6 pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                {monthName} {date}
              </h2>
              <p className="text-gray-600 mt-1">
                {events.length} {events.length === 1 ? 'event' : 'events'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Events list */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {events.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">No events today</p>
            </div>
          ) : (
            <div className="space-y-3">
              {events.map((event) => (
                <div key={event.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="flex items-start space-x-3">
                    <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${categoryColors[event.category]}`} />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 text-base leading-tight mb-2">
                        {event.title}
                      </h3>
                      {event.time && (
                        <p className="text-sm text-gray-600 mb-1">
                          <span className="font-medium">Time:</span> {event.time}
                        </p>
                      )}
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="font-medium">Host:</span> {event.host}
                      </p>
                      <p className="text-sm text-gray-600 mb-3">
                        <span className="font-medium">Location:</span> {event.location}
                      </p>
                      {event.rsvpUrl && (
                        <a
                          href={event.rsvpUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                          RSVP
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}