import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'
import PropTypes from 'prop-types'

const BilletIcon = ({ className, ...rest }) => {
  return (
    <SvgIcon className={className} {...rest}>
      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
    </SvgIcon>
  )
}

BilletIcon.propTypes = {
  className: PropTypes.string,
}

export default BilletIcon
