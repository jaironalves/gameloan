import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import InputIcon from '@material-ui/icons/Input'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 2),
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    width: '100%',
  },
  icon: {
    marginLeft: theme.spacing(3),
  },
}))

const Logout = props => {
  const { className, handleLogout, ...rest } = props

  const classes = useStyles()

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Button
        color="primary"
        variant="contained"
        className={classes.button}
        onClick={handleLogout}
      >
        Sair
        <InputIcon className={classes.icon} />
      </Button>
    </div>
  )
}

Logout.propTypes = {
  className: PropTypes.string,
}

export default Logout
