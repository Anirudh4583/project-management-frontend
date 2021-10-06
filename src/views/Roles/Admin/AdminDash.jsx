import React from 'react'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import {
  getRole,
  removeSession,
} from '../../../services/LocalStorageService/LocalStorageService'
import {
  AnnouncementPanel,
  CreateAnnouncement,
} from '../../../components/compIndex'

function AdminDash() {
  const [click,setClick] = useState(false)
  const history = useHistory()
  useEffect(() => {
    let checkAuth = getRole() == 0
    if (!checkAuth) {
      removeSession()
      history.push('/login')
    }
  }, [])

  return (
    <div className="AdminDash__app">
      {/* <h2>create form</h2>
      <CreateForm /> */}

      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
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
          <Button color="inherit" sx={{ flexGrow: 0.05 }} onClick={() => {
                  setClick(true)
                }}>Create Announcement</Button>
          <Button color="inherit" onClick={() => {
                  removeSession()
                  history.push('/login')
                }}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
   
      <h1>announcement panel</h1>
      <AnnouncementPanel />

      {click && 
      <div>
      <h1>Create announcement</h1>
      <Button color="error" onClick={() => {
                  setClick(false)
                }}>close</Button>
           <CreateAnnouncement />
          
      </div>

      }
      
    </div>
  )
}

export default AdminDash
