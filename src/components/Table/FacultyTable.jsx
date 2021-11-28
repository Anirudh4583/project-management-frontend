import React,{  useEffect,useState } from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Button } from '@mui/material'
// import { Link } from 'react-router-dom'
import { getToken, getUserEmail } from '../../services/LocalStorageService/LocalStorageService'
import axios from 'axios'


function Row({ row ,form , id ,applicants,data}) {
  const [open, setOpen] = useState(false)
  const handleAccept = (email) => {
      console.log("in Accept");
    axios.post(`https://design-project-backend.herokuapp.com/api/user/accept/`, {
        formId: form,
        idea:row,
        email:email
  }, {
        headers: {
            accesstoken: getToken(),
            },
        })
    .then(res => {
        console.log(res)
        window.location.reload()
    })
    .catch(err => {
        console.error(err)
    })

  }

  const handleReject = (email) => {
    console.log("in Reject");
      axios.post(`https://design-project-backend.herokuapp.com/api/user/reject/`, {
            formId: form,
            idea:row,
            email:email
        }, {
            headers: {
                accesstoken: getToken(),
                },
            })
        .then(res => {
            console.log(res)
            window.location.reload()
        }
        )
        .catch(err => {
            console.error(err)
        }
        )
  }
  const [AcceptedEmail, setAcceptedEmail] = useState("Raghu")
  useEffect(() => {
      data.applied?.forEach((item) => {
            if(item?.split(':')[0] === row){
                setAcceptedEmail(item?.split(':')[1])
            }
        })
    }, [data])
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {id}
        </TableCell>
        <TableCell align="center">
          {row}
        </TableCell>
        <TableCell align="center">{applicants.filter(item => item.idea===row).length}</TableCell>
        
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
           
           
            
            {data.available[id] === '0'   
            ?( 
                <Box>
                <Typography variant="h6" gutterBottom  align={'center'} className={"mt-2"}> You have already accepted the Application of <b>{AcceptedEmail}</b> for  <b>{row}</b>.</Typography>
                </Box> )
            : ( 
                <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div" align={'center'} >
                 Applications
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {/* <TableCell align="center" className="fw-bold">
                      S.No
                    </TableCell> */}
                    <TableCell align="center" className="fw-bold">
                      Students
                    </TableCell>
                    <TableCell align="center" className="fw-bold">
                      Accept
                    </TableCell>
                    <TableCell align="center" className="fw-bold">
                      Reject
                    </TableCell>
                    <TableCell align="center" className="fw-bold">
                      Accepted Group
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {applicants.filter( item => item.idea === row )?.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell align="center">{item.email}</TableCell>
                      <TableCell align="center">
                      {console.log(data.available[id])}
                      {data.available[id] === '1' ? (
                      <Button variant="outlined" color="success" onClick={()=>handleAccept(item.email)}>
                            Accept 
                          </Button>
                      )
                      :
                      (<Button style={{cursor:"not-allowed"}}> Already Accepted </Button>)
                      }
                      </TableCell>
                      <TableCell align="center">
                      <Button variant="outlined" color='error' onClick={()=>handleReject(item.email)}>
                            Reject 
                          </Button>
                      </TableCell>
                      <TableCell align="center">
                            NA 
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </Box>)}
          </Collapse>
        </TableCell>
      </TableRow>
            
    </React.Fragment>
  )
}


function FacultyTable({ rows,form }) {
    const [data, setData] = useState([])
    const getData = () => {
        axios.get(`https://design-project-backend.herokuapp.com/api/user/applicants/${form}`, {
            headers: {
                accesstoken: getToken(),
            }
        }
        )
        .then(res => {
            console.log(res.data)
            setData(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }
    useEffect(() => {
        getData()
    }, [])
    useEffect(() => {
        console.log(data)
    }, [data])
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="center" className="fw-bold">
              S.No.
            </TableCell>
            <TableCell align="center" className="fw-bold">
              Project Idea
            </TableCell>
            <TableCell align="center" className="fw-bold">
              Groups Applied
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {data && data?.data?.idea?.map((row, index) => <Row form={form} key={index} row={row} id={index} applicants={data.applicants} data={data.data}/>)}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default FacultyTable
