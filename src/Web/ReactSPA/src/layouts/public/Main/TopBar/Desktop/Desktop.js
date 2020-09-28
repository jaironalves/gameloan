import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import Menu from 'src/Menu'
import logo from 'src/assets/logo.svg'
import { RouterLink } from 'src/components'

const useStylesTab = makeStyles(() => ({
  root: {
    minWidth: 'auto',
  },
}))

const RenderTabs = ({ menuValue, locationSearch }) => {
  const [tabValue, setTabValue] = useState(menuValue)
  const classesTab = useStylesTab()

  return (
    <React.Fragment>
      <Tabs value={tabValue} onChange={(_event, value) => setTabValue(value)}>
        {Menu.map((item, index) => (
          <Tab
            key={index}
            value={item.value}
            component={RouterLink}
            to={{
              pathname: item.path,
              search: locationSearch,
            }}
            classes={classesTab}
            label={item.label}
          />
        ))}
      </Tabs>
    </React.Fragment>
  )
}

const useStyles = makeStyles(() => ({
  divider: {
    borderLeft: `1px solid white`,
    height: '50px',
  },
}))

const TopBarDeskTop = ({ menuValue, locationSearch }) => {
  const classes = useStyles()
  return (
    <Grid container alignItems="center">
      <Grid item xs={2} container justify="center">
        <RouterLink to="/">
          <img src={logo} alt="Logo" />
        </RouterLink>
      </Grid>
      <Grid item xs={10} container alignItems="center">
        <Grid item xs={1} container justify="center">
          <div className={classes.divider} />
        </Grid>
        <Grid item xs={11}>
          <RenderTabs menuValue={menuValue} locationSearch={locationSearch} />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default TopBarDeskTop
