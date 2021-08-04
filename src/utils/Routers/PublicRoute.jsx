import React from 'react'
import { Route, Redirect, NavLink } from 'react-router-dom'
import { getToken } from '@services/LocalStorageService'

function PublicRoute({ component: Component, ...rest }) {
  return (
    <div className="pr__app">
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
            <Redirect to={{ pathname: '/dashboard' }} />
          )
        }
      />
    </div>
  )
}

export default PublicRoute
