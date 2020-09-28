import { useReducer, useEffect } from 'react'
import { apiStateReducer } from './reducers'
import { createApi } from 'services'

const INITIAL_DATA = []

/**
 *
 * @param {Function} authGetToken
 * @param {string} apiGetPath
 */
const useApiDataV2 = (authGetToken, apiGetPath, initialData = INITIAL_DATA) => {
  const reducerInitialState = {
    isLoading: false,
    data: initialData,
    fetchData: -1,
    params: undefined,
    error: undefined,
  }

  const [apiState, dispatch] = useReducer(apiStateReducer, reducerInitialState)

  let didCancel = false

  const fetchData = async () => {
    dispatch({ type: 'INIT' })
    try {
      const api = createApi(authGetToken)
      const response = await api.get(apiGetPath, { params: apiState.params })
      if (!didCancel) {
        dispatch({ type: 'DATA', payload: response.data })
      }
    } catch (error) {
      console.log(error)
      if (!didCancel) {
        dispatch({ type: 'FAILURE', payload: error })
      }
    }
  }

  useEffect(() => {
    if (apiState.fetchData <= 0) return
    fetchData()
    return () => {
      didCancel = true
    }
  }, [apiState.fetchData])

  return {
    isLoading: apiState.isLoading,
    data: apiState.data,
    dispatch,
  }
}

export default useApiDataV2
