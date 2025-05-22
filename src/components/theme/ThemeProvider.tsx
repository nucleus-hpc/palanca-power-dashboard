
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
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      
      // Add listener for changes to system theme preference
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      const handleChange = () => {
        if (theme === "system") {
          root.classList.remove("light", "dark")
          root.classList.add(mediaQuery.matches ? "dark" : "light")
        }
      }
      
      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    } else {
      root.classList.add(theme)
    }
  }, [theme])

  // Apply smooth transitions for theme changes
  useEffect(() => {
    const root = window.document.documentElement
    root.style.setProperty("--transition-duration", "200ms")
    
    // Add transition class after mount to prevent transitions on page load
    const transitionClass = "transition-colors duration-300"
    
    // Add transition to elements that should have color transitions
    const elementsToTransition = [
      "body", 
      ".card", 
      ".badge", 
      "button",
      ".dark .bg-card",
      ".dark .text-foreground",
      ".dark .border-border"
    ]
    
    const styleElement = document.createElement("style")
    styleElement.textContent = `
      ${elementsToTransition.join(", ")} {
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
      }
    `
    document.head.appendChild(styleElement)
    
    return () => {
      document.head.removeChild(styleElement)
    }
  }, [])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
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
