
import { Moon, Sun } from "lucide-react"
import { useTheme } from "./ThemeProvider"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useState, useEffect } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  // Avoid hydration mismatch by only rendering after mounting on client
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) return null
  
  return (
    <div className="flex items-center space-x-2 bg-card/50 dark:bg-sidebar-accent/40 px-3 py-1.5 rounded-full">
      <Sun className="h-[1.2rem] w-[1.2rem] text-amber-500 dark:text-amber-300" />
      <Switch 
        id="theme-toggle"
        checked={theme === 'dark'}
        onCheckedChange={(checked) => {
          setTheme(checked ? 'dark' : 'light')
        }}
      />
      <Moon className="h-[1.2rem] w-[1.2rem] text-indigo-700 dark:text-indigo-300" />
    </div>
  )
}

export function ThemeToggleButton() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) return null
  
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:border-border/20"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
