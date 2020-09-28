import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

const Title = ({ children }) => (
  <Typography component="span" variant="h5" color="primary" gutterBottom>
    {children}
  </Typography>
)

Title.propTypes = {
  children: PropTypes.node,
}

export default Title
