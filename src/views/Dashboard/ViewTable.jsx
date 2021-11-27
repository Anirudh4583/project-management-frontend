import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import CollapsibleTable from '../../components/Table'
import { getToken } from '../../services/LocalStorageService/LocalStorageService'
// import { data } from './StudentDash'

function ViewTable() {
  const [data, setData] = useState({})
  const { formId } = useParams()

  useEffect(() => {
    axios
      .post(
        'https://design-project-backend.herokuapp.com/api/getTable/',
        { formId },
        {
          headers: {
            accesstoken: getToken(),
          },
        },
      )
      .then((res) => {
        console.log('get form 🚀', res.data)
        setData(res.data)
      })
      .catch((error) => {
        console.error(error.response)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="card">
      <div className="card-header text-left bg-light fw-bold form-control-lg">
        <h4>Project Ideas Status</h4>
      </div>
      <div className="card-body">
        {data.length > 0 ? (
          <CollapsibleTable rows={data} />
        ) : (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewTable
