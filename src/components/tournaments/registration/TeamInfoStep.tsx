'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

interface User {
  id: string
  email: string
  name: string
  avatar: string
  role: string
  status: string
}

interface TeamInfoStepProps {
  formData: any
  updateFormData: (data: any) => void
  onNext: () => void
}

export function TeamInfoStep({ formData, updateFormData, onNext }: TeamInfoStepProps) {
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [error, setError] = useState('')
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/players`)
        if (!response.ok) {
          throw new Error('Failed to fetch users')
        }
        const data = await response.json()
        const transformedUsers = data.map((user: any) => ({
          id: user.id,
          email: user.email,
          name: `${user.first_name} ${user.last_name}`,
          avatar: user.profile_photo || '/assets/user.png',
          role: user.role || 'user',
          status: 'active'
        }))
        setUsers(transformedUsers)
      } catch (error) {
        console.error('Error fetching users:', error)
        setError('Error al cargar los jugadores')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedPartnerId) {
      setError('Debes seleccionar un compañero')
      return
    }

    const partner = users.find(user => user.id === selectedPartnerId)
    updateFormData({ 
      partnerId: selectedPartnerId,
      partnerName: partner?.name
    })
    onNext()
  }

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <p>Cargando jugadores...</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="h-full flex flex-col"
    >
      <form onSubmit={handleSubmit} className="space-y-6 h-full flex flex-col">
        <div>
          <label className="block text-base font-medium text-gray-900 mb-4">
            Selecciona tu compañero de equipo
          </label>
          <Input
            type="text"
            placeholder="Buscar jugador..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4"
          />
        </div>

        {/* Lista de usuarios con scroll */}
        <div className="h-[330px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-50">
          <div className="space-y-3">
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
                  Categoría {user.role}
                </Badge>
              </div>
            ))}

            {filteredUsers.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No se encontraron jugadores
              </div>
            )}
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-600 mt-4">{error}</p>
        )}

        <div className="mt-6 flex justify-end">
          <Button type="submit" disabled={!selectedPartnerId}>
            Siguiente
          </Button>
        </div>
      </form>
    </motion.div>
  )
} 