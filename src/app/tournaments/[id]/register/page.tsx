'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { TeamInfoStep } from '@/components/tournaments/registration/TeamInfoStep'
import { CategoryStep } from '@/components/tournaments/registration/CategoryStep'
import { PlayersStep } from '@/components/tournaments/registration/PlayersStep'
import { PaymentStep } from '@/components/tournaments/registration/PaymentStep'
import { ConfirmationStep } from '@/components/tournaments/registration/ConfirmationStep'
import { Progress } from '@/components/ui/progress'
import { AppSidebar } from '@/components/app/Sidebar'
import { BottomNav } from '@/components/navigation/BottomNav'
import { TournamentBanner } from '@/components/tournaments/registration/TournamentBanner'
import { SidebarProvider } from '@/components/ui/sidebar'

interface Tournament {
  id: string
  name: string
  category_id: string
  courts_available: number
  time_slots: number[][]
  start_date: string
  end_date: string
}

interface AvailabilityMap {
  [hour: number]: {
    available: boolean
    remaining_slots: number
  }
}

interface FormData {
  partnerId: number | null
  partnerName: string | null
  category: string
  paymentMethod: string
  registrationStatus: string
  unavailableHour?: number
}

export default function TournamentRegistrationPage() {
  const params = useParams()
  const router = useRouter()
  const [tournament, setTournament] = useState<Tournament | null>(null)
  const [availableHours, setAvailableHours] = useState<AvailabilityMap>({})
  const [loading, setLoading] = useState(true)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    partnerId: null,
    partnerName: null,
    category: '',
    paymentMethod: '',
    registrationStatus: 'pending'
  })

  useEffect(() => {
    const fetchTournamentData = async () => {
      try {
        // Fetch tournament details
        const tournamentRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tournaments/${params.id}`)
        if (!tournamentRes.ok) {
          throw new Error('Failed to fetch tournament')
        }
        const tournamentData = await tournamentRes.json()
        console.log(tournamentData)
        // Fetch available hours
        const hoursRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tournaments/${params.id}/available-hours`)
        if (!hoursRes.ok) {
          throw new Error('Failed to fetch available hours')
        }
        const hoursData = await hoursRes.json()
        console.log(hoursData)
        setTournament(tournamentData)
        setAvailableHours(hoursData.availability)
      } catch (error) {
        console.error('Error fetching tournament data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTournamentData()
  }, [params.id])

  const steps = [
    { id: 1, name: 'Información del Equipo' },
    { id: 2, name: 'Categoría' },
    { id: 3, name: 'Pago' },
    { id: 4, name: 'Confirmación' }
  ]

  const progress = (currentStep / steps.length) * 100

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length))
  }

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }))
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-600">Cargando información del torneo...</p>
        </div>
      </div>
    )
  }

  if (!tournament) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Torneo no encontrado</h2>
          <button
            onClick={() => router.back()}
            className="mt-4 text-sm text-gray-600 hover:text-gray-900"
          >
            ← Volver
          </button>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-50 w-full">
        <AppSidebar />
        <main className="flex-1 w-full overflow-hidden">
          <div className="max-w-3xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
              <button
                onClick={() => router.back()}
                className="text-sm text-gray-600 hover:text-gray-900 mb-4 flex items-center"
              >
                ← Volver al torneo
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                Inscripción: {tournament.name}
              </h1>
            </div>

            {/* Banner */}
            <div className="mb-8">
              <TournamentBanner tournament={tournament} />
            </div>

            {/* Progress */}
            <div className="mb-8">
              <Progress value={progress} className="h-2" />
              <div className="mt-2 text-sm text-gray-600">
                Paso {currentStep} de {steps.length}
              </div>
            </div>

            {/* Form Steps */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <TeamInfoStep
                    formData={formData}
                    updateFormData={updateFormData}
                    onNext={handleNext}
                    availableHours={availableHours}
                  />
                )}
                {currentStep === 2 && (
                  <CategoryStep
                    tournament={tournament}
                    formData={formData}
                    updateFormData={updateFormData}
                    onNext={handleNext}
                    onBack={handleBack}
                  />
                )}
                {currentStep === 3 && (
                  <PaymentStep
                    tournament={tournament}
                    formData={formData}
                    updateFormData={updateFormData}
                    onNext={handleNext}
                    onBack={handleBack}
                  />
                )}
                {currentStep === 4 && (
                  <ConfirmationStep
                    tournament={tournament}
                    formData={formData}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </main>
        <BottomNav />
      </div>
    </SidebarProvider>
  )
}