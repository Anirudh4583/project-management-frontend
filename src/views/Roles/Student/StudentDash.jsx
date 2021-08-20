import React from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  getRole,
  removeSession,
} from '../../../services/LocalStorageService/LocalStorageService'

function StudentDash() {
  const history = useHistory()
  useEffect(() => {
    let checkAuth = getRole() == 2
    if (!checkAuth) {
      removeSession()
      history.push('/login')
    }
  }, [])
  return (
    <div>
      <h1>Hi Student</h1>
    </div>
  )
}

export default StudentDash
