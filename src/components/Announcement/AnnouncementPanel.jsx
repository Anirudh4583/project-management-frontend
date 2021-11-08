import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CircularProgress, Grid } from '@mui/material'
import { getToken } from '../../services/LocalStorageService/LocalStorageService'
import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import Collapsable from './collapsable'

function AnnouncementPanel() {
  const [threads, setThreads] = useState([])
  const [isDataFetched, setDataFetched] = useState(false)
  const [threadsAndAnnouncements, setThreadsAndAnnouncements] = useState([])

  useEffect(() => {
    axios
      .get('https://design-project-backend.herokuapp.com/api/thread/', {
        headers: {
          accesstoken: getToken(),
        },
      })
      .then((res) => {
        console.log('get threads 🚀', res)
        setThreadsAndAnnouncements(res.data)
        setDataFetched(true)
      })
      .catch((error) => {
        console.error(error.response)
      })
  }, [])

  useEffect(() => {
    let temp = []

    threadsAndAnnouncements.map((ann) => {
      if (!temp.includes(ann.thread_id)) {
        setThreads((old) => [...old, ann])
        temp.push(ann.thread_id)
      }

      return {}
    })

    temp = []
  }, [threadsAndAnnouncements])

  return (
    <div className="mx-auto mt-5 container text-center">
      <h1>Threads panel</h1>
      <div
        className="mx-auto mt-3 mx-2"
        style={{ width: '800px', justifyContent: 'center' }}
      >
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
        ) : (
          <List
            className="border-2 border-dark border m-auto "
            sx={{ width: '100%', maxWidth: 540 }}
            component="nav"
            aria-labelledby="Active Threads"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Active Threads
              </ListSubheader>
            }
          >
            {threads.map((a, index) => (
              <Collapsable
                key={index}
                name={a.thread_name}
                id={a.thread_id}
                list={threadsAndAnnouncements}
              />
            ))}
          </List>
        )}
      </div>
    </div>
  )
}

export default AnnouncementPanel
