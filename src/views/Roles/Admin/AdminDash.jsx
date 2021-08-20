import React from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  getRole,
  removeSession,
} from '../../../services/LocalStorageService/LocalStorageService'
import {
  AnnouncementPanel,
  CreateAnnouncement,
  CreateForm,
} from '../../../components/compIndex'

function AdminDash() {
  const history = useHistory()
  useEffect(() => {
    let checkAuth = getRole() == 0
    if (!checkAuth) {
      removeSession()
      history.push('/login')
    }
  }, [])

  return (
    <div className="AdminDash__app">
      {/* <h2>create form</h2>
      <CreateForm /> */}

      {/* <h1>announcement panel</h1>
      <AnnouncementPanel /> */}

      <h1>announcement create</h1>
      <CreateAnnouncement />
    </div>
  )
}

export default AdminDash
