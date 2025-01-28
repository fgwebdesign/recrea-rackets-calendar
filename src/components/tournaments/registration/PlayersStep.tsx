'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { MOCK_USERS } from '@/mocks/users'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

interface PlayersStepProps {
  formData: {
    partnerId: number | null;
    partnerName: string | null;
  };
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export function PlayersStep({
  formData,
  onNext,
  onBack
}: PlayersStepProps) {
  const partner = MOCK_USERS.find(user => user.id === formData.partnerId)
  const currentUser = {
    name: "Tu nombre",
    category: "4ta"
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-base font-medium text-gray-900 mb-4">
            Confirma los jugadores del equipo
          </label>

          <div className="space-y-3">
            {/* Usuario actual */}
            <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-4">
                <div>
                  <div className="font-medium">{currentUser.name}</div>
                  <div className="text-sm text-gray-500">Tú</div>
                </div>
              </div>
              <Badge variant="secondary">
                Categoría {currentUser.category}
              </Badge>
            </div>

            {/* Compañero seleccionado */}
            {partner && (
              <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="font-medium">{partner.name}</div>
                    <div className="text-sm text-gray-500">Compañero</div>
                  </div>
                </div>
                <Badge variant="secondary">
                  Categoría {partner.category}
                </Badge>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            Atrás
          </Button>
          <Button type="submit">
            Siguiente
          </Button>
        </div>
      </form>
    </motion.div>
  )
} 