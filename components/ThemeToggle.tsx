'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [systemPrefersDark, setSystemPrefersDark] = useState(false)

  useEffect(() => {
    setMounted(true)
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    setSystemPrefersDark(media.matches)
    const listener = (event: MediaQueryListEvent) => setSystemPrefersDark(event.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [])

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  const isDark = mounted && (theme === 'dark' || (theme === 'system' && systemPrefersDark))

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
      suppressHydrationWarning
    >
      {mounted ? (
        isDark ? (
          <Moon className="w-5 h-5" />
        ) : (
          <Sun className="w-5 h-5" />
        )
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  )
}
