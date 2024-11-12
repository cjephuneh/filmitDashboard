'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiLock } from 'react-icons/fi'
import { Toaster, toast } from 'react-hot-toast'
import Link from 'next/link'

function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const loadingToast = toast.loading('Sending reset instructions...')

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/request-password-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) throw new Error('Request failed')

      toast.success('Reset instructions sent to your email!', { id: loadingToast })
      setIsSubmitted(true)
    } catch (error) {
      console.error('Reset request error:', error)
      toast.error('Something went wrong. Please try again.', { id: loadingToast })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center px-4">
      <Toaster position="top-center" toastOptions={{
        style: { background: '#333', color: '#fff' },
        success: { iconTheme: { primary: '#FBBF24', secondary: '#333' }},
        error: { iconTheme: { primary: '#EF4444', secondary: '#333' }},
      }} />
      
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
            <FiLock className="w-8 h-8 text-yellow-500" />
          </motion.div>
          <h2 className="mt-6 text-3xl font-bold text-white">Forgot Password?</h2>
          <p className="mt-2 text-sm text-gray-400">No worries, we'll send you reset instructions</p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-black/30 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Sending...' : 'Reset Password'}
            </button>
          </form>
        ) : (
          <div className="text-center text-gray-400 space-y-4">
            <p>Check your email for the reset instructions.</p>
            <p>Didn't receive the email? Check your spam folder or try again.</p>
          </div>
        )}

        <div className="text-center">
          <Link href="/auth/login" className="text-sm text-yellow-500 hover:text-yellow-400">
            ← Back to login
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default ForgotPasswordPage 