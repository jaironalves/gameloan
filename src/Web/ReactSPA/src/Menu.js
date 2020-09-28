const MenuHomeValue = 0
const MenuGameValue = 1

const MenuHomePath = '/'
const MenuGamePath = '/jogos'

const Menu = [
  {
    value: MenuHomeValue,
    label: 'Home',
    path: MenuHomePath,
  },
  {
    value: MenuGameValue,
    label: 'Jogos',
    path: MenuGamePath,
  },
]

export const MenuValues = {
  Home: MenuHomeValue,
  Game: MenuGamePath,
}

export const MenuPaths = {
  Home: MenuHomePath,
  Game: MenuGamePath,
  GameLogin: `${MenuGamePath}/login`,
}

export default Menu
