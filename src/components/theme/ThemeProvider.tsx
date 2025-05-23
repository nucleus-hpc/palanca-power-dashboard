
"use client"

import * as React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
  undefined
)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  // Force light theme regardless of system or saved preferences
  const [theme] = useState<Theme>("light")

  useEffect(() => {
    const root = window.document.documentElement
    
    // Force removal of dark class and add light class
    root.classList.remove("dark")
    root.classList.add("light")
    
    // Store light theme in localStorage to persist across refreshes
    localStorage.setItem(storageKey, "light")
    
  }, [storageKey]) // Only run on mount and if storageKey changes

  // Provide a dummy setTheme function that does nothing
  const value = {
    theme: "light",
    setTheme: (_theme: Theme) => {
      // This is intentionally a no-op while dark mode is disabled
      console.log("Theme changing is temporarily disabled")
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
