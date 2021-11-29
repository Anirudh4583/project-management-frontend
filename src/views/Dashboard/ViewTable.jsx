import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import StudentTable from '../../components/Table/StudentTable'
import FacultyTable from '../../components/Table/FacultyTable'
import {
  getToken,
  getRole,
  getUserEmail,
} from '../../services/LocalStorageService/LocalStorageService'
// import { data } from './StudentDash'

function ViewTable() {
  const [data, setData] = useState({})
  const { formId } = useParams()
  const [showTable, setShowTable] = useState(true)
  let temp = 0
  const [facultyName, setFacultyName] = useState('')
  const checkAccepted = (arr) => {
    let a = 0
    if (arr.length === 0) a = 0
    else {
      arr.forEach((element) => {
        if (element.includes(getUserEmail())) a = 1
      })
    }
    return a === 1
  }
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
        // if(getRole() === '2'){
        //     res.data.forEach(element => {
        //       element.accepted?.forEach(item => {
        //         item.includes(getUserEmail()) ? showTable=false : console.log('not ')
        //       }
        //       )
        //     });

        // }
        setData(res.data)
      })
      .catch((error) => {
        console.error(error.response)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (getRole() === '2' && data.length !== 0) {
      for (let i = 0; i < data?.length; i++) {
        if (checkAccepted(data[i].accepted)) {
          setShowTable(false)
          setFacultyName(data[i].name?.split('"')[1])
          break
        }
      }
    }
  }, [data])

  return (
    <div className="card">
      <div className="card-header text-left bg-light fw-bold form-control-lg">
        <h4>Project Ideas Status</h4>
      </div>

      <div className="card-body">
        {showTable ? (
          data.length > 0 ? (
            getRole() === '2' ? (
              <StudentTable rows={data} form={formId} />
            ) : (
              <FacultyTable rows={data} form={formId} />
            )
          ) : (
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )
        ) : (
          <div className="d-flex justify-content-center">
            Your Application is accepted by the {facultyName} .
          </div>
        )}
        {}
      </div>
    </div>
  )
}

export default ViewTable
