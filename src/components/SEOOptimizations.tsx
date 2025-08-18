// Core Web Vitals and Performance Optimizations
'use client'

import { useEffect } from 'react'

export default function SEOOptimizations() {
  useEffect(() => {
    // Preload critical resources
    const preloadLinks = [
      { href: '/fonts/inter-var.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
    ]

    preloadLinks.forEach(link => {
      const linkElement = document.createElement('link')
      linkElement.rel = 'preload'
      linkElement.href = link.href
      linkElement.as = link.as
      if (link.type) linkElement.type = link.type
      if (link.crossorigin) linkElement.crossOrigin = link.crossorigin
      document.head.appendChild(linkElement)
    })

    // DNS prefetching for external resources
    const dnsPrefetchDomains = [
      '//fonts.googleapis.com',
      '//fonts.gstatic.com',
      '//www.googletagmanager.com',
      '//www.google-analytics.com',
      '//connect.facebook.net'
    ]

    dnsPrefetchDomains.forEach(domain => {
      const linkElement = document.createElement('link')
      linkElement.rel = 'dns-prefetch'
      linkElement.href = domain
      document.head.appendChild(linkElement)
    })

    // Preconnect to critical third-party origins
    const preconnectDomains = [
      { href: 'https://fonts.googleapis.com', crossorigin: true },
      { href: 'https://fonts.gstatic.com', crossorigin: true },
    ]

    preconnectDomains.forEach(domain => {
      const linkElement = document.createElement('link')
      linkElement.rel = 'preconnect'
      linkElement.href = domain.href
      if (domain.crossorigin) linkElement.crossOrigin = 'anonymous'
      document.head.appendChild(linkElement)
    })

    // Service Worker registration for PWA capabilities
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js').catch(console.error)
    }

    // Web Vitals monitoring
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // Monitor Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        console.log('LCP:', lastEntry.startTime)
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

      // Monitor First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          console.log('FID:', entry.processingStart - entry.startTime)
        })
      })
      fidObserver.observe({ entryTypes: ['first-input'] })

      // Monitor Cumulative Layout Shift (CLS)
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            console.log('CLS:', entry.value)
          }
        })
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })
    }
  }, [])

  return null // This component doesn't render anything visible
}