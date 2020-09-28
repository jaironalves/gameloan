import { useReducer, useCallback } from 'react'
import { apiRequestReducer } from './reducers'
import { createApi } from 'services'

const initialState = {
  status: null,
  payload: null,
}

const useApiRequest = (authGetToken, endPoint, { verb = 'get', params = {} } = {}) => {
  const [state, dispatch] = useReducer(apiRequestReducer, initialState)

  const makeRequest = useCallback(async () => {
    dispatch({ type: 'FETCH' })
    try {
      const api = createApi(authGetToken)
      const response = await api[verb](endPoint, { params })
      dispatch({ type: 'SUCCESS', payload: response })
    } catch (error) {
      console.log(error)
      dispatch({ type: 'ERROR', payload: error })
    }
  }, [endPoint, verb, params])

  return [state, makeRequest]
}

const useApiRequestCallback = (onHandleRequestAsync, requestParams = {}) => {
  const [state, dispatch] = useReducer(apiRequestReducer, initialState)

  const makeRequest = useCallback(async () => {
    dispatch({ type: 'FETCH' })
    try {
      const response = await onHandleRequestAsync(requestParams)
      dispatch({ type: 'SUCCESS', payload: response })
    } catch (error) {
      console.log(error)
      dispatch({ type: 'ERROR', payload: error })
    }
  }, [onHandleRequestAsync, requestParams])

  return [state, makeRequest]
}

export default useApiRequest
export { useApiRequestCallback }
