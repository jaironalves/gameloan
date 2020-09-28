const HomePath = '/'
const GamePath = '/jogos'

/**
 * @param {string} path
 * @param {string} label
 */
const Route = (path, label) => ({
  Path: path,
  Label: label,
})

export const ChainRoutes = (...routes) => routes.map((route) => route.Path).join('')

const RouteLogin = (path = '/login', label = 'Login') => Route(path, label)
const RouteDashBoard = (path = '/painel', label = 'Painel') => Route(path, label)
const RouteNotFound = (path = '/notfound', label = '404') => Route(path, label)

export const Game = {
  ...Route(GamePath, 'Jogos'),
  SubRoutes: {
    Login: RouteLogin(),
    Dashboard: RouteDashBoard(),
    Friends: Route('/amigos', 'Amigos'),
    NotFound: RouteNotFound()
  },
}

export const Index = {
  Home: Route(HomePath, 'Home'),
  Game: Route(Game.Path, Game.Label),
}

export const Session = {
  Game: {
    Login: ChainRoutes(Game, Game.SubRoutes.Login),
  },
}

export const IndexValues = {
  Home: 0,
  Game: 1,
}
