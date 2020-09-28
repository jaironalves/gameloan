import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'
import PropTypes from 'prop-types'

const BarCodeIcon = ({ className, ...rest }) => {
  return (
    <SvgIcon className={className} {...rest}>
      <path d="M2,6H4V18H2V6M5,6H6V18H5V6M7,6H10V18H7V6M11,6H12V18H11V6M14,6H16V18H14V6M17,6H20V18H17V6M21,6H22V18H21V6Z" />
    </SvgIcon>
  )
}

BarCodeIcon.propTypes = {
  className: PropTypes.string,
}

export default BarCodeIcon
