import { useReducer } from 'react'
import { loginReducer } from './reducers'

const DEFAULT_STATE = {
  login: '',
  senha: '',
  error: '',
  logging: false,
}

const DEFAULT_REDUCER = loginReducer

export default (reducer = DEFAULT_REDUCER, state = DEFAULT_STATE) => useReducer(reducer, state)
