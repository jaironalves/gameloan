import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { AppBar, Toolbar, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import InputIcon from '@material-ui/icons/Input'
// import Logo from 'src/assets/logo.svg'
// import { RouterLink } from 'src/components'

const useStyles = makeStyles(theme => ({
  appBar: {
    boxShadow: 'none',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: props => ({
    marginLeft: props.sidebarWidth,
    width: `calc(100% - ${props.sidebarWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  menuButton: {
    marginRight: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
}))

const RenderMenuButton = ({ setSidebarOpen, className }) => {
  return (
    <IconButton
      color="inherit"
      aria-label="abrir menu"
      onClick={() => setSidebarOpen(true)}
      edge="start"
      className={className}
    >
      <MenuIcon />
    </IconButton>
  )
}

const Topbar = ({
  sidebarPermanent,
  sidebarWidth,
  sidebarOpen,
  setSidebarOpen,
  handleLogout,
}) => {
  const classes = useStyles({ sidebarWidth })

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: sidebarPermanent && sidebarOpen,
      })}
    >
      <Toolbar>
        {sidebarPermanent && !sidebarOpen && (
          <RenderMenuButton
            className={classes.menuButton}
            setSidebarOpen={setSidebarOpen}
          />
        )}
        {/* <RouterLink to="/">
          <img className={classes.img} alt="Logo" src={Logo} />
        </RouterLink> */}
        <div className={classes.grow} />
        {!sidebarPermanent && (
          <RenderMenuButton setSidebarOpen={setSidebarOpen} />
        )}
        {sidebarPermanent && (
          <IconButton color="inherit" onClick={handleLogout}>
            <InputIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  )
}

Topbar.propTypes = {
  sidebarPermanent: PropTypes.bool.isRequired,
  sidebarWidth: PropTypes.number.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
  setSidebarOpen: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
}

export default Topbar
