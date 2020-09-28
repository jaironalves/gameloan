import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'
import Button from '@material-ui/core/Button'
import { RouterLink } from 'components'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
  alert: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing(6, 0, 0),
  },
}))

const Sucess = ({ loginPath }) => {
  const classes = useStyles()
  return (
    <React.Fragment>
      <div className={classes.root}>
        <Alert className={classes.alert} severity="success">
          <AlertTitle>Cadastro concluído com sucesso</AlertTitle>
          Seja bem vindo a LS Fidelidade
        </Alert>
        <Button
          className={classes.button}
          color="primary"
          component={RouterLink}
          fullWidth
          to={loginPath}
          variant="contained"
        >
          Começar
        </Button>
      </div>
    </React.Fragment>
  )
}

export default Sucess
