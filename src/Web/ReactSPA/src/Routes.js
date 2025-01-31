import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './pages/Home'
import { GameRoutes, GameLogin } from 'pages/Game'
import NotFound from './pages/NotFound'

import PrivateRoute from './components/PrivateRoute'
import LoginRoute from './components/LoginRoute'
import { IndexRoutes, SessionRoutes } from './routing'

import { SessionService } from './services'

const RoutePaths = {
  Home: IndexRoutes.Home.Path,
  Game: IndexRoutes.Game.Path,
  GameLogin: SessionRoutes.Game.Login,
}

const GameRouteFunctions = {
  isAuthenticated: () => new SessionService().isAuthenticated(),
  redirectPath: (toLogin) => (toLogin ? RoutePaths.GameLogin : RoutePaths.Game),
}

const Routes = () => (
  <Switch>
    <Route component={Home} exact path={RoutePaths.Home} />
    <LoginRoute
      component={GameLogin}
      functions={GameRouteFunctions}
      path={RoutePaths.GameLogin}
      exact
      redirectPath={RoutePaths.Game}
    />
    <PrivateRoute component={GameRoutes} functions={GameRouteFunctions} path={RoutePaths.Game} />
    <Route component={NotFound} />
  </Switch>
)

export default Routes
