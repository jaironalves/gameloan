import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

const PrivateRoute = ({ component: Component, functions, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      functions.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: `${functions.redirectPath(true)}`,
            state: { from: props.location },
          }}
        />
      )
    }
  />
)

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
  functions: PropTypes.shape({
    isAuthenticated: PropTypes.func,
    redirectPath: PropTypes.func,
  }),
}

export default PrivateRoute
