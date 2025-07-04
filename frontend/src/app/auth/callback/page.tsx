'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import vincentAuth from '@/services/vincentAuth'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    // Vincent auth service will automatically handle the JWT from URL
    // and clean up the URL parameters
    const checkAuth = () => {
      const authState = vincentAuth.getAuthState()
      
      if (authState.isAuthenticated) {
        // Authentication successful, redirect to permissions page
        console.log('✅ Vincent authentication successful, redirecting...')
        router.push('/permissions')
      } else {
        // Authentication failed or incomplete
        console.log('❌ Vincent authentication failed, redirecting to home...')
        router.push('/')
      }
    }

    // Give Vincent service time to process the callback
    setTimeout(checkAuth, 1000)
  }, [router])

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-white mb-2">
          Processing Vincent Authentication...
        </h2>
        <p className="text-gray-400">
          Please wait while we complete your authentication
        </p>
      </div>
    </div>
  )
}
