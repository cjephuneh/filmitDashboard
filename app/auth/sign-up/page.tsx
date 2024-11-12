'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiUser, FiMail, FiLock, FiPhone } from 'react-icons/fi'
import { Toaster, toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

function SignUpPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    const loadingToast = toast.loading('Creating your account...')
    
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          role: 'Producer',
          profilePicture: '',
          location: '',
          bio: '',
          language: 'English',
        }),
      })

      if (!response.ok) throw new Error('Signup failed')
      
      toast.success('Welcome to the film community!', {
        id: loadingToast,
      })
      router.push('/dashboard')
    } catch (error) {
      console.error('Signup error:', error)
      toast.error('Something went wrong. Please try again.', {
        id: loadingToast,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center px-4">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#FBBF24',
              secondary: '#333',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#333',
            },
          },
        }}
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-black/50 p-8 rounded-xl backdrop-blur-lg border border-gray-800"
      >
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-white">
            Join the Film Collab Community
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Your journey in cinema begins here
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-black/30 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-black/30 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-black/30 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <div className="relative">
              <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-black/30 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <a href="/auth/login" className="text-yellow-500 hover:text-yellow-400">
            Sign in
          </a>
        </p>
      </motion.div>
    </div>
  )
}

export default SignUpPage