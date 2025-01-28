'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Wallet, MapPin, Loader2, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface PaymentStepProps {
  tournament: any
  formData: any
  updateFormData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

export function PaymentStep({
  tournament,
  formData,
  updateFormData,
  onNext,
  onBack
}: PaymentStepProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.paymentMethod) return

    setIsProcessing(true)
    setError(null)

    try {
      // Simulamos un pequeño delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Actualizamos el estado de la inscripción
      updateFormData({ 
        registrationStatus: formData.paymentMethod === 'mercado_pago' ? 'pending_payment' : 'pending_local'
      })
      
      // Importante: llamamos a onNext después de actualizar el estado
      onNext()
    } catch (error) {
      console.error('Error:', error)
      setError(
        'No pudimos procesar tu inscripción en este momento. Por favor, intenta nuevamente más tarde.'
      )
    } finally {
      setIsProcessing(false)
    }
  }

  const paymentMethods = [
    {
      id: 'mercado_pago',
      name: 'Mercado Pago',
      description: 'Pago online con Mercado Pago',
      icon: Wallet
    },
    {
      id: 'local',
      name: 'Pagar el día del torneo',
      description: 'Realiza el pago directamente en nuestras instalaciones el día del evento',
      icon: MapPin
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error}
              <Button
                variant="link"
                className="p-0 h-auto font-normal text-red-700 hover:text-red-800"
                onClick={() => setError(null)}
              >
                Intentar nuevamente
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Resumen de pago */}
        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Inscripción</span>
            <span className="font-medium">${tournament.price}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Jugadores</span>
            <span className="font-medium">2</span>
          </div>
          <div className="pt-2 border-t">
            <div className="flex justify-between">
              <span className="font-medium">Total</span>
              <span className="font-medium">${tournament.price}</span>
            </div>
          </div>
        </div>

        {/* Métodos de pago */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Selecciona un método de pago
          </label>
          
          <RadioGroup
            value={formData.paymentMethod}
            onValueChange={(value: string) => updateFormData({ paymentMethod: value })}
            className="grid gap-4"
          >
            {paymentMethods.map((method) => {
              const Icon = method.icon
              return (
                <div key={method.id}>
                  <RadioGroupItem
                    value={method.id}
                    id={method.id}
                    className="peer hidden"
                  />
                  <Label
                    htmlFor={method.id}
                    className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-blue-500 hover:bg-gray-50"
                  >
                    <Icon className="h-5 w-5 text-gray-600" />
                    <div>
                      <div className="font-medium">{method.name}</div>
                      <div className="text-sm text-gray-500">{method.description}</div>
                    </div>
                  </Label>
                </div>
              )
            })}
          </RadioGroup>

          {formData.paymentMethod === 'local' && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg text-sm text-blue-700">
              <p className="space-y-2">
                <strong className="block mb-1">Información importante:</strong>
                <span className="block">
                  • Tu inscripción quedará reservada y podrás pagar el día del torneo antes de comenzar.
                </span>
                <span className="block">
                  • Recuerda llegar con tiempo suficiente para realizar el pago.
                </span>
                <span className="block">
                  • El monto a pagar será de ${tournament.price}.
                </span>
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onBack}
            disabled={isProcessing}
          >
            Atrás
          </Button>
          <Button 
            type="submit" 
            disabled={isProcessing || !formData.paymentMethod}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {formData.paymentMethod === 'mercado_pago' ? 'Procesando pago...' : 'Confirmando inscripción...'}
              </>
            ) : (
              formData.paymentMethod === 'mercado_pago' ? 'Pagar ahora' : 'Confirmar inscripción'
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  )
} 