import React, { useState } from 'react'
import PropTypes from 'prop-types'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/styles'
import Topbar from './Topbar'
import Sidebar from './Sidebar'
import Footer from './Footer'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  main: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  contentRoot: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  contentChildren: {
    flex: 1,
    marginTop: theme.spacing(2),
  },
  contentTopBarSpacer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  contentFooter: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}))

const sidebarWidth = 200

const Main = props => {
  const { children, handleLogout, sidebarPages } = props

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const classes = useStyles()

  const sidebarPermanent = useMediaQuery('(min-width:400px)')

  return (
    <div className={classes.root}>
      <Topbar
        sidebarPermanent={sidebarPermanent}
        sidebarWidth={sidebarWidth}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        handleLogout={handleLogout}
      />
      <Sidebar
        sidebarPermanent={sidebarPermanent}
        sidebarWidth={sidebarWidth}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        pages={sidebarPages}
        handleLogout={handleLogout}
      />
      <main className={classes.main}>
        <Container className={classes.contentRoot}>
          <div className={classes.contentTopBarSpacer} />
          <div className={classes.contentChildren}>{children}</div>
          <Footer className={classes.contentFooter} />
        </Container>
      </main>
    </div>
  )
}

Main.propTypes = {
  children: PropTypes.node,
  handleLogout: PropTypes.func.isRequired,
  sidebarPages: PropTypes.array.isRequired,
}

export default Main

/**
 * Create Render Layout
 * @param {Array} pages
 * @param {Function} handleLogout
 */
function makeMain(pages, handleLogout) {
  const render = props => (
    <Main sidebarPages={pages} handleLogout={handleLogout} {...props} />
  )
  return render
}

export { makeMain }
