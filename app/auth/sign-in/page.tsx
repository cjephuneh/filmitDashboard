'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiLock, FiFilm } from 'react-icons/fi'
import { Toaster, toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    const loadingToast = toast.loading('Logging you in...')
    
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Login failed')
      
      toast.success('Welcome back!', {
        id: loadingToast,
      })
      router.push('/dashboard')
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Invalid email or password', {
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
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mx-auto w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center"
          >
            <FiFilm className="w-8 h-8 text-yellow-500" />
          </motion.div>
          <h2 className="mt-6 text-3xl font-bold text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Continue your filmmaking journey
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
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
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-700 bg-black/30 text-yellow-600 focus:ring-yellow-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link href="/auth/forgot-password" className="text-yellow-500 hover:text-yellow-400">
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-400">
          New to our platform?{' '}
          <Link href="/auth/sign-up" className="text-yellow-500 hover:text-yellow-400">
            Join the community
          </Link>
        </p>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-black/50 text-gray-400">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="w-full px-4 py-2 border border-gray-700 rounded-lg text-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors"
          >
            Google
          </button>
          <button
            type="button"
            className="w-full px-4 py-2 border border-gray-700 rounded-lg text-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors"
          >
            Apple
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default LoginPage 