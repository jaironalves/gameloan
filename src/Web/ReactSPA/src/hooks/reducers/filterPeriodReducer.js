import { filterPeriodActions as actions } from '../actions'

const filterPeriodReducer = (state, { type, payload } = {}) => {
  switch (type) {
    case actions.PERIOD:
      return { ...state, period: payload }
    case actions.START:
      return { ...state, periodStart: payload }
    case actions.END:
      return { ...state, periodEnd: payload }
    default:
      return state
  }
}

export default filterPeriodReducer
