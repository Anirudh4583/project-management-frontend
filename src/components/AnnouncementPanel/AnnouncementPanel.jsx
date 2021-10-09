import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CircularProgress, Grid} from '@mui/material';
import { getToken } from '../../services/LocalStorageService/LocalStorageService'
import { getRole } from '../../services/LocalStorageService/LocalStorageService'
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Collapsable from './collapsable';

const role = getRole()

function AnnouncementPanel() {
  const [announcements, setAnnouncements] = useState([])
  const [threads, setThreads] = useState([])
  const [isDataFetched, setDataFetched] = useState(false)
  useEffect(() => {
    axios
      .get('http://localhost:3001/api/announcement/', 
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

      axios
        .get('http://localhost:3001/api/thread/')
        .then( (res)=> {
          console.log('get thread 🚀', res)
          setThreads(res.data.data);
        })
        .catch( (error)=> {
          console.error(error.response)
        })
  }, [])
  // console.log(announcements)
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div className="mx-auto mt-5 container text-center">

        <h1>Threads panel</h1>
        <div className="mx-auto mt-3  mx-2" style={{ width: '800px', justifyContent: 'center' }}>
          
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
            {threads.map( (a) => (
                <Collapsable thread={a} />
            ))}
          </List>
            )}
           

        </div>
      </div>
    
  )
}

export default AnnouncementPanel
