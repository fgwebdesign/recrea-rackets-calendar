'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get user data from Supabase after Google OAuth
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        
        if (userError || !user?.email) {
          console.error('No user or email found:', userError)
          router.push('/auth/login')
          return
        }

        // Check if user exists in our backend
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google-check`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            email: user.email,
            google_id: user.id,
            aud: user.aud // This is the audience claim from Supabase
          })
        })

        const data = await response.json()

        if (response.ok && data.exists) {
          // Store user data in localStorage if needed
          if (data.user) {
            localStorage.setItem('userName', `${data.user.first_name} ${data.user.last_name}`)
            localStorage.setItem('userRole', data.user.role)
          }
          
          // User exists in our system, proceed to dashboard
          router.push('/dashboard')
        } else {
          // User doesn't exist, redirect to onboarding
          router.push(`/onboarding?email=${encodeURIComponent(user.email)}&google_id=${user.id}`)
        }

      } catch (error) {
        console.error('Error in auth callback:', error)
        router.push('/auth/login')
      }
    }

    handleCallback()
  }, [router])

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )
} 