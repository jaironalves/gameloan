import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ButtonProgress } from 'components'
import TextField from '@material-ui/core/TextField'
import Alert from '@material-ui/lab/Alert'
import Link from '@material-ui/core/Link'
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
}))

const Verification = ({
  email,
  handleChange,
  handleSubmit,
  loading,
  verification,
  verificationError,
}) => {
  const classes = useStyles()
  return (
    <form className={classes.form} onSubmit={handleSubmit} noValidate>
      <Alert className={classes.alert} variant="outlined" severity="warning">
        Verifique em seu e-mail o código de confirmação
      </Alert>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            disabled
            label="E-mail"
            variant="outlined"
            margin="dense"
            fullWidth
            value={email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            autoCapitalize="off"
            variant="outlined"
            margin="dense"
            helperText={verificationError}
            error={Boolean(verificationError)}
            required
            fullWidth
            id="verification"
            label="Confirme o código"
            type="text"
            name="verification"
            autoFocus
            onChange={(evt) => handleChange(evt)}
            value={verification}
            inputProps={{
              maxLength: 6,
            }}
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
          Confirmar
        </ButtonProgress>
      </div>
      <Grid container spacing={2} justify="center">
        <Grid item>
          <Link variant="body2">Reenviar o código</Link>
        </Grid>
      </Grid>
    </form>
  )
}

export default Verification
