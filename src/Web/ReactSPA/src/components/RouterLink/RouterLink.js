import React, { forwardRef } from 'react'
import { NavLink } from 'react-router-dom'

const RouterLink = forwardRef((props, ref) => (
  //<div ref={ref}>
  <NavLink {...props} ref={ref} />
  //</div>
))

RouterLink.displayName = RouterLink.name

export default RouterLink
