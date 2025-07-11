import type { Event } from "@/types/event"

interface EventCardProps {
  event: Event
}

const categoryColors = {
  founders: "bg-amber-50 border-amber-200",
  ai: "bg-blue-50 border-blue-200",
  vc: "bg-green-50 border-green-200",
  networking: "bg-purple-50 border-purple-200",
  demo: "bg-orange-50 border-orange-200",
}

export function EventCard({ event }: EventCardProps) {
  return (
    <div
      className={`p-1.5 sm:p-2 mb-1 border rounded-md text-xs transition-all hover:shadow-sm ${categoryColors[event.category]}`}
    >
      <div className="flex flex-col gap-1">
        <div className="flex-1">
          <div className="font-semibold text-gray-900 text-xs leading-tight break-words">
            {event.time && (
              <span className="block text-gray-600 mb-0.5">
                {event.time}
              </span>
            )}
            <span className="block">{event.title}</span>
          </div>
          <div className="text-gray-600 mt-0.5 text-xs leading-tight">{event.host}</div>
          <div className="text-gray-500 mt-0.5 text-xs leading-tight">{event.location}</div>
        </div>
        {event.rsvpUrl && (
          <a
            href={event.rsvpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900 underline decoration-dotted underline-offset-2 text-xs self-start"
          >
            RSVP →
          </a>
        )}
      </div>
    </div>
  )
}
