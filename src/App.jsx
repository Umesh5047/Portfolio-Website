import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import Portfolio from './pages/Portfolio'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import { ThemeModeProvider } from './context/ThemeContext'

export default function App() {
  return (
    <ThemeModeProvider>
      <CssBaseline />
      <AuthProvider>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Portfolio />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </ThemeModeProvider>
  )
}
