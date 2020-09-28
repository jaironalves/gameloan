import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

const LoginRoute = ({ component: Component, functions, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !functions.isAuthenticated() ? (
        // <Component {...{ auth, redirectPath, ...props }} />
        <Component {...props} />
      ) : (
        <Redirect to={`${functions.redirectPath(false)}`} />
      )
    }
  />
)

LoginRoute.propTypes = {
  component: PropTypes.any.isRequired,
  functions: PropTypes.shape({
    isAuthenticated: PropTypes.func,
    redirectPath: PropTypes.func,
  }),
}

export default LoginRoute
