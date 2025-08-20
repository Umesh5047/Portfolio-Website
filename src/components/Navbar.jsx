import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import { Brightness4, Brightness7, Logout } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useThemeMode } from '../context/ThemeContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { mode, toggle } = useThemeMode()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <AppBar position="sticky" color="transparent" elevation={0}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none' }}>
          {user ? `Welcome, ${user.username}` : 'My Portfolio'}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
            <IconButton onClick={toggle}>
              {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
            </IconButton>
          </Tooltip>

          {user ? (
            <Tooltip title="Logout">
              <IconButton onClick={handleLogout}>
                <Logout />
              </IconButton>
            </Tooltip>
          ) : (
            <>
              <Button component={Link} to="/login">Login</Button>
              <Button variant="contained" component={Link} to="/signup">Sign Up</Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  )
}
