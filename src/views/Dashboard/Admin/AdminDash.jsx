import React from 'react'
import  { useEffect } from 'react';
import FormMaker from '../../../components/FormMaker'
import { getRole,removeSession } from '../../../services/LocalStorageService/LocalStorageService'
import { useHistory } from 'react-router-dom'
function AdminDash() {
  const history = useHistory();
  useEffect(() => {
    let checkAuth = ((getRole())==0);
    if(!checkAuth){ 
      removeSession()
      history.push('/login')
    }
  }, [])
  
  return (
    <div className="AdminDash__app">
      <h1>Hi Admin</h1>
      <FormMaker />
    </div>
  )
}

export default AdminDash
