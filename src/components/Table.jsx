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
import { Link } from 'react-router-dom'

function Row(props) {
  const { row } = props
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
          {row.SNo}
        </TableCell>
        <TableCell align="center">{row.FacultyName}</TableCell>
        <TableCell align="center">{row.TotalGroups}</TableCell>
        <TableCell align="center">{row.GroupsRemaining}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Projects
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">S.No</TableCell>
                    <TableCell align="center">Project Idea</TableCell>
                    <TableCell align="center">Available</TableCell>
                    <TableCell align="center">Apply</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.Projects.map((row) => (
                    <TableRow key={row.SNo}>
                      <TableCell component="th" scope="row" align="center">
                        {row.SNo}
                      </TableCell>
                      <TableCell align="center">{row.ProjectIdea}</TableCell>
                      <TableCell align="center">
                        {row.isAvailable ? 'YES' : 'NO'}
                      </TableCell>
                      <TableCell align="center">
                        {row.isAvailable ? (
                          <Link to={row.Link}>
                            <Button variant="outlined">
                              Apply <OpenInNewIcon />
                            </Button>
                          </Link>
                        ) : (
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
    SNo: PropTypes.number.isRequired,
    FacultyName: PropTypes.string.isRequired,
    TotalGroups: PropTypes.number.isRequired,
    GroupsRemaining: PropTypes.string.isRequired,

    Projects: PropTypes.arrayOf(
      PropTypes.shape({
        SNo: PropTypes.number.isRequired,
        ProjectIdea: PropTypes.string.isRequired,
        isAvailable: PropTypes.bool.isRequired,
        Link: PropTypes.string,
      }),
    ).isRequired,
  }).isRequired,
}

const rows = [
  {
    SNo: 1,
    FacultyName: 'Faculty 1',
    TotalGroups: 3,
    GroupsRemaining: 1,
    Projects: [
      {
        SNo: 1,
        ProjectIdea: 'Project Idea 1',
        isAvailable: false,
      },
      {
        SNo: 2,
        ProjectIdea: 'Project Idea 2',
        isAvailable: true,
        Link: '/project/apply/12',
      },
      {
        SNo: 3,
        ProjectIdea: 'Project Idea 3',
        isAvailable: false,
      },
    ],
  },
  {
    SNo: 2,
    FacultyName: 'Faculty 2',
    TotalGroups: 2,
    GroupsRemaining: 2,
    Projects: [
      {
        SNo: 1,
        ProjectIdea: 'Project Idea 1',
        isAvailable: true,
        Link: '/project/apply/2',
      },
      {
        SNo: 2,
        ProjectIdea: 'Project Idea 2',
        isAvailable: true,
        Link: '/project/apply/21',
      },
    ],
  },
]

function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="center">S.No</TableCell>
            <TableCell align="center">Faculty Name</TableCell>
            <TableCell align="center">Total Groups</TableCell>
            <TableCell align="center">Groups Remaining</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default CollapsibleTable
