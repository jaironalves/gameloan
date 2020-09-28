import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { ButtonProgress, TextFieldPassword } from 'components'
import TextField from '@material-ui/core/TextField'
import Alert from '@material-ui/lab/Alert'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  alert: {
    marginBottom: theme.spacing(3),
  },
  submitWrapper: {
    position: 'relative',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  autoCapitalizeWords: {
    textTransform: 'capitalize',
  },
}))

const Complete = ({ handleChange, handleSubmit, loading, state, stateError }) => {
  const classes = useStyles()
  return (
    <form className={classes.form} onSubmit={handleSubmit} noValidate>
      <Alert className={classes.alert} variant="outlined" severity="info">
        Complete seu cadastro
      </Alert>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            disabled
            label="E-mail"
            variant="outlined"
            margin="dense"
            fullWidth
            value={state.email}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            autoCapitalize="words"
            autoFocus
            error={Boolean(stateError.first_name)}
            fullWidth
            helperText={stateError.first_name}
            inputProps={{
              className: classes.autoCapitalizeWords,
            }}
            label="Nome"
            margin="dense"
            name="first_name"
            onChange={handleChange}
            required
            value={state.first_name}
            variant="outlined"
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            autoCapitalize="words"
            error={Boolean(stateError.last_name)}
            fullWidth
            helperText={stateError.last_name}
            inputProps={{
              className: classes.autoCapitalizeWords,
            }}
            label="Sobrenome"
            margin="dense"
            name="last_name"
            onChange={handleChange}
            required
            value={state.last_name}
            variant="outlined"
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextFieldPassword
            error={Boolean(stateError.password)}
            fullWidth
            helperText={stateError.password}
            label="Senha"
            margin="dense"
            name="password"
            onChange={handleChange}
            required
            value={state.password}
            variant="outlined"
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextFieldPassword
            error={Boolean(stateError.password_confirm)}
            fullWidth
            helperText={stateError.password_confirm}
            label="Confirme a senha"
            margin="dense"
            name="password_confirm"
            onChange={handleChange}
            required
            value={state.password_confirm}
            variant="outlined"
          />
        </Grid>
      </Grid>
      <div className={classes.submitWrapper}>
        <ButtonProgress
          className={classes.submit}
          color="primary"
          fullWidth
          showProgress={loading}
          type="submit"
          variant="contained"
        >
          Cadastrar
        </ButtonProgress>
      </div>
    </form>
  )
}

Complete.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  state: PropTypes.shape({
    email: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    password: PropTypes.string,
    password_confirm: PropTypes.string,
  }).isRequired,
  stateError: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    password: PropTypes.string,
    password_confirm: PropTypes.string,
  }).isRequired,
}

export default Complete
