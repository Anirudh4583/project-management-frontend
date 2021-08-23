import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function AnnouncementPanel() {
  const [announcements, setAnnouncements] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:3001/api/announcement/')
      .then((res) => {
        console.log('get anns 🚀', res)
        setAnnouncements(res.data)
      })
      .catch((error) => {
        console.error(error.response)
      })
  }, [])
  console.log(announcements)

  return (
    <div className="row ">
      {announcements.map((a) => (
        <div
          key={a.announcement_id}
          className="card mx-2"
          style={{ width: '18rem' }}
        >
          <div className="card-body">
            <h5 className="card-title">{a.announcement_name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{a.deadline}</h6>
            <p className="card-text">{a.announcement_data}</p>

            {a.form_id && (
              <Link to={`/form/${a.form_id}`} className="card-link">
                Fill up form
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnnouncementPanel
