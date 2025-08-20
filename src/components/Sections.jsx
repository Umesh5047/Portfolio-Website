import React, { useReducer, useState } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import Chip from '@mui/material/Chip'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Avatar from '@mui/material/Avatar'

const skills = ['React','JavaScript','TypeScript','HTML','CSS','Node.js','MongoDB']

const projects = [
  { title: 'Project One', description: 'Demo project.', image: 'https://picsum.photos/seed/p1/600/400', repo: '#', demo: '#' },
  { title: 'Project Two', description: 'Another project.', image: 'https://picsum.photos/seed/p2/600/400', repo: '#', demo: '#' }
]

function formReducer(state, action) {
  switch (action.type) {
    case 'SET': return { ...state, [action.field]: action.value }
    case 'RESET': return { name: '', email: '', message: '' }
    default: return state
  }
}

export function IntroSection() {
  return (
    <Container sx={{ py: 8 }} id="intro">
      <Grid container spacing={4} alignItems="center">
        <Grid size={{ xs: 12, md: 4 }}>
          <Avatar src="https://picsum.photos/seed/me/400/400" sx={{ width: 200, height: 200, mx: 'auto' }} />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography variant="h3">John Doe</Typography>
          <Typography variant="h6">Frontend Developer</Typography>
          <Typography paragraph>
            I build modern, responsive web apps with React and Material UI.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button variant="contained" component={Link} href="/resume.pdf">Resume</Button>
            <Button component={Link} href="https://github.com">GitHub</Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export function SkillsSection() {
  return (
    <Container sx={{ py: 8 }} id="skills">
      <Typography variant="h4" gutterBottom>Skills</Typography>
      <Box sx={{ display: 'flex', gap: 1.2, flexWrap: 'wrap' }}>
        {skills.map((s) => <Chip key={s} label={s} />)}
      </Box>
    </Container>
  )
}

export function ProjectsSection() {
  return (
    <Container sx={{ py: 8 }} id="projects">
      <Typography variant="h4" gutterBottom>Projects</Typography>
      <Grid container spacing={3}>
        {projects.map((p) => (
          <Grid key={p.title} size={{ xs: 12, sm: 6 }}>
            <Card>
              <img src={p.image} alt={p.title} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
              <CardContent>
                <Typography variant="h6">{p.title}</Typography>
                <Typography variant="body2">{p.description}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" href={p.demo}>Demo</Button>
                <Button size="small" href={p.repo}>Repo</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export function ContactSection() {
  const [state, dispatch] = useReducer(formReducer, { name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)

  const onChange = (e) => dispatch({ type: 'SET', field: e.target.name, value: e.target.value })
  const onSubmit = (e) => {
    e.preventDefault()
    if (!state.name || !state.email || !state.message) {
      setStatus({ type: 'error', message: 'All fields required.' })
      return
    }
    setStatus({ type: 'success', message: 'Message sent!' })
    dispatch({ type: 'RESET' })
  }

  return (
    <Container sx={{ py: 8 }} id="contact">
      <Typography variant="h4">Contact</Typography>
      <Box component="form" onSubmit={onSubmit} sx={{ display: 'grid', gap: 2, maxWidth: 600 }}>
        <TextField name="name" label="Name" value={state.name} onChange={onChange} />
        <TextField name="email" label="Email" value={state.email} onChange={onChange} />
        <TextField name="message" label="Message" value={state.message} onChange={onChange} multiline rows={4} />
        <Button type="submit" variant="contained">Send</Button>
        {status && <Typography color={status.type === 'error' ? 'error' : 'primary'}>{status.message}</Typography>}
      </Box>
    </Container>
  )
}
