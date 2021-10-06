import React, {useEffect,useState} from 'react'
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
import { getToken } from '../../services/LocalStorageService/LocalStorageService'
import axios from 'axios'
function Collapsable(props) {
    const [open, setOpen] = React.useState(false)

    const handleClick = () => {
        setOpen(!open)
    }
    const [announcements, setannouncements] = useState([]);
    useEffect(() => {
        axios
            .post('http://localhost:3001/api/thread/linkedAnnouncements',{
                threadID : props.thread.thread_id
            }
            )
            .then( (res)=>{
                
                setannouncements(res.data)
            })
            .catch( (error) => {
                console.error(error)
            })
    }, [])
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
                
                    {console.log(announcements)}
                    {
                    announcements.map((a) => (
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <DraftsIcon />
                            </ListItemIcon>
                            <ListItemText primary={a.announcement_name}/>
                        </ListItemButton>
                    ))
                }
              
            </List>
          </Collapse>
        </div>
    )
}

export default Collapsable
