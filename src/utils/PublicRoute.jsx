import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { getToken } from '../services/Common';

function PublicRoute({ component: Component, ...rest }) {
  return (
    <div>
      <div className="header" style={{ backgroundColor: '#0a0a0a' }}>
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
        <NavLink activeClassName="active" to="/login">
          Login
        </NavLink>
        {/* <NavLink activeClassName="active" to="/register">Register</NavLink> */}
      </div>
      <Route
        {...rest}
        render={(props) =>
          !getToken() ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: '/home' }} />
          )
        }
      />
    </div>
  );
}

export default PublicRoute;
