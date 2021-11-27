import * as React from 'react'
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

function Row({ row }) {
  const [open, setOpen] = React.useState(false)

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
          {row.facultyname.substring(2, row.facultyname.length - 2)}
        </TableCell>
        <TableCell align="center">{row.ideas.length}</TableCell>
        <TableCell align="center">
          {row.available.filter((x) => x === '1').length}
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
                  {row.ideas.map((idea, index) => (
                    <TableRow key={index}>
                      {/* <TableCell component="th" scope="row" align="center">
                        {row.faculty_id}
                      </TableCell> */}
                      <TableCell align="center">{idea}</TableCell>
                      <TableCell align="center">
                        {row.available[index] === '1' ? 'YES' : 'NO'}
                      </TableCell>
                      <TableCell align="center">
                        {row.available[index] === '1' ? (
                          // <Link to={idea.Link}>
                          <Button variant="outlined">
                            Apply <OpenInNewIcon />
                          </Button>
                        ) : (
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
    facultyname: PropTypes.string.isRequired,
    // TotalGroups: PropTypes.number.isRequired,
    // GroupsRemaining: PropTypes.string.isRequired,

    ideas: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    available: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,
}

function CollapsibleTable({ rows }) {
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
          {rows && rows.map((row, index) => <Row key={index} row={row} />)}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default CollapsibleTable
