import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserTie } from '@fortawesome/free-solid-svg-icons'

const RepresentativeIcon = ({ className, ...rest }) => {
  return (
    <SvgIcon className={className} {...rest}>
      <FontAwesomeIcon icon={faUserTie} />
    </SvgIcon>
  )
}

RepresentativeIcon.propTypes = {
  className: PropTypes.string,
}

export default RepresentativeIcon
