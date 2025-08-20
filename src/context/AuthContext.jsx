import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

const LS_USERS = 'app.users'
const LS_SESSION = 'app.session'

function loadUsers() {
  try { return JSON.parse(localStorage.getItem(LS_USERS)) || [] }
  catch { return [] }
}

function saveUsers(users) {
  localStorage.setItem(LS_USERS, JSON.stringify(users))
}

function loadSession() {
  try { return JSON.parse(localStorage.getItem(LS_SESSION)) }
  catch { return null }
}

function saveSession(session) {
  if (session) localStorage.setItem(LS_SESSION, JSON.stringify(session))
  else localStorage.removeItem(LS_SESSION)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadSession())

  useEffect(() => {
    if (!localStorage.getItem(LS_USERS)) saveUsers([])
  }, [])

  const signup = ({ username, email, password }) => {
    if (!username || !email || !password) throw new Error('All fields are required.')
    const users = loadUsers()
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase()))
      throw new Error('Email already registered.')
    const newUser = { id: crypto.randomUUID(), username, email, password }
    users.push(newUser)
    saveUsers(users)
    const sessionUser = { id: newUser.id, username, email }
    setUser(sessionUser)
    saveSession(sessionUser)
    return sessionUser
  }

  const login = ({ email, password }) => {
    const users = loadUsers()
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password)
    if (!found) throw new Error('Invalid credentials.')
    const sessionUser = { id: found.id, username: found.username, email: found.email }
    setUser(sessionUser)
    saveSession(sessionUser)
    return sessionUser
  }

  const logout = () => {
    setUser(null)
    saveSession(null)
  }

  const value = useMemo(() => ({ user, signup, login, logout }), [user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
