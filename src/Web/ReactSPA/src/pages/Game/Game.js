import React, { useState } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import RouteWithLayout from 'src/components/RouteWithLayout'
import { makePrivateLayout } from 'src/layouts'
import DashboardIcon from '@material-ui/icons/Dashboard'
import { SessionService } from 'services'

import Games from './Games'
import NotFound from 'pages/NotFound'

const pathBase = '/jogos'
const paths = {
  base: pathBase,
  dashboard: `${pathBase}/prateleira`,
  notfound: `${pathBase}/notfound`,
}

const pages = [
  {
    title: 'Jogos',
    href: paths.dashboard,
    icon: <DashboardIcon />,
  },
]

const Sponsor = () => {
  const [logout, setLogout] = useState(false)

  const handleLogout = () => {
    var session = new SessionService();
    session.logout(() => setLogout(true))    
  }

  const Layout = makePrivateLayout(pages, handleLogout)

  return (
    <Switch>
      {logout ? <Redirect to={paths.base} /> : null}
      <Redirect exact from={paths.base} to={paths.dashboard} />
      <RouteWithLayout
        component={Games}
        exact
        layout={Layout}
        path={paths.dashboard}
        componentProps={{ accountType: 'representative' }}
      />
      <Route exact path={paths.notfound} component={() => <NotFound backTo={paths.base} />} />
      <Redirect to={paths.notfound} />
    </Switch>
  )
}

export default Sponsor
