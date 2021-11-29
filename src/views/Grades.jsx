import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import axios from 'axios'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { getToken } from '../services/LocalStorageService/LocalStorageService'
import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

function EditGrade({ setGrade: finalGrade }) {
  const [grade, setGrade] = useState('')
  const [open, setOpen] = useState(false)

  return (
    <>
      <IconButton
        color="primary"
        component="span"
        onClick={() => setOpen(true)}
      >
        <EditIcon />
      </IconButton>

      <Dialog onClose={() => setOpen(false)} open={open}>
        <DialogTitle>Enter New Grade</DialogTitle>
        <DialogContent>
          <TextField
            id="grade-input"
            label="grade"
            variant="standard"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            autoFocus
          />
        </DialogContent>
        <Button
          disabled={!grade}
          variant="contained"
          onClick={() => {
            finalGrade((g) => [grade, ...g])
            setOpen(false)
          }}
        >
          Save
        </Button>
      </Dialog>
    </>
  )
}

export default function Grades() {
  const [data, setData] = useState()
  const [grade, setGrade] = useState(['A', 'D', 'C'])
  console.log(data)

  useEffect(() => {
    axios
      .post(
        'https://design-project-backend.herokuapp.com/api/getTable/',
        { formId: '91' },
        {
          headers: {
            accesstoken: getToken(),
          },
        },
      )
      .then((res) => {
        console.log('get grades 🚀', res.data)
        setData(res.data[0]) // taking only one faculty for now
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
        {data && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" className="fw-bold">
                    S.No
                  </TableCell>
                  <TableCell align="center" className="fw-bold">
                    Project Idea
                  </TableCell>
                  <TableCell align="center" className="fw-bold">
                    Group
                  </TableCell>
                  <TableCell align="center" className="fw-bold">
                    Grade
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.accepted.map((row, id) => (
                  <TableRow key={id}>
                    <TableCell component="th" scope="row" align="center">
                      {id + 1}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      {row.split(':')[0]}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      {row.split(':')[1]}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {grade[id]}
                      <EditGrade setGrade={setGrade} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  )
}
