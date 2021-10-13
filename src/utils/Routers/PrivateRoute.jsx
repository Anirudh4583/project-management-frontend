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
      
      <Route {...rest}>
        {getToken() ? <Component /> : <Redirect to={{ pathname: '/login' }} />}
      </Route>
    </>
  )
}

export default PrivateRoute
