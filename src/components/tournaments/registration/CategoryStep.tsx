'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface Tournament {
  id: number;
  name: string;
  availableSpots: Record<string, number>;
  totalTeams: Record<string, number>;
}

interface Category {
  id: string;
  name: string;
}

interface CategoryStepProps {
  tournament: Tournament;
  formData: {
    category: string;
  };
  updateFormData: (data: Partial<{ category: string }>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function CategoryStep({ 
  tournament, 
  formData, 
  updateFormData, 
  onNext, 
  onBack 
}: CategoryStepProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
        if (!response.ok) {
          throw new Error('Failed to fetch categories')
        }
        const data = await response.json()
        setCategories(data)
      } catch (error) {
        console.error('Error fetching categories:', error)
        setError('Error al cargar las categorías')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.category) {
      onNext()
    }
  }

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <p>Cargando categorías...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center text-red-500">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Selecciona una categoría
          </label>
          
          <RadioGroup
            value={formData.category}
            onValueChange={(value: string) => updateFormData({ category: value })}
            className="grid gap-4"
          >
            {categories.map((category) => (
              <div key={category.id}>
                <RadioGroupItem
                  value={category.name}
                  id={category.id}
                  className="peer hidden"
                />
                <Label
                  htmlFor={category.id}
                  className="flex items-center justify-between p-4 border rounded-lg cursor-pointer peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-blue-500 hover:bg-gray-50"
                >
                  <div>
                    <div className="font-medium">{category.name}</div>
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            Atrás
          </Button>
          <Button type="submit" disabled={!formData.category}>
            Siguiente
          </Button>
        </div>
      </form>
    </motion.div>
  )
} 