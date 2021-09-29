import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CircularProgress, Grid} from '@mui/material';
import { getToken } from '../../services/LocalStorageService/LocalStorageService'
import { getRole } from '../../services/LocalStorageService/LocalStorageService'

const role = getRole()

function AnnouncementPanel() {
  const [announcements, setAnnouncements] = useState([])
  const [isDataFetched, setDataFetched] = useState(false)
  useEffect(() => {
    axios
      .post('http://localhost:3001/api/announcement/', 
        {role: role},
        {
          headers: {
            accesstoken: getToken(),
          }
        },
      )
      .then((res) => {
        console.log('get anns 🚀', res)
        setDataFetched(true)
        setAnnouncements(res.data)
      })
      .catch((error) => {
        console.error(error.response)
      })
  }, [])
  // console.log(announcements)

  return (
    <div className="mx-auto mt-5 container text-center">
      
      <h1>Announcement panel</h1>
      <div className="mx-auto mt-3 card mx-2" style={{ width: '800px', justifyContent:'center' }}>
        <div className="mx-auto card-header" style={{justifyContent: 'center', alignContent:'center'}}>Announcements</div>
        {/* <div className="card-body"> */}
        <ul className="list-group list-group-flush"></ul>
        {!isDataFetched ? (
                        <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '15vh' }}
              >

                <Grid item xs={3}>
                <CircularProgress />
                </Grid>   

              </Grid> 
          
          ) :
          (
            announcements.map((a) => (
            <li key={a.announcement_name} className="list-group-item">
              <h5 className="card-title">{a.announcement_name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{a.deadline}</h6>
              <p className="card-text d-flex justify-content-between">
                {a.announcement_data}
                {a.form_id && (
                  <Link to={`/form/${a.form_id}`} className="card-link">
                    Fill up form
                  </Link>
                )}
              </p>
            </li>
          ))
          )}
         
       
        </div>
      </div>
    
  )
}

export default AnnouncementPanel
