'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { CheckCircle2, XCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import ReactConfetti from 'react-confetti'
import { useEffect, useState } from 'react'

interface ConfirmationStepProps {
  tournament: any
  formData: any
  error?: boolean
}

export function ConfirmationStep({
  tournament,
  formData,
  error = false
}: ConfirmationStepProps) {
  const router = useRouter()
  const [showConfetti, setShowConfetti] = useState(true)
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!error) {
      const timer = setTimeout(() => {
        setShowConfetti(false)
      }, 5000) // Los confetis durarán 5 segundos

      return () => clearTimeout(timer)
    }
  }, [error])

  const getMessage = () => {
    if (formData.paymentMethod === 'mercado_pago') {
      return 'Tu inscripción está pendiente de pago. Serás redirigido a Mercado Pago para completar la transacción.'
    }
    return 'Tu inscripción ha sido registrada. Recuerda realizar el pago el día del torneo antes de comenzar.'
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="text-center"
      >
        <div className="mb-6">
          <div className="mx-auto w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <XCircle className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">
            No se pudo completar la inscripción
          </h3>
          <p className="text-gray-600 mb-4">
            Hubo un problema al procesar tu inscripción. Por favor, intenta nuevamente más tarde.
          </p>
          <Button
            onClick={() => router.push('/tournaments')}
            className="w-full mb-2"
          >
            Volver a intentar
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push('/dashboard')}
            className="w-full"
          >
            Ir al inicio
          </Button>
        </div>
      </motion.div>
    )
  }

  return (
    <>
      {!error && showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.3}
          initialVelocityY={20}
          tweenDuration={5000}
          colors={[
            '#FF1461',
            '#18FF92',
            '#5A87FF',
            '#FBF38C',
            '#FF7F00',
            '#FF4F4F',
            '#FFCD4F'
          ]}
          confettiSource={{
            x: 0,
            y: 0,
            w: windowSize.width,
            h: 0
          }}
        />
      )}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="text-center"
      >
        <div className="mb-6">
          <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">
            ¡Inscripción completada!
          </h3>
          <p className="text-gray-600">
            {getMessage()}
          </p>
        </div>

        {/* Resumen de la inscripción */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-500">Torneo</div>
              <div className="font-medium">{tournament.name}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Categoría</div>
              <div className="font-medium">{formData.category}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Jugadores</div>
              <div className="space-y-1">
                <div className="font-medium">Tú</div>
                <div className="font-medium">{formData.partnerName}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => router.push('/dashboard')}
            className="w-full"
          >
            Ir al inicio
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push('/tournaments')}
            className="w-full"
          >
            Ver más torneos
          </Button>
        </div>
      </motion.div>
    </>
  )
} 