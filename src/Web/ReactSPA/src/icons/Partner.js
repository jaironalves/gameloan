import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandshake } from '@fortawesome/free-solid-svg-icons'

const PartnerIcon = ({ className, ...rest }) => {
  return (
    <SvgIcon className={className} {...rest}>
      <FontAwesomeIcon icon={faHandshake} />
    </SvgIcon>
  )
}

PartnerIcon.propTypes = {
  className: PropTypes.string,
}

export default PartnerIcon
