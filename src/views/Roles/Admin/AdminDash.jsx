import React from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

// import MenuIcon from '@mui/icons-material/Menu';
import {
  getRole,
  removeSession,
} from '../../../services/LocalStorageService/LocalStorageService'
import { AnnouncementPanel } from '../../../components/compIndex'

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
      {/* <h2>create form</h2>
      <CreateForm /> */}

      <AnnouncementPanel />
    </div>
  )
}

export default AdminDash
