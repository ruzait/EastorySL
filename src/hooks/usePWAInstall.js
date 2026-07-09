import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'eastorysl_pwa_dismissed'

export default function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showPopup, setShowPopup] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === 'true') {
      setDismissed(true)
      return
    }

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    const iOS = /iphone|ipad|ipod/i.test(navigator.userAgent)

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowPopup(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    if (iOS) {
      setIsIOS(true)
      setShowPopup(true)
    }

    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  }, [])

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setShowPopup(false)
      setIsInstalled(true)
    }
    setDeferredPrompt(null)
  }, [deferredPrompt])

  const handleDismiss = useCallback(() => {
    setShowPopup(false)
    setDismissed(true)
    localStorage.setItem(STORAGE_KEY, 'true')
  }, [])

  const triggerInstall = useCallback(() => {
    if (isInstalled) return
    setShowPopup(true)
  }, [isInstalled])

  return {
    showPopup,
    isIOS,
    isInstalled,
    dismissed,
    deferredPrompt,
    handleInstall,
    handleDismiss,
    triggerInstall,
  }
}
