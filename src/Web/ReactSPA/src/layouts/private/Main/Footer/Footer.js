import React from 'react'
import Container from '@material-ui/core/Container'

import Copyright from 'src/components/Copyright'

const Footer = ({ className }) => {
  return (
    <footer className={className}>
      <Container maxWidth="sm">
        <Copyright />
      </Container>
    </footer>
  )
}
export default Footer
