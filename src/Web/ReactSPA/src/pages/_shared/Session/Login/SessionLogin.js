import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import { ButtonProgress, RouterLink } from 'components'
import { useSessionOptions } from '../Options'
import { ObjectHelper, isEmailValid } from 'helpers'

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

const SessionLogin = ({ className, type }) => {
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()

  const { from } = location.state || { from: { pathname: '/' } }

  const { identity, login, session } = useSessionOptions(type)
  const { options: loginOptions } = login

  const [state, setState] = useState({
    emailOrLogin: '',
    password: '',
  })
  const [stateError, setStateError] = useState({
    emailOrLogin: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [logging, setLogging] = useState(false)

  const handleChange = (event) => {
    // const emailOrLoginName = ObjectHelper.propertyName(() => {
    //   state.emailOrLogin
    // })
    const targetName = event.target.name
    const targetValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    let targetError = ''
    // if (loginOptions.useEmail && targetName === emailOrLoginName && !isEmailValid(targetValue)) {
    //   targetError = 'E-mail inválido - ex: usuario@provedor.com'
    // }

    setState({
      ...state,
      [targetName]: targetValue,
    })
    setStateError({
      ...stateError,
      [targetName]: targetError,
    })
    setError('')
  }

  const callBackRedirect = () => history.replace(from)

  const validateSubmit = () => {
    let emailOrLoginError = ''
    let passwordError = ''
    if (!state.emailOrLogin.trim()) {
      emailOrLoginError = `Informe seu ${loginOptions.useEmail ? 'e-mail' : 'login'} para entrar`
    } else if (loginOptions.useEmail && !isEmailValid(state.emailOrLogin)) {
      emailOrLoginError = 'O e-mail é inválido - ex: usuario@provedor.com'
    }

    if (!state.password.trim()) {
      passwordError = `Informe sua senha para entrar`
    }

    let isValid = !emailOrLoginError && !passwordError
    if (!isValid)
      setStateError({
        ...stateError,
        emailOrLogin: emailOrLoginError,
        password: passwordError,
      })

    return isValid
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!validateSubmit()) return

    try {
      setLogging(true)
      setError('')
      const postData = login.stateAsPost(state)
      const response = await session.authenticate(postData)
      session.login(response.data, callBackRedirect)
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
    <Container className={className} maxWidth="xs">
      <Paper className={classes.paper}>
        <Container className={classes.identity}>
          <Avatar className={classes.avatar}>
            <identity.icon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {identity.description}
          </Typography>
        </Container>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            autoCapitalize="off"
            variant="outlined"
            margin="normal"
            helperText={stateError.emailOrLogin}
            error={Boolean(stateError.emailOrLogin)}
            required
            fullWidth
            id={loginOptions.useEmail ? 'email' : 'login'}
            label={loginOptions.useEmail ? 'E-mail' : 'Login'}
            type={loginOptions.useEmail ? 'email' : 'text'}
            name={ObjectHelper.propertyName(() => {
              state.emailOrLogin
            })}
            placeholder={loginOptions.useEmail ? 'usuario@provedor.com' : undefined}
            autoComplete={loginOptions.useEmail ? 'email' : 'off'}
            autoFocus
            onChange={(evt) => handleChange(evt)}
            value={state.emailOrLogin}
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
            onChange={(evt) => handleChange(evt)}
            value={state.password}
          />
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
          <Grid container spacing={2} justify="center">
            {loginOptions.useRegister && (
              <Grid item>
                <Link component={RouterLink} to={loginOptions.useRegisterPath} variant="body2">
                  Ainda não tem cadastro? Cadastre-se!
                </Link>
              </Grid>
            )}
            {loginOptions.useForgot && (
              <Grid item>
                <Link component={RouterLink} to={loginOptions.useForgotPath} variant="body2">
                  Esqueceu sua senha?
                </Link>
              </Grid>
            )}
          </Grid>
          {error && (
            <Grid container justify="center">
              <Grid item>
                <Typography color="error" variant="body1">
                  {error}
                </Typography>
              </Grid>
            </Grid>
          )}
        </form>
      </Paper>
    </Container>
  )
}

SessionLogin.propTypes = {
  className: PropTypes.string,
}

export default SessionLogin
