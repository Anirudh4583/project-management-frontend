import React,{useEffect} from 'react'
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
import { getToken , getUserEmail} from '../../services/LocalStorageService/LocalStorageService'
import axios from 'axios'
function Row({ row ,form}) {
  const [open, setOpen] = React.useState(false)
  const handleApply =(index) => {
    console.log('apply')
    const token = getToken()
    const data = {
      formId: form,
      facultyId:row.faculty_id,
      idea : row.idea[index],
    }
    console.log(data)
    console.log(token)
    axios
     .post('https://design-project-backend.herokuapp.com/api/user/apply',data,{
       headers: {
        accesstoken: token,         
       }
      })
      .then((res) => {
        console.log('apply', res.data)
        window.location.reload()
      })
      .catch((err) => {
        console.log(err)
      })

  }

      const checkApplied = (idea) => {
            const email = getUserEmail()
            let a = 0;
            row.applied?.forEach((item) => {
              
                if(item?.split(':')[1]?.includes(email) && item?.split(':')[0] === idea){
                  console.log(item?.split(':')[1] ,email);
                   a=1;
                }
                

            })
            return a===1;
      }
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
          {row.faculty_id}
        </TableCell>
        <TableCell align="center">
          {row.name.substring(2, row.name?.length - 2)}
        </TableCell>
        <TableCell align="center">{row.idea?.length}</TableCell>
        <TableCell align="center">
          {row.available?.filter((x) => x === '1').length}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                - Projects -
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {/* <TableCell align="center" className="fw-bold">
                      S.No
                    </TableCell> */}
                    <TableCell align="center" className="fw-bold">
                      Project Idea
                    </TableCell>
                    <TableCell align="center" className="fw-bold">
                      Available
                    </TableCell>
                    <TableCell align="center" className="fw-bold">
                      Apply
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.idea?.map((idea, index) => (
                    <TableRow key={index}>
                      {/* <TableCell component="th" scope="row" align="center">
                        {row.faculty_id}
                      </TableCell> */}
                      <TableCell align="center">{idea}</TableCell>
                      <TableCell align="center">
                        {(row.available && row.available[index] === '1') ? 'YES' : 'NO'}
                      </TableCell>
                      <TableCell align="center">
                        {(row.available && row.available[index] === '1' )? (checkApplied(idea) ?
                        (
                          <Button variant="outlined" color="success" style={{cursor:"not-allowed"}}>
                          Applied
                          </Button>
                        ):
                         (
                          // <Link to={idea.Link}>
                          <Button variant="outlined" onClick={()=>handleApply(index)}>
                            Apply <OpenInNewIcon />
                          </Button>
                        )) : (
                          // </Link>
                          
                          <Button
                            variant="outlined"
                            color="error"
                            style={{ cursor: 'not-allowed' }}
                          >
                            Not Available
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

Row.propTypes = {
  row: PropTypes.shape({
    faculty_id: PropTypes.number.isRequired,
    // facultyname: PropTypes.string.isRequired,
    // TotalGroups: PropTypes.number.isRequired,
    // GroupsRemaining: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    idea: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    available: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,
}

function StudentTable({ rows,form }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="center" className="fw-bold">
              ID
            </TableCell>
            <TableCell align="center" className="fw-bold">
              Faculty Name
            </TableCell>
            <TableCell align="center" className="fw-bold">
              Total Groups
            </TableCell>
            <TableCell align="center" className="fw-bold">
              Groups Remaining
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && rows.map((row, index) => <Row form={form} key={index} row={row} />)}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default StudentTable
