import React, { createContext, useContext, useMemo, useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const ThemeModeContext = createContext(null)

export function ThemeModeProvider({ children }) {
  const [mode, setMode] = useState('light')
  const toggle = () => setMode(m => (m === 'light' ? 'dark' : 'light'))

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: { main: mode === 'light' ? '#0ea5e9' : '#7dd3fc' },
      secondary: { main: mode === 'light' ? '#9333ea' : '#c4b5fd' }
    },
    shape: { borderRadius: 16 }
  }), [mode])

  const value = useMemo(() => ({ mode, toggle }), [mode])

  return (
    <ThemeModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  )
}

export function useThemeMode() {
  const ctx = useContext(ThemeModeContext)
  if (!ctx) throw new Error('useThemeMode must be used within ThemeModeProvider')
  return ctx
}
