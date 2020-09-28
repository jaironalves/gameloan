import React, { useState, useReducer, useEffect } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import TextField from '@material-ui/core/TextField'
import { StatusBullet } from 'components'
import { Title } from 'components'
import { RouterLink } from 'src/components'
import { LoanService } from 'services'
import { useHandleRequest, useDeepEffect } from 'hooks'

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
    overflow: 'auto',
  },
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
}))

const ACTIONS = {
  NONE: 'NONE',
  DELETE: 'DELETE',
}

const actionReducer = (state, { type, payload } = {}) => {
  switch (type) {
    case ACTIONS.DELETE:
      return { ...state, action: ACTIONS.DELETE, params: payload }
    default:
      return state
  }
}

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

const Games = (props) => {
  const { className, ...rest } = props
  const classes = useStyles()

  const [data, setData] = useState([])

  const listGames = async (params) => new LoanService().listGames(params)

  const [dataRequest, , setDataRequest] = useHandleRequest(listGames, {})

  useEffect(() => {
    let didCancel = false
    const { status, payload } = dataRequest
    if (!didCancel && status) {
      if (status === 'SUCCESS') {
        setData(payload.data)
      }
    }
  }, [dataRequest])

  const [stateAction, dispatchAction] = useReducer(actionReducer, {
    action: ACTIONS.NONE,
  })

  useDeepEffect(() => {
    //let isUnmounted = false

    const effectGameDeleteAsync = async (gameId) => {
      try {
        await new LoanService().deleteGame(gameId)
        // if (!isUnmounted && response.status === 200) {

        // }
        setDataRequest({})
      } catch (error) {
        console.log(error)
      }
    }

    if (stateAction.action === ACTIONS.DELETE) {
      effectGameDeleteAsync(stateAction.params)
    }

    return () => {
      //isUnmounted = true
    }
  }, [stateAction])

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
      <TextField variant="outlined" margin="normal" />
        <Card {...rest} className={clsx(classes.root, className)}>
          <CardHeader
            title={<Title>Meus Jogos</Title>}
            action={
              <Button
                color="primary"
                component={RouterLink}
                size="small"
                to="vendas"
                variant="contained"
              >
                Ver mais <ArrowRightIcon />
              </Button>
            }
            disableTypography={true}
          />            
          <Divider />
          <CardContent className={classes.content}>
            
            <Divider />
            <TableContainer className={classes.container}>
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
                        <Tooltip title="Remover">
                          <IconButton
                            aria-label="Remover"
                            size="small"
                            onClick={() =>
                              dispatchAction({
                                type: ACTIONS.DELETE,
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
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

Games.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array,
}

export default Games
