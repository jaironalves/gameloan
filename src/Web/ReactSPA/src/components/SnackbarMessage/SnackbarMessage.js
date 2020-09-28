import React from 'react'
import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar'
import Fade from '@material-ui/core/Fade'
import Slide from '@material-ui/core/Slide'
import Grow from '@material-ui/core/Grow'
import SnackbarContentWrapper from './SnackbarContentWrapper'

const SlideTransitionLeft = props => <Slide {...props} direction="left" />

const SlideTransitionUp = props => <Slide {...props} direction="up" />

const SlideTransitionRight = props => <Slide {...props} direction="right" />

const SlideTransitionDown = props => <Slide {...props} direction="down" />

const GrowTransition = props => <Grow {...props} />

const SnackBarMessage = ({
  message,
  onClose,
  transition,
  variant,
  ...rest
}) => {
  let transitionComponent = undefined
  switch (transition) {
    case 'fade':
      transitionComponent = Fade
      break

    case 'grow':
      transitionComponent = GrowTransition
      break

    case 'slideLeft':
      transitionComponent = SlideTransitionLeft
      break

    case 'slideUp':
      transitionComponent = SlideTransitionUp
      break

    case 'slideRight':
      transitionComponent = SlideTransitionRight
      break

    case 'slideDown':
      transitionComponent = SlideTransitionDown
      break

    default:
      transitionComponent = undefined
      break
  }

  return (
    <Snackbar
      onClose={onClose}
      TransitionComponent={transitionComponent}
      {...rest}
    >
      <SnackbarContentWrapper
        variant={variant}
        message={message}
        onClose={onClose}
      />
    </Snackbar>
  )
}

SnackBarMessage.propTypes = {
  message: PropTypes.string,
  onClose: PropTypes.func,
  transition: PropTypes.oneOf([
    'fade',
    'grow',
    'slideLeft',
    'slideUp',
    'slideRight',
    'slideDown',
  ]),
  variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
}

export default SnackBarMessage
