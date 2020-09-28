import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'

import RouterLink from 'src/components/RouterLink'
import Menu from 'src/Menu'
import logo from 'src/assets/logo.svg'

const RenderSwipeableDrawer = ({
  menuDrawerOpen,
  setMenuDrawerOpen,
  locationSearch,
}) => {
  return (
    <SwipeableDrawer
      anchor="left"
      open={menuDrawerOpen}
      onClose={() => setMenuDrawerOpen(false)}
      onOpen={() => setMenuDrawerOpen(true)}
    >
      <AppBar title="Menu" />
      <List>
        {Menu.map(item => (
          <ListItem
            component={RouterLink}
            to={{
              pathname: item.path,
              search: locationSearch,
            }}
            button
            key={item.label}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </SwipeableDrawer>
  )
}

const RenderIconButton = ({ menuDrawerOpen, setMenuDrawerOpen }) => (
  <IconButton
    onClick={() => setMenuDrawerOpen(!menuDrawerOpen)}
    color="inherit"
    aria-label="Menu"
  >
    <MenuIcon />
  </IconButton>
)

const TopBarMobile = ({ locationSearch }) => {
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false)
  return (
    <Grid container alignItems="center">
      <Grid item xs={10} container justify="center">
        <RouterLink to="/">
          <img src={logo} alt="Logo" />
        </RouterLink>
      </Grid>
      <Grid item xs={2} container justify="flex-end">
        <RenderIconButton
          menuDrawerOpen={menuDrawerOpen}
          setMenuDrawerOpen={setMenuDrawerOpen}
        />
      </Grid>
      <RenderSwipeableDrawer
        menuDrawerOpen={menuDrawerOpen}
        setMenuDrawerOpen={setMenuDrawerOpen}
        locationSearch={locationSearch}
      />
    </Grid>
  )
}

export default TopBarMobile
