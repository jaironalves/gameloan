import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import { createApi } from 'services'
import { ButtonProgress } from 'components'

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  identity: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submitWrapper: {
    position: 'relative',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const Login = ({ identityIcon, identityDescription, auth, redirectTo, className }) => {
  const classes = useStyles()

  const [redirect, setRedirect] = useState(false)
  const [user, setUser] = useState({
    login: '',
    password: '',
    type: auth.getType(),
  })
  const [error, setError] = useState('')
  const [logging, setLogging] = useState(false)

  const handleChangeUser = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    })
    setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!user.login || !user.password) {
      setError('Preencha login e senha para continuar.')
      return
    }

    try {
      setLogging(true)
      setError('')
      const api = createApi(auth.getToken)
      const response = await api.post('/session/authenticate', {
        ...user,
      })
      auth.login(response.data, () => setRedirect(true))
    } catch (catchError) {
      let errorDescription = ''
      // Error
      if (catchError.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        const { code, description } = catchError.response.data
        errorDescription = `${code} - ${description}`
        console.log(catchError.response.data)
        console.log(catchError.response.status)
        console.log(catchError.response.headers)
        console.log(catchError.request)
      } else if (catchError.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        console.log('error request')
        console.log(catchError.request)
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', catchError.message)
      }
      console.log(catchError)
      console.log(errorDescription)

      setError(
        `Houve um problema com o login, verifique suas credenciais.
        ${errorDescription}`
      )
      setLogging(false)
    }
  }

  return (
    <React.Fragment>
      {redirect ? redirectTo : null}
      <Container maxWidth="xs" className={className}>
        <Paper className={classes.paper}>
          <Container className={classes.identity}>
            <Avatar className={classes.avatar}>{identityIcon}</Avatar>
            <Typography component="h1" variant="h5">
              {identityDescription}
            </Typography>
          </Container>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="login"
              label="Login"
              name="login"
              autoComplete="email"
              autoFocus
              onChange={handleChangeUser}
              value={user.login}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChangeUser}
              value={user.password}
            />
            {error && (
              <Grid container justify="center">
                <Grid item>
                  <Typography color="error" variant="body1">
                    {error}
                  </Typography>
                </Grid>
              </Grid>
            )}
            <div className={classes.submitWrapper}>
              <ButtonProgress
                className={classes.submit}
                color="primary"
                showProgress={logging}
                fullWidth
                type="submit"
                variant="contained"
              >
                Entrar
              </ButtonProgress>
            </div>
            {false && (
              <Grid container justify="center">
                <Grid item>
                  <Link href="#" variant="body2">
                    Esqueceu sua senha?
                  </Link>
                </Grid>
              </Grid>
            )}
          </form>
        </Paper>
      </Container>
    </React.Fragment>
  )
}

Login.propTypes = {
  className: PropTypes.string,
  identityIcon: PropTypes.node.isRequired,
  identityDescription: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  redirectTo: PropTypes.node.isRequired,
}

export default Login
