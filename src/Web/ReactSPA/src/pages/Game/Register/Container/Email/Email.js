import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ButtonProgress } from 'components'
import TextField from '@material-ui/core/TextField'
import Alert from '@material-ui/lab/Alert'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import { RouterLink } from 'components'

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
}))

const Email = ({ email, emailError, handleChange, handleSubmit, loading, loginPath }) => {
  const classes = useStyles()
  return (
    <form className={classes.form} onSubmit={handleSubmit} noValidate>
      <Alert className={classes.alert} icon={false} variant="outlined" severity="info">
        Informe um e-mail que será usado para sua identificação.
      </Alert>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            autoCapitalize="off"
            variant="outlined"
            margin="dense"
            helperText={emailError}
            error={Boolean(emailError)}
            required
            fullWidth
            id="email"
            label="E-mail"
            type="email"
            name="email"
            placeholder="usuario@provedor.com"
            autoComplete="email"
            autoFocus
            onChange={(evt) => handleChange(evt)}
            value={email}
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
          Iniciar cadastro
        </ButtonProgress>
      </div>
      <Grid container spacing={2} justify="center">
        <Grid item>
          <Link component={RouterLink} to={loginPath} variant="body2">
            Já sou cadastrado !
          </Link>
        </Grid>
      </Grid>
    </form>
  )
}

export default Email
