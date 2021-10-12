import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Link, useHistory } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
// import MenuIcon from '@mui/icons-material/Menu';
import {
  // getRole,
  removeSession,
} from '../../services/LocalStorageService/LocalStorageService'
import { getToken } from '../../services/LocalStorageService/LocalStorageService'

function PrivateRoute({ component: Component, ...rest }) {
  const history = useHistory()
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: '#455a64' }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              {/* <MenuIcon /> */}
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Admin
            </Typography>

            <Button color="inherit">
              <Link
                to="/create-announcement"
                className="text-decoration-none text-white"
              >
                Create Ann
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
      <Route {...rest}>
        {getToken() ? <Component /> : <Redirect to={{ pathname: '/login' }} />}
      </Route>
    </>
  )
}

export default PrivateRoute
