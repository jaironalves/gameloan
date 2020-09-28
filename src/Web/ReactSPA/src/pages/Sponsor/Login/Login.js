import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IndexRoutesValues } from 'routing'
import { PublicMain } from 'layouts'
import { SessionLogin } from 'pages/_shared'

const useStyles = makeStyles((theme) => ({
  login: {
    marginTop: theme.spacing(10),
  },
}))

const SponsorLogin = () => {
  const classes = useStyles()

  return (
    <PublicMain menuValue={IndexRoutesValues.Game}>
      <SessionLogin className={classes.login} />
    </PublicMain>
  )
}

export default SponsorLogin
