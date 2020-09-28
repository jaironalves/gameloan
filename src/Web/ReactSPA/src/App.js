import React from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseLine from '@material-ui/core/CssBaseline'
import { BrowserRouter } from 'react-router-dom'
import 'moment/locale/pt-br'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import Routes from './Routes'

import theme from './theme'

const App = () => (
  <MuiPickersUtilsProvider utils={MomentUtils}>
    <MuiThemeProvider theme={theme}>
      <CssBaseLine />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </MuiThemeProvider>
  </MuiPickersUtilsProvider>
)

export default App
