import React from 'react'
import { useHistory } from 'react-router-dom'
import {
  getRole,
  removeSession,
} from '../../services/LocalStorageService/LocalStorageService'
import { AdminDash, FacultyDash, StudentDash } from '../viewIndex'

function Dashboard() {
  const history = useHistory()
  const userRole = Number(getRole())

  // console.log(params)

  return (
    <div className="dashboard">
      <div className="dash-nav">
        <nav className="navbar navbar-expand navbar-dark bg-dark d-flex justify-content-between">
          <div className="navbar-brand mx-2" href="/">
            Dashboard
          </div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <button
                className="btn btn-danger mx-4"
                onClick={() => {
                  removeSession()
                  history.push('/login')
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {userRole === 0 && <AdminDash />}
      {userRole === 1 && <FacultyDash />}
      {userRole === 2 && <StudentDash />}
    </div>
  )
}

export default Dashboard
