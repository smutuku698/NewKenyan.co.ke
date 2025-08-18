'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X, Cookie } from 'lucide-react'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookie-consent')
    if (!hasConsented) {
      setIsVisible(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setIsVisible(false)
  }

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setIsVisible(false)
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start gap-4">
          <Cookie className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">
              We use cookies to enhance your experience
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              NewKenyan.com uses cookies to provide personalized content, analyze website traffic, 
              and improve our services. By continuing to use our site, you consent to our use of cookies. 
              Read our{' '}
              <a href="/privacy-policy" className="text-green-600 hover:underline">
                Privacy Policy
              </a>{' '}
              for more details.
            </p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Button
              onClick={declineCookies}
              variant="outline"
              size="sm"
              className="text-gray-600"
            >
              Decline
            </Button>
            <Button
              onClick={acceptCookies}
              size="sm"
              className="bg-green-600 hover:bg-green-700"
            >
              Accept All
            </Button>
          </div>
          <button
            onClick={declineCookies}
            className="text-gray-400 hover:text-gray-600 flex-shrink-0"
            aria-label="Close cookie consent"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}