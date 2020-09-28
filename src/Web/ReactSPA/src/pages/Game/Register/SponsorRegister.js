import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IndexRoutesValues } from 'routing'
import { PublicMain } from 'layouts'

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(10),
  },
}))

import SponsorRegisterContainer from './Container'

const SponsorRegister = () => {
  const classes = useStyles()

  return (
    <PublicMain menuValue={IndexRoutesValues.Sponsor}>
      <SponsorRegisterContainer className={classes.container} />
    </PublicMain>
  )
}

export default SponsorRegister
