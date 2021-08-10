import React from 'react'
import  { useEffect } from 'react';

import { getRole,removeSession } from '../../../services/LocalStorageService/LocalStorageService'
import { useHistory } from 'react-router-dom'
function Faculty() {
  const history = useHistory();
  useEffect(() => {
    let checkAuth = ((getRole())==1);
    if(!checkAuth){ 
      removeSession()
      history.push('/login')
    }
  }, [])
  
  return (
    <div>
      <h1>Hi Faculty</h1>
    </div>
  )
}

export default Faculty
