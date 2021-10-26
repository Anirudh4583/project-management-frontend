import {useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import React, {useEffect} from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DraftsIcon from '@mui/icons-material/Drafts'
import { useHistory } from 'react-router';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AnnModal(props) {
 const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleFillForm = () => {
      let url = "/form/"+ props.Announcement.form_id+"/"
    history.push(url);
  }
  return (
    <div>
    <ListItemButton onClick={handleOpen} sx={{ pl: 4 }} >
                            <ListItemIcon>
                                <DraftsIcon />
                            </ListItemIcon>
                            <ListItemText primary={props.Announcement.announcement_name}/>
                        </ListItemButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box className="card" sx={style}>
            <Typography className="card-header" id="transition-modal-title" variant="h6" component="h2">
              {props.Announcement.announcement_name}
            </Typography>
            <Typography className="card-body" id="transition-modal-description" sx={{ mt: 2 }}>
            {props.Announcement.announcement_data}
            </Typography>
            {props.Announcement.form_id && <Button onClick={handleFillForm}>
                Fill Form
            </Button> }
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
