import React from 'react'
import { Route, Redirect, useHistory } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import {
  getRole,
  getToken,
} from '../../services/LocalStorageService/LocalStorageService'

function PublicRoute({ component: Component, ...rest }) {
  const history = useHistory()
  const userRole = getRole()
  return (
    <div className="pubr__app z-50">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: '#36AAC8' }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              {/* <MenuIcon /> */}
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, cursor: 'pointer' }}
              onClick={() => history.push('/')}
              className="fw-bold fs-4"
            >
              Project Manager
            </Typography>

            <Button
              color="inherit"
              variant="outlined"
              onClick={() => history.push('/login')}
            >
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Route
        {...rest}
        render={(props) =>
          !getToken() ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: `/${userRole}/dashboard` }} />
          )
        }
      />
    </div>
  )
}

export default PublicRoute
