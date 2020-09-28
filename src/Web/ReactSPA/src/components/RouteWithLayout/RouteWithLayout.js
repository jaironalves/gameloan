import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

const RouteWithLayout = props => {
  const {
    layout: Layout,
    component: Component,
    componentProps,
    ...rest
  } = props

  return (
    <Route
      {...rest}
      render={({ staticContext: _staticContext, ...matchProps }) => {
        const { history } = matchProps
        return (
          <Layout history={history}>
            <Component {...Object.assign({}, matchProps, componentProps)} />
          </Layout>
        )
      }}
    />
  )
}

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  componentProps: PropTypes.object,
}

export default RouteWithLayout
