import { useReducer } from 'react'
import { filterPeriodReducer } from './reducers'
import moment from 'moment'

const periodIntervalDefault = '15'

const DEFAULT_STATE = {
  period: periodIntervalDefault,
  periodStart: moment().startOf('day').subtract(15, 'day').toDate(),
  periodEnd: new Date(),
}

const DEFAULT_REDUCER = filterPeriodReducer

export default (reducer = DEFAULT_REDUCER, state = DEFAULT_STATE) => useReducer(reducer, state)
