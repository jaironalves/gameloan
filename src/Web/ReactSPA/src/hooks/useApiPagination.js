import { useState, useReducer, useEffect } from 'react'
import { dataFetchReducer } from './reducers'
import { createApi } from 'services'

const INITIAL = {
  page: 0,
  rows: 5,
}

const INITIAL_DATA = {
  rows: [],
  count: 0,
}

const INITIAL_STATE = {
  isLoading: false,
  error: undefined,
  data: INITIAL_DATA,
}

/**
 *
 * @param {Function} authGetToken
 * @param {string} apiGetPath
 */
const useApiPagination = (authGetToken, apiGetPath) => {
  const [pagination, setPagination] = useState(INITIAL)

  const [state, dispatch] = useReducer(dataFetchReducer, INITIAL_STATE)
  let didCancel = false

  const fetchData = async () => {
    dispatch({ type: 'INIT' })
    const api = createApi(authGetToken)
    try {
      const response = await api.get(
        `${apiGetPath}?page=${pagination.page}&rows=${pagination.rows}`
      )
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
  }, [JSON.stringify(pagination)])

  return {
    pagination,
    setPagination,
    isLoading: state.isLoading,
    rows: state.data.rows,
    count: state.data.count,
  }
}

export default useApiPagination
