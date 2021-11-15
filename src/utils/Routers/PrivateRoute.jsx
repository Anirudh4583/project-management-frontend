import React from 'react'
import { Route, Redirect, Link, useHistory } from 'react-router-dom'
import {
  getRole,
  getToken,
  removeSession,
} from '../../services/LocalStorageService/LocalStorageService'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Divider, ListItemIcon, Menu, MenuItem } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'

function PrivateRoute({ component: Component, ...rest }) {
  const history = useHistory()
  const userRole = getRole()

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: '#36AAC8' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Project Management
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {(() => {
                switch (userRole) {
                  case '0':
                    return <span>Admin</span>
                  case '1':
                    return <span>Faculty</span>
                  case '2':
                    return <span>Student</span>
                  default:
                    return <span />
                }
              })()}
            </Typography>

            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <Link to="/" className="text-decoration-none text-black">
                <MenuItem onClick={handleClose}>Dashboard</MenuItem>
              </Link>
              {(userRole === '0' || userRole === '1') && (
                <Link
                  to="/create-announcement"
                  className="text-decoration-none text-black"
                >
                  <MenuItem onClick={handleClose}>Create Announcement</MenuItem>
                </Link>
              )}
              <Divider />
              <MenuItem
                onClick={() => {
                  handleClose()
                  removeSession()
                  history.push('/login')
                }}
              >
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
      <Route {...rest}>
        {getToken() ? <Component /> : <Redirect to={{ pathname: '/login' }} />}
      </Route>
    </>
  )
}

export default PrivateRoute
