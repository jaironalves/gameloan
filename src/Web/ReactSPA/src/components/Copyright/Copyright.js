import React from 'react'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

const Copyright = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {`Copyright © ${new Date().getFullYear()}`}
    {'. Built with '}
    <Link color="inherit" href="https://material-ui.com/" target="_blank">
      Material-UI.
    </Link>
  </Typography>
)

export default Copyright
