/* eslint-disable react/no-children-prop */
import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { RouterLink } from 'components'

const ChildrenRouterLink = ({
  active,
  children,
  component: Component,
  onClick,
  ...rest
}) => {
  if (active) onClick = e => e.preventDefault()
  return (
    <Component onClick={onClick} component={RouterLink} {...rest}>
      {children}
    </Component>
  )
}

const RenderRouterLink = props => {
  const { to, exact, ...rest } = props
  return (
    <Route
      path={to}
      exact={exact}
      children={({ match }) => (
        <ChildrenRouterLink
          active={!(typeof match === 'undefined' || match === null)}
          {...{ to, ...rest }}
        />
      )}
    />
  )
}

RenderRouterLink.propTypes = {
  activeClassName: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  exact: PropTypes.bool,
  component: PropTypes.any.isRequired,
  to: PropTypes.string.isRequired,
}

export default RenderRouterLink
