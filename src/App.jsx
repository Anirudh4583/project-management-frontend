import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { Home, Login } from '@components/compIndex'
import './App.css'
import PublicRoute from '@utils/Routers/PublicRoute'
import PrivateRoute from '@utils/Routers/PrivateRoute'
import 'bootstrap/dist/css/bootstrap.min.css'
import Dashboard from './components/Login/Dashboard/Dashboard'

function App() {
  return (
    <div className="App">
      <Router>
        <div className="content">
          <Switch>
            <PublicRoute exact path="/" component={Home} />
            <PublicRoute path="/login" component={Login} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App
