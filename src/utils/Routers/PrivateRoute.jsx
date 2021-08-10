import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { getToken } from '../../services/LocalStorageService/LocalStorageService'

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route {...rest}>
      {getToken() ? <Component /> : <Redirect to={{ pathname: '/login' }} />}
    </Route>
  )
}

export default PrivateRoute
