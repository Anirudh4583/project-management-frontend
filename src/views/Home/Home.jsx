import React from 'react'
import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import DraftsIcon from '@mui/icons-material/Drafts'
import SendIcon from '@mui/icons-material/Send'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Collapsable from '../../components/AnnouncementPanel/collapsable'
function Home() {
  const [open, setOpen] = React.useState(true)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <div className="">
      <h1>Home</h1>
      <div className="d-flex justify-content-center align-items-center">
        <List
          className="border-2 border-dark border"
          sx={{ width: '100%', maxWidth: 360 }}
          component="nav"
          aria-labelledby="Announcement-Panel"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Announcement Panel
            </ListSubheader>
          }
        >
          <ListItemButton>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Thread-1" secondary="Description" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Thread-2" secondary="Description" />
          </ListItemButton>
          
        </List>
      </div>
    </div>
  )
}

export default Home
