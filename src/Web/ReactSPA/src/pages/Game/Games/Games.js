import React, { useState, useReducer, useEffect } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import { Title } from 'components'
import { LoanService } from 'services'
import { useHandleRequest, useDeepEffect } from 'hooks'

import GameList from './List'

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
  operationContainer: {
    marginTop: theme.spacing(3),
  },
}))

const ACTIONS = {
  NONE: 'NONE',
  DELETE: 'DELETE',
  EDIT: 'EDIT'
}

const actionReducer = (state, { type, payload } = {}) => {
  switch (type) {
    case ACTIONS.DELETE:
      return { ...state, action: ACTIONS.DELETE, params: payload }
    default:
      return state
  }
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

  const renderList = () => (
    <GameList data={data} dispatch={dispatchAction} dispatchActionDelete={ACTIONS.DELETE} dispatchActionEdit={ACTIONS.EDIT}/>    
  )

  const renderAdd = () => (
    <Container className={classes.operationContainer} maxWidth="sm">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            autoCapitalize="off"
            variant="outlined"
            margin="dense"
            required
            fullWidth
            id="game"
            label="Jogo"
            type="text"
            name="game"
            placeholder="Novo jogo"
            autoFocus
            //onChange={(evt) => handleChange(evt)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button color="primary" variant="contained">
            Adicionar
          </Button>
          <Button color="primary" variant="contained">
            Cancelar
          </Button>
        </Grid>        
      </Grid>
    </Container>
  )

  const isRender = () => 1 != 1

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card {...rest} className={clsx(classes.root, className)}>
          <CardHeader title={<Title>Meus Jogos</Title>} disableTypography={true} />
          <Divider />
          <CardContent className={classes.content}>
            <Divider />
            {isRender() ? renderAdd() : renderList()}
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
