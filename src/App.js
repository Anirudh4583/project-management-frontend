import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import PublicRoute from './utils/Routers/PublicRoute'
import PrivateRoute from './utils/Routers/PrivateRoute'
import { Dashboard, Home, Login } from './views'
import { FillForm } from './components/Form'
import { CreateAnnouncement } from './components/Announcement'
import ViewTable from './views/Dashboard/ViewTable'
import Grades from './views/Grades'

function App() {
  return (
    <div className="App">
      <Router>
        <div className="content">
          <Switch>
            <PublicRoute exact path="/" component={Home} />
            <PublicRoute path="/login" component={Login} />
            <PrivateRoute path="/:role/dashboard" component={Dashboard} />

            <PrivateRoute
              path="/create-announcement"
              component={CreateAnnouncement}
            />
            <PrivateRoute path="/form/:formId" component={FillForm} />
            <PrivateRoute path="/status/:formId" component={ViewTable} />

            <PrivateRoute path="/grades" component={Grades} />
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App
