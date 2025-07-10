export interface Event {
  id: string
  title: string
  time: string
  host: string
  location: string
  category: "founders" | "ai" | "vc" | "networking" | "demo"
  rsvpUrl?: string
}

export interface CalendarDay {
  date: number
  isCurrentMonth: boolean
  events: Event[]
}
