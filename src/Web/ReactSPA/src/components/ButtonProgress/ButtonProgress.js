import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: 'relative',
  },
  progress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}))

const ButtonProgress = ({ className, classNameProgress, children, showProgress, ...rest }) => {
  const classes = useStyles()
  return (
    <div className={classes.wrapper}>
      <Button className={clsx(classes.button, className)} disabled={showProgress} {...rest}>
        {children}
      </Button>
      {showProgress && (
        <CircularProgress size={24} className={clsx(classes.progress, classNameProgress)} />
      )}
    </div>
  )
}

ButtonProgress.propTypes = {
  className: PropTypes.string,
  classNameProgress: PropTypes.string,
  children: PropTypes.node,
  showProgress: PropTypes.bool,
}

export default ButtonProgress
