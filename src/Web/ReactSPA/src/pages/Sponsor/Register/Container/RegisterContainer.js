import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Paper from '@material-ui/core/Paper'
import { isEmailValid } from 'helpers'
import { SessionRoutes } from 'routing'
import { SessionService } from 'services'

import Email from './Email'
import Verification from './Verification'
import Complete from './Complete'
import Sucess from './Sucess'

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
}))

function getSteps() {
  return ['Informe seu e-mail', 'Confirme o código', 'Complete seu cadastro']
}

const sessionService = new SessionService()

const RegisterContainer = ({ className }) => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [codeSent, setCodeSent] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [completed, setCompleted] = useState(false)

  const [state, setState] = useState({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password_confirm: '',
    verification: '',
  })

  const [stateError, setStateError] = useState({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password_confirm: '',
    verification: '',
  })

  const steps = getSteps()
  const getActiveStep = () => {
    if (confirmed) return 2

    if (codeSent) return 1

    return 0
  }

  const handleChange = (event) => {
    const targetName = event.target.name
    const targetValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    let targetError = ''

    setState({
      ...state,
      [targetName]: targetValue,
    })
    setStateError({
      ...stateError,
      [targetName]: targetError,
    })
  }

  const validateSubmitEmail = () => {
    let emailError = ''
    if (!state.email.trim()) {
      emailError = 'Informe um e-mail para iniciar seu cadastro'
    } else if (!isEmailValid(state.email)) {
      emailError = 'O e-mail é inválido, esperamos algo assim: usuario@provedor.com'
    }

    let isValid = !emailError
    if (!isValid)
      setStateError({
        ...stateError,
        email: emailError,
      })

    return isValid
  }

  const handleSubmitEmail = async (event) => {
    event.preventDefault()
    if (!validateSubmitEmail()) return
    try {
      setLoading(true)
      
      setCodeSent(true)
      setLoading(false)
    } catch (catchError) {
      setLoading(false)
      console.error(catchError)
      if (catchError.response) {
        const { code, description } = catchError.response.data
        console.log(`${code} - ${description}`)
      } else if (catchError.request) {
        console.log('error request')
        console.log(catchError.request)
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', catchError.message)
      }
    }
  }

  const renderEmail = () => (
    <Email
      email={state.email}
      emailError={stateError.email}
      handleChange={handleChange}
      handleSubmit={handleSubmitEmail}
      loginPath={SessionRoutes.Sponsor.Login}
      loading={loading}
    />
  )

  const validateSubmitVerification = () => {
    let verificationError = ''
    if (!state.verification.trim()) {
      verificationError = 'Informe o código de confirmação'
    }

    let isValid = !verificationError
    if (!isValid)
      setStateError({
        ...stateError,
        verification: verificationError,
      })

    return isValid
  }

  const handleSubmitVerification = async (event) => {
    event.preventDefault()
    if (!validateSubmitVerification()) return
    try {
      setLoading(true)
      await sessionService.registerCodeValidate({
        email: state.email,
        code: state.verification,
      })
      setConfirmed(true)
      setLoading(false)
    } catch (catchError) {
      setLoading(false)
      console.error(catchError)
    }
  }

  const renderVerification = () => (
    <Verification
      email={state.email}
      handleChange={handleChange}
      handleSubmit={handleSubmitVerification}
      loading={loading}
      verification={state.verification}
      verificationError={stateError.verification}
    />
  )

  const validateSubmitComplete = () => {
    let first_nameError = ''
    let last_nameError = ''
    let passwordError = ''
    let password_confirmError = ''

    if (!state.first_name.trim()) {
      first_nameError = 'Informe o nome para cadastro'
    }

    if (!state.last_name.trim()) {
      last_nameError = 'Informe o sobrenome para cadastro'
    }

    if (!state.password.trim()) {
      passwordError = 'Informe uma senha para cadastro'
    }

    if (!state.password_confirm.trim()) {
      password_confirmError = 'Confirme a senha de cadastro'
    }

    let validatePassword = !passwordError && !password_confirmError

    if (validatePassword && state.password.trim().length <= 5) {
      passwordError = 'A senha deve ter no minímo 6 caracteres'
      password_confirmError = 'A senha deve ter no minímo 6 caracteres'
    }

    validatePassword = !passwordError && !password_confirmError

    if (validatePassword && state.password !== state.password_confirm) {
      passwordError = 'As senhas não correspondem'
      password_confirmError = 'As senhas não correspondem'
    }

    let isValid = !first_nameError && !last_nameError && !passwordError && !password_confirmError
    if (!isValid)
      setStateError({
        ...stateError,
        first_name: first_nameError,
        last_name: last_nameError,
        password: passwordError,
        password_confirm: password_confirmError,
      })

    return isValid
  }

  const handleSubmitComplete = async (event) => {
    event.preventDefault()
    if (!validateSubmitComplete()) return
    try {
      setLoading(true)
      const response = await sessionService.register({
        first_name: state.first_name,
        last_name: state.last_name,
        email: state.email,
        password: state.password,
        verification: state.verification,
      })
      const { data } = response
      sessionService.login(data)
      setCompleted(true)
      setLoading(false)
    } catch (catchError) {
      setLoading(false)
      console.error(catchError)
    }
  }

  const renderComplete = () => (
    <Complete
      handleChange={handleChange}
      handleSubmit={handleSubmitComplete}
      loading={loading}
      state={state}
      stateError={stateError}
    />
  )

  const renderSucess = () => <Sucess loginPath={SessionRoutes.Sponsor.Login} />

  return (
    <Container className={className} maxWidth="sm">
      <Paper className={classes.paper}>
        {!completed && (
          <Stepper activeStep={getActiveStep()} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        )}
        {!codeSent
          ? renderEmail()
          : !confirmed
          ? renderVerification()
          : !completed
          ? renderComplete()
          : renderSucess()}
      </Paper>
    </Container>
  )
}

export default RegisterContainer
