import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import { RouterLink } from 'src/components'

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  root: {
    marginTop: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  rootButtons: {
    marginTop: theme.spacing(4),
  },
}))

const NotFound = ({ backTo }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Typography variant="h1" align="center" color="textPrimary">
          4 0 4
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Oooops! A página que você buscou não foi encontrada.
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          Parece que você esta perdido? Podemos te ajudar a se reencontrar.
        </Typography>
        <div className={classes.rootButtons}>
          <Grid container justify="center">
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                component={RouterLink}
                to={backTo ? backTo : '/'}
              >
                Sim, me tire daqui
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  )
}

NotFound.propTypes = {
  backTo: PropTypes.string,
}

export default NotFound
