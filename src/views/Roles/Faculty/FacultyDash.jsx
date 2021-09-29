import React from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AnnouncementPanel } from '../../../components/compIndex'

import {
  getRole,
  removeSession,
} from '../../../services/LocalStorageService/LocalStorageService'

function FacultyDash() {
  const history = useHistory()
  useEffect(() => {
    let checkAuth = getRole() == 1
    if (!checkAuth) {
      removeSession()
      history.push('/login')
    }
  }, [])

  return (
    <div>
      
      
      <h1> Announcement </h1>
      <AnnouncementPanel />
    </div>
  )
}

export default FacultyDash
