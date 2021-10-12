import React from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

// import MenuIcon from '@mui/icons-material/Menu';
import {
  getRole,
  removeSession,
} from '../../../services/LocalStorageService/LocalStorageService'
import { AnnouncementPanel } from '../../../components/compIndex'

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
      {/* <h2>create form</h2>
      <CreateForm /> */}

      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style = {{ backgroundColor:"#37474f"}}>
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
      <AnnouncementPanel />
    </div>
  )
}

export default AdminDash
