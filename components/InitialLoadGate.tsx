'use client'

import { useEffect, useState } from 'react'
import Loader from './Loader'

type Props = {
  children: React.ReactNode
}

export default function InitialLoadGate({ children }: Props) {
  const [showLoader, setShowLoader] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const seen = typeof window !== 'undefined' && sessionStorage.getItem('seen-loader')
    if (!seen) {
      setShowLoader(true)
    } else {
      setReady(true)
    }
  }, [])

  const handleComplete = () => {
    try { sessionStorage.setItem('seen-loader', 'true') } catch {}
    setShowLoader(false)
    setReady(true)
  }

  return (
    <>
      {showLoader && <Loader onComplete={handleComplete} />}
      {ready && children}
    </>
  )
}
