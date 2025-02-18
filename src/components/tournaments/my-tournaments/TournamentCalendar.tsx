'use client'

import { Calendar } from '@/components/ui/calendar'
import { es } from 'date-fns/locale'

interface TournamentCalendarProps {
  date: Date | undefined
  onSelect: (date: Date | undefined) => void
}

export function TournamentCalendar({ date, onSelect }: TournamentCalendarProps) {
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={onSelect}
      locale={es}
      className="w-full"
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4 w-full",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex justify-around",
        head_cell: "text-gray-500 rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full justify-around mt-2",
        cell: "text-center text-sm relative p-0 hover:bg-gray-100 rounded-md",
        day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-gray-100 rounded-md",
        day_selected: "bg-blue-500 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-500 focus:text-white",
        day_today: "bg-blue-500",
        day_outside: "opacity-50",
        day_disabled: "opacity-50",
        day_range_middle: "aria-selected:bg-gray-100",
        day_hidden: "invisible",
      }}
    />
  )
} 