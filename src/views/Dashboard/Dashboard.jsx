import React from 'react'
import {
  getRole,
  // removeSession,
} from '../../services/LocalStorageService/LocalStorageService'
import { AdminDash, FacultyDash, StudentDash } from '../viewIndex'

function Dashboard() {
  // const history = useHistory()
  const userRole = Number(getRole())

  // console.log(params)

  return (
    <div className="dashboard">
      {userRole === 0 && <AdminDash />}
      {userRole === 1 && <FacultyDash />}
      {userRole === 2 && <StudentDash />}
    </div>
  )
}

export default Dashboard
