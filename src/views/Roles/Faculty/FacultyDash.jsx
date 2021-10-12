import React from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AnnouncementPanel } from '../../../components/compIndex'

// import MenuIcon from '@mui/icons-material/Menu';
import {
  getRole,
  removeSession,
} from '../../../services/LocalStorageService/LocalStorageService'

function FacultyDash() {
  const history = useHistory()
  useEffect(() => {
    let checkAuth = getRole() === '1'
    if (!checkAuth) {
      removeSession()
      history.push('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <h1> Announcement </h1>
      <AnnouncementPanel />
    </div>
  )
}

export default FacultyDash
