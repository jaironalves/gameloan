import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Container from '@material-ui/core/Container'
import TopBar, { MenuValues } from './TopBar'
import TopBarMin from './TopBarMin'
import Footer from './Footer'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  topBarSpacer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  main: {
    flex: 1,
  },
  footer: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}))

const Main = ({ menuValue, children }) => {
  const classes = useStyles()

  let RenderTopBar
  if (menuValue !== undefined) {
    RenderTopBar = <TopBar menuValue={menuValue} />
  } else {
    RenderTopBar = <TopBarMin />
  }

  return (
    <Container className={classes.root}>
      {RenderTopBar}
      <div className={classes.topBarSpacer} />
      <main className={classes.main}>{children}</main>
      <Footer className={classes.footer} />
    </Container>
  )
}

Main.propTypes = {
  children: PropTypes.node.isRequired,
  menuValue: PropTypes.number,
}

export { MenuValues }

export default Main
