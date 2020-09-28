import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
//import { Drawer } from '@material-ui/core'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import { RenderRouterLink } from 'src/components'
import Logout from './Logout'

const useStyles = makeStyles(theme => ({
  drawerPaper: props => ({
    position: 'relative',
    whiteSpace: 'nowrap',
    width: props.sidebarWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  listItem: {
    textTransform: 'none',
    letterSpacing: 0,
    fontWeight: theme.typography.fontWeightMedium,
  },
  listIcon: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(1),
    },
  },
  listItemActive: {
    color: theme.palette.primary.main,
    '& $listIcon': {
      color: theme.palette.primary.main,
    },
  },
  logout: {
    marginTop: theme.spacing(4),
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
}))

const Sidebar = ({
  sidebarPermanent,
  sidebarWidth,
  sidebarOpen,
  setSidebarOpen,
  handleLogout,
  pages,
}) => {
  const classes = useStyles({ sidebarWidth })

  return (
    <SwipeableDrawer
      variant={sidebarPermanent ? 'permanent' : 'temporary'}
      className={clsx({
        [classes.drawerPaper]: sidebarOpen,
        [classes.drawerPaperClose]: !sidebarOpen,
      })}
      classes={{
        paper: clsx({
          [classes.drawerPaper]: sidebarOpen,
          [classes.drawerPaperClose]: !sidebarOpen,
        }),
      }}
      open={sidebarOpen}
      onClose={() => setSidebarOpen(false)}
      onOpen={() => setSidebarOpen(true)}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={() => setSidebarOpen(false)}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        {pages.map(page => (
          <RenderRouterLink
            key={page.title}
            button
            className={classes.listItem}
            activeClassName={classes.listItemActive}
            component={ListItem}
            to={page.href}
          >
            <ListItemIcon className={classes.listIcon}>
              {page.icon}
            </ListItemIcon>
            <ListItemText primary={page.title} />
          </RenderRouterLink>
        ))}
      </List>
      {!sidebarPermanent && (
        <Logout handleLogout={handleLogout} className={classes.logout} />
      )}
    </SwipeableDrawer>
  )
}

Sidebar.propTypes = {
  sidebarPermanent: PropTypes.bool.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
  setSidebarOpen: PropTypes.func.isRequired,
  pages: PropTypes.array.isRequired,
  handleLogout: PropTypes.func.isRequired,
}

export default Sidebar
