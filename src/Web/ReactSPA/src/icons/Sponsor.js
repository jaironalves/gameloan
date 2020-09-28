import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends } from '@fortawesome/free-solid-svg-icons'

const SponsorIcon = ({ className, ...rest }) => {
  return (
    <SvgIcon className={className} {...rest}>
      <FontAwesomeIcon icon={faUserFriends} />
    </SvgIcon>
  )
}

SponsorIcon.propTypes = {
  className: PropTypes.string,
}

export default SponsorIcon
