import React from 'react'
import { userRole } from '@components/Login/Login'
import { removeSession } from '@services/LocalStorageService'

const userType = () => {
  console.log(userRole)
  if (userRole === 0) return 'Admin'
  else if (userRole === 1) return 'Teacher'
  else return 'Student'
}

function Dashboard(props) {
  return (
    <div>
      <h1>Dashboard</h1>
      <h3>Welcome {userType()}!!</h3>

      <button
        className="btn btn-danger"
        onClick={() => {
          removeSession()
          props.history.push('/login')
        }}
      >
        Logout
      </button>
    </div>
  )
}

export default Dashboard
