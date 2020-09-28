import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'

import logo from 'src/assets/logo.svg'
import { RouterLink } from 'src/components'

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: 'none',
  },
}))

const TopbarOnlyLogo = () => {
  const classes = useStyles()
  return (
    <AppBar position="fixed" classes={classes}>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item xs={12} container justify="center">
            <RouterLink to="/">
              <img src={logo} alt="Logo" />
            </RouterLink>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default TopbarOnlyLogo
