'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { BookingCard } from '@/components/bookings/BookingCard'
import { BookingTabs } from '@/components/bookings/BookingTabs'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app/Sidebar'
import { BottomNav } from '@/components/navigation/BottomNav'

type Booking = {
  id: string
  court_id: string
  booking_date: string
  start_time: string
  end_time: string
  status: string
  court: {
    name: string
  }
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('upcoming')
  const [searchQuery, setSearchQuery] = useState('')
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId')

  useEffect(() => {
    const fetchBookings = async () => {
      if (!userId) return

      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          court:courts(name)
        `)
        .eq('booked_by', userId)
        .order('booking_date', { ascending: true })

      if (error) {
        console.error('Error fetching bookings:', error)
        return
      }

      setBookings(data)
      setLoading(false)
    }

    fetchBookings()
  }, [userId])

  const handleReschedule = (id: string) => {
    // Implement rescheduling logic
    console.log('Reschedule booking:', id)
  }

  const handleCancel = (id: string) => {
    // Implement cancellation logic
    console.log('Cancel booking:', id)
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">
          <div className="flex flex-col h-full">
            <div className="flex-1 space-y-4 p-8 pt-6">
              <div className="flex items-center justify-between gap-4 mb-8">
                <div className="relative w-64">
                  <Input
                    type="text"
                    placeholder="Buscar reservas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                <BookingTabs activeTab={activeTab} onTabChange={setActiveTab} />
              </div>
              
              <div className="grid gap-4">
                {bookings.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onReschedule={handleReschedule}
                    onCancel={handleCancel}
                  />
                ))}

                {bookings.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    No tienes reservas registradas
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
        <BottomNav />
      </div>
    </SidebarProvider>
  )
}
