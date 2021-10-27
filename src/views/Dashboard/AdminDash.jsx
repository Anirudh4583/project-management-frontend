import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import {
  getRole,
  removeSession,
} from '../../services/LocalStorageService/LocalStorageService'
import { AnnouncementPanel } from '../../components/Announcement'

function AdminDash() {
  const history = useHistory()

  useEffect(() => {
    let checkAuth = getRole() === '0'
    if (!checkAuth) {
      removeSession()
      history.push('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="AdminDash__app">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: '#455a64' }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              {/* <MenuIcon /> */}
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Admin
            </Typography>
            <Button color="inherit" sx={{ flexGrow: 0.05 }}>
              <Link
                to="/create-announcement"
                className="text-decoration-none text-white"
              >
                Create Announcement
              </Link>
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                removeSession()
                history.push('/login')
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <AnnouncementPanel />
    </div>
  )
}

export default AdminDash
