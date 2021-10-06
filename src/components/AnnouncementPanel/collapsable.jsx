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

function Collapsable(props) {
    const [open, setOpen] = React.useState(false)

    const handleClick = () => {
        setOpen(!open)
    }
    return (
        <div>
        <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary={props.thread.thread_name} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                {
                    props.thread.linked_announcements.map((a) => (
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <DraftsIcon />
                            </ListItemIcon>
                            <ListItemText primary={a}/>
                        </ListItemButton>
                    ))
                }
              
            </List>
          </Collapse>
        </div>
    )
}

export default Collapsable
