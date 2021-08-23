import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function FillForm() {
  const [forms, setForms] = useState({})
  const { formId } = useParams()
  //   console.log('form id', formId)
  useEffect(() => {
    // axios
    //   .post('http://localhost:3001/api/form/', {
    //     formId,
    //   })
    //   .then((res) => {
    //     console.log('get forms 🚀', res)
    //     setForms(res.data)
    //   })
    //   .catch((error) => {
    //     console.error(error.response)
    //   })
  }, [])
  console.log(forms)
  return (
    <div>
      <h1>hello this is form no. {formId}</h1>
    </div>
  )
}

export default FillForm
