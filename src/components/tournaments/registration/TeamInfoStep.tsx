'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { MOCK_USERS } from '@/mocks/users'

interface TeamInfoStepProps {
  formData: any
  updateFormData: (data: any) => void
  onNext: () => void
}

export function TeamInfoStep({ formData, updateFormData, onNext }: TeamInfoStepProps) {
  const [selectedPartnerId, setSelectedPartnerId] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedPartnerId) {
      setError('Debes seleccionar un compañero')
      return
    }

    const partner = MOCK_USERS.find(user => user.id === selectedPartnerId)
    updateFormData({ 
      partnerId: selectedPartnerId,
      partnerName: partner?.name
    })
    onNext()
  }

  const filteredUsers = MOCK_USERS.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-base font-medium text-gray-900 mb-4">
            Selecciona tu compañero de equipo
          </label>

          {/* Barra de búsqueda */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Buscar jugador..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Lista de usuarios con scroll */}
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-50">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center space-x-4 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <Checkbox
                  checked={selectedPartnerId === user.id}
                  onCheckedChange={() => {
                    setSelectedPartnerId(user.id)
                    setError('')
                  }}
                />
                
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="font-medium">{user.name}</div>
                </div>

                <Badge variant="secondary">
                  Categoría {user.category}
                </Badge>
              </div>
            ))}

            {filteredUsers.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No se encontraron jugadores
              </div>
            )}
          </div>

          {error && (
            <p className="mt-2 text-sm text-red-500">{error}</p>
          )}
        </div>

        <div className="flex justify-end">
          <Button type="submit">
            Siguiente
          </Button>
        </div>
      </form>
    </motion.div>
  )
} 