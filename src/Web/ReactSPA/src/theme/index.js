import { createMuiTheme } from '@material-ui/core/styles'
import { ptBR } from '@material-ui/core/locale'

import breakpoints from './breakpoints'
import palette from './palette'
import typography from './typography'

const theme = createMuiTheme(
  {
    breakpoints,
    palette,
    typography,
  },
  ptBR
)

export default theme
