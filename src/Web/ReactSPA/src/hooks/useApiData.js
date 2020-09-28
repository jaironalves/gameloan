import { useReducer, useEffect } from 'react'
import { dataFetchReducer } from './reducers'
import { createApi } from 'services'

const INITIAL_DATA = []

/**
 *
 * @param {Function} authGetToken
 * @param {string} apiGetPath
 */
const useApiData = (authGetToken, apiGetPath, initialData = INITIAL_DATA) => {
  const reducerInitialState = {
    isLoading: false,
    error: undefined,
    data: initialData,
  }
  const [state, dispatch] = useReducer(dataFetchReducer, reducerInitialState)
  let didCancel = false

  const fetchData = async () => {
    dispatch({ type: 'INIT' })
    const api = createApi(authGetToken)
    try {
      const response = await api.get(apiGetPath)
      if (!didCancel) {
        dispatch({ type: 'SUCCESS', payload: response.data })
      }
    } catch (error) {
      if (!didCancel) {
        dispatch({ type: 'FAILURE', payload: error })
        return
      }
    }
  }

  useEffect(() => {
    fetchData()
    return () => {
      didCancel = true
    }
  }, [])

  return {
    isLoading: state.isLoading,
    data: state.data,
  }
}

export default useApiData
