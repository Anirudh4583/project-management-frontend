import React from 'react'
import { Route, Redirect, NavLink } from 'react-router-dom'
import {
  getRole,
  getToken,
} from '../../services/LocalStorageService/LocalStorageService'

function PublicRoute({ component: Component, ...rest }) {
  const userRole = getRole()
  return (
    <div className="pubr__app">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a className="navbar-brand" href="/">
          Portal
        </a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink exact activeClassName="active" to="/" className="nav-link">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeClassName="active" to="/login" className="nav-link">
              Login
            </NavLink>
          </li>
        </ul>
      </nav>

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
