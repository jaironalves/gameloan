import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

const LoginRoute = ({ component: Component, auth, redirectPath, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !auth.isAuthenticated() ? (
        <Component {...{ auth, redirectPath, ...props }} />
      ) : (
        <Redirect to={redirectPath} />
      )
    }
  />
)

LoginRoute.propTypes = {
  component: PropTypes.any.isRequired,
  auth: PropTypes.object.isRequired,
  redirectPath: PropTypes.string,
}

export default LoginRoute
