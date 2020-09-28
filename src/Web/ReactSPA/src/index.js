import React from 'react'
import { render as ReactDOMRender } from 'react-dom'
import App from './App'

const PREVIEW =
  typeof process.env.DEPLOY_ENV === 'string' && process.env.DEPLOY_ENV !== 'production'

if (PREVIEW) {
  const enviroment = {
    NODE_ENV: process.env.NODE_ENV,
    DEPLOY_ENV: process.env.DEPLOY_ENV,
    API_BASE_URL: process.env.API_BASE_URL,
  }
  console.log('ENVIROMENT')
  console.log(enviroment)
}

ReactDOMRender(<App />, document.querySelector('[data-js="app"]'))

if (process.env.node_env === 'development' && module.hot) {
  module.hot.accept('./App.js', () => {
    const NextApp = require('./App.js').default
    ReactDOMRender(<NextApp />, document.querySelector('[data-js="app"]'))
  })
}
