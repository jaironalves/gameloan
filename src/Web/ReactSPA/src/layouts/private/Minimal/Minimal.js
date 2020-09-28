import React from 'react'
import PropTypes from 'prop-types'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/styles'
import { TopbarOnlyLogo, Footer } from 'layouts/_shared'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  main: {
    flexGrow: 1,
    height: '100vh',
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
  contentBoxBack: {
    marginTop: theme.spacing(2),
  },
  contentFooter: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}))

const Minimal = ({ history, children }) => {
  const classes = useStyles()

  const handleBack = () => {
    history.goBack()
  }

  return (
    <div className={classes.root}>
      <TopbarOnlyLogo />
      <main className={classes.main}>
        <Container className={classes.contentRoot}>
          <div className={classes.contentTopBarSpacer} />
          <Box className={classes.contentBoxBack}>
            <IconButton onClick={handleBack}>
              <ArrowBackIcon />
            </IconButton>
          </Box>
          <div className={classes.contentChildren}>{children}</div>
          <Footer className={classes.contentFooter} />
        </Container>
      </main>
    </div>
  )
}

Minimal.propTypes = {
  children: PropTypes.node,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
}

export default Minimal
