import * as React from 'react'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import AddIcon from '@mui/icons-material/Add'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Grid from '@mui/material/Grid'
import formatCompleteDate from '@helpers/moment/formatDate'
import {
  Menu,
  MenuItem,
  TablePagination,
  TableSortLabel,
  Tooltip,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Drainase from './partials/DetailStreet'
import useStyles from './Table.styles'

interface IRow {
  rows: Array<{ [key: string]: string | number }>
  head: Array<{ [key: string]: string | number }>
  sortData?: { [key: string]: number }
  expandable: boolean
  detailUrl: string
  rowsPerPage: number
  page: number
}

function Row({
  rows,
  head,
  sortData = {},
  expandable,
  rowsPerPage,
  page,
  detailUrl,
}: IRow) {
  const navigate = useNavigate()
  const [open, setOpen] = React.useState<{ [key: number]: boolean }>({})
  const [id, setId] = React.useState<number>(0)
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    params: number
  ) => {
    setAnchorEl(event.currentTarget)

    setId(params)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const matchesKey = head.filter((h) => h.selector).map((d) => d.selector)

  const displayByFormat = (
    key: string,
    data: { [key: string]: string | unknown }
  ): React.ReactNode | string => {
    if (key === 'is_published') {
      return (
        <Box
          sx={{
            width: '48px',
            height: '38px',
            padding: '0 16px',
            backgroundColor: '#33C863',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#FFFFFF',
            borderRadius: '8px',
          }}
        >
          <Typography variant="subtitle2">Tampil</Typography>
        </Box>
      )
    }

    if (key === 'street_name') {
      return (
        <Tooltip title={data[key] as string}>
          <Typography variant="subtitle2" className={classes.textTruncate}>
            {data[key] as string}
          </Typography>
        </Tooltip>
      )
    }

    if (key === 'createdAt') {
      return formatCompleteDate(data[key] as string)
    }

    if (['street_width', 'sta'].includes(key)) {
      return `${data[key]} Meter`
    }

    return data[key] as string
  }

  return (
    <>
      {rows.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (row: { [key: string]: string | number | any }, idx: number) => {
          const asArray = Object.entries(row)

          const getScore: { [key: string]: number } = sortData

          const filteredObj = asArray
            .filter(([key]) => matchesKey.includes(key))
            .map((d) => ({
              [d[0]]: d[1],
              key: matchesKey.find((key) => key === d[0]),
              score: getScore[matchesKey.find((key) => key === d[0]) as string],
            }))
            .sort((a, b) => {
              if (a.score < b.score) {
                return -1
              }

              if (a.score > b.score) {
                return 1
              }

              return 0
            })

          return (
            // eslint-disable-next-line
            <React.Fragment key={idx}>
              <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                {expandable ? (
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      className={
                        open[idx]
                          ? classes.toggleExpandOpened
                          : classes.toggleExpand
                      }
                      onClick={() => setOpen({ [idx]: !open[idx] })}
                    >
                      {open[idx] ? <HorizontalRuleIcon /> : <AddIcon />}
                    </IconButton>
                  </TableCell>
                ) : (
                  <TableCell />
                )}
                <TableCell sx={{ fontWeight: 600 }} component="th" scope="row">
                  {page * rowsPerPage - rowsPerPage + (idx + 1)}
                </TableCell>
                {filteredObj.map((obj) => (
                  <TableCell key={obj.key} sx={{ fontWeight: 600 }}>
                    {
                      displayByFormat(obj.key as string, obj) as
                        | string
                        | React.ReactNode
                    }
                  </TableCell>
                ))}
                <TableCell>
                  <Box>
                    <IconButton
                      onClick={(e) => handleClick(e, row.id as number)}
                      color="primary"
                      aria-label="menu"
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
              {expandable && (
                <TableRow>
                  <TableCell
                    style={{
                      paddingBottom: 0,
                      paddingTop: 0,
                      borderBottom: 0,
                      backgroundColor: '#FAFAFA',
                    }}
                    colSpan={12}
                  >
                    <Collapse
                      in={open[idx] as boolean}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box
                        sx={{
                          margin: '24px 32px',
                        }}
                      >
                        <Grid
                          container
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            <Box sx={{ color: '#757575' }}>
                              <Typography fontWeight={600} variant="subtitle1">
                                Drainase Kiri
                              </Typography>
                            </Box>
                            <Drainase data={row.left_drainase} />
                          </Grid>
                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            <Box sx={{ color: '#757575' }}>
                              <Typography fontWeight={600} variant="subtitle1">
                                Drainase Kanan
                              </Typography>
                            </Box>
                            <Drainase data={row.right_drainase} />
                          </Grid>
                        </Grid>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          )
        }
      )}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
        sx={{
          top: -130,
          left: -70,
          position: 'absolute',
        }}
        disableScrollLock
        PaperProps={{
          sx: {
            boxShadow: '0px 12px 24px rgba(112, 144, 176, 0.24)',
            mt: 1.5,
            border: '1px solid #DDDFE5',
          },
        }}
      >
        <MenuItem onClick={() => navigate(`${detailUrl}/edit/${id}`)}>
          <Typography color="text">Edit</Typography>
        </MenuItem>
        <MenuItem onClick={() => navigate(`${detailUrl}/delete/${id}`)}>
          <Typography color="text">Hapus</Typography>
        </MenuItem>
      </Menu>
    </>
  )
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

type Order = 'asc' | 'desc'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  // eslint-disable-next-line @typescript-eslint/indent
  a: { [key in Key]: number | string },
  // eslint-disable-next-line @typescript-eslint/indent
  b: { [key in Key]: number | string }
  // eslint-disable-next-line @typescript-eslint/indent
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])

    if (order !== 0) {
      return order
    }

    return a[1] - b[1]
  })

  return stabilizedThis.map((el) => el[0])
}

interface ICustomTable {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: Array<{ [key: string]: string | number | any }>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  head: Array<{ [key: string]: string | number | any }>
  firstSpace?: boolean
  lastSpace?: boolean
  sortData?: { [key: string]: number }
  expandable?: boolean
  detailUrl?: string
  page: number
  rowsPerPage: number
  handleChangePage: (e: unknown, p: number) => void
  handleChangeRowsPerPage: (p: React.ChangeEvent<HTMLInputElement>) => void
}

const CustomTable: React.FC<ICustomTable> = ({
  head,
  rows,
  firstSpace = true,
  lastSpace = true,
  sortData,
  expandable = false,
  page,
  rowsPerPage,
  detailUrl = '',
  handleChangePage,
  handleChangeRowsPerPage,
}: ICustomTable): JSX.Element => {
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<string>('')

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === 'asc'

    setOrder(isAsc ? 'desc' : 'asc')

    setOrderBy(property)
  }

  const createSortHandler = (property: string) => (
    event: React.MouseEvent<unknown>
  ) => {
    handleRequestSort(event, property)
  }

  return (
    <>
      <TableContainer elevation={0} component={Paper}>
        <Table
          sx={{
            [`${tableCellClasses.root}`]: {
              border: 0,
            },
          }}
        >
          <TableHead>
            <TableRow>
              {firstSpace && <TableCell />}
              <TableCell
                sx={{
                  fontWeight: 700,
                  color: '#9E9E9E',
                }}
              >
                No
              </TableCell>
              {head.map((h, idx) => (
                <TableCell
                  // eslint-disable-next-line react/no-array-index-key
                  key={idx}
                  sortDirection={orderBy === h.selector ? order : false}
                  sx={{
                    fontWeight: 700,
                    color: '#9E9E9E',
                    ...(h.style || {}),
                  }}
                >
                  <TableSortLabel
                    active={orderBy === h.selector}
                    direction={orderBy === h.selector ? order : 'asc'}
                    onClick={createSortHandler(h.selector)}
                  >
                    {h.title}
                  </TableSortLabel>
                </TableCell>
              ))}
              {lastSpace && <TableCell />}
            </TableRow>
          </TableHead>
          <TableBody>
            <Row
              detailUrl={detailUrl}
              expandable={expandable}
              head={head}
              rowsPerPage={rowsPerPage}
              page={page + 1}
              rows={stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )}
              sortData={sortData}
            />
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(e: unknown, p: number) => handleChangePage(e, p)}
        onRowsPerPageChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChangeRowsPerPage(e)
        }
      />
    </>
  )
}

export default React.memo(CustomTable)
