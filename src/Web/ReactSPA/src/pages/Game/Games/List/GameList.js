import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { StatusBullet } from 'components'

const useStyles = makeStyles((theme) => ({
  root: {},  
  inner: {
    minWidth: 800,
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  status: {
    marginRight: theme.spacing(1),
  },
  actions: {
    justifyContent: 'flex-end',
  },
  operationContainer: {
    marginTop: theme.spacing(3),
  },
}))

const statusKey = (game) => {
  if (game.borrowed) return 'borrowed'
  return 'available'
}

const statusColors = {
  available: 'success',
  borrowed: 'info',
}

const statusDescription = {
  available: 'Na prateleira',
  borrowed: 'Emprestado',
}

const statusTooltip = {
  available: 'Na prateleira',
  borrowed: 'Emprestado',
}

const GameList = ({ data, dispatch, dispatchActionDelete, dispatchActionEdit }) => {
  const classes = useStyles()
  return (
    <TableContainer className={classes.root}>
      <Table stickyHeader size="small" className={classes.inner}>
        <TableHead>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell>Jogo</TableCell>
            <TableCell>Emprestado</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from(data).map((game, index) => (
            <TableRow hover key={index}>
              <TableCell>
                <Tooltip enterDelay={300} title={statusTooltip[statusKey(game)]}>
                  <div className={classes.statusContainer}>
                    <StatusBullet
                      className={classes.status}
                      color={statusColors[statusKey(game)]}
                      size="sm"
                    />
                    {statusDescription[statusKey(game)]}
                  </div>
                </Tooltip>
              </TableCell>
              <TableCell>{game.name}</TableCell>
              <TableCell>{game.borrowedTo ? game.borrowedTo.name : ''}</TableCell>
              <TableCell>
                <Tooltip title="Editar">
                  <IconButton
                    aria-label="Editar"
                    size="small"
                    onClick={() =>
                      dispatch({
                        type: dispatchActionEdit,
                        payload: game,
                      })
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Remover">
                  <IconButton
                    aria-label="Remover"
                    size="small"
                    onClick={() =>
                      dispatch({
                        type: dispatchActionDelete,
                        payload: game.id,
                      })
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

GameList.PropTypes = {
  data: PropTypes.array,
  dispatch: PropTypes.func,
  dispatchActionDelete: PropTypes.string,
  dispatchActionEdit: PropTypes.string,
}

export default GameList
