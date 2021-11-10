import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import {
  getRole,
  removeSession,
} from '../../services/LocalStorageService/LocalStorageService'
import { AnnouncementPanel } from '../../components/Announcement'

function AdminDash() {
  const history = useHistory()

  useEffect(() => {
    let checkAuth = getRole() === '0'
    if (!checkAuth) {
      removeSession()
      history.push('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="AdminDash__app">
      <AnnouncementPanel />
    </div>
  )
}

export default AdminDash
