"use client"

import { useEffect, useState } from "react"

export function ThemeSwitcher() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [dark])

  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-muted p-1">
      <button
        onClick={() => setDark(false)}
        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
          !dark
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        ☀️ Light
      </button>
      <button
        onClick={() => setDark(true)}
        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
          dark
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        🌙 Dark
      </button>
    </div>
  )
}
