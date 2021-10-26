import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Home, Login, Dashboard } from './views/viewIndex'
import PublicRoute from './utils/Routers/PublicRoute'
import PrivateRoute from './utils/Routers/PrivateRoute'
import { CreateAnnouncement, FillForm } from './components/compIndex'

function App() {
  return (
    <div className="App">
      <Router>
        <div className="content">
          <Switch>

            <PublicRoute exact path="/" component={Home} />
            <PublicRoute path="/login" component={Login} />
            <PrivateRoute path="/:role/dashboard" component={Dashboard} />
            
            <PrivateRoute path="/form/:formId" component={FillForm} />
            <PrivateRoute
              path="/create-announcement"
              component={CreateAnnouncement}
            />
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App
