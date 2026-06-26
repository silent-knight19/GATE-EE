"use client"
import { createContext, useContext, useEffect, useState } from "react"
import { useAppStore } from "@/lib/store"

type Theme = "dark" | "light"

const ThemeContext = createContext<{
  theme: Theme
  toggleTheme: () => void
}>({ theme: "dark", toggleTheme: () => {} })

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const appState = useAppStore((s) => s.appState)
  const storeToggleTheme = useAppStore((s) => s.toggleTheme)

  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("gateee-theme") as Theme) || appState.theme || "dark"
    }
    return "dark"
  })

  // Sync from Zustand store to local state and localStorage when store's theme changes
  useEffect(() => {
    if (appState.theme && appState.theme !== theme) {
      setTheme(appState.theme)
      localStorage.setItem("gateee-theme", appState.theme)
    }
  }, [appState.theme])

  useEffect(() => {
    document.documentElement.classList.remove("dark", "light")
    document.documentElement.classList.add(theme)
    localStorage.setItem("gateee-theme", theme)
  }, [theme])

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark"
    setTheme(next)
    storeToggleTheme()
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
