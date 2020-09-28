import { loginActions as actions } from '../actions'

const loginReducer = (state, { type, payload } = {}) => {
  switch (type) {
    case actions.LOGIN:
      return { ...state, login: payload, error: '' }
    case actions.PASSWORD:
      return { ...state, password: payload, error: '' }
    case actions.ERROR:
      return { ...state, error: payload }
    default:
      return state
  }
}

export default loginReducer
