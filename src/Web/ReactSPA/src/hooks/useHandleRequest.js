import { useReducer, useState, useCallback, useEffect } from 'react'

const handleRequestReducer = (state, { type, payload } = {}) => {
  switch (type) {
    case 'FETCH':
      return { ...state, status: 'FETCH' }
    case 'SUCCESS':
      return { ...state, status: 'SUCCESS', payload }
    case 'ERROR':
      return { ...state, status: 'ERROR', payload }
    default:
      return state
  }
}

const INITIAL_STATE = {
  status: undefined,
  payload: undefined,
}

const useHandleRequest = (
  onHandleRequestAsync,
  initialStateParams = {},
  initialState = INITIAL_STATE
) => {
  const [state, dispatch] = useReducer(handleRequestReducer, initialState)
  const [requestParams, setRequestParams] = useState(initialStateParams)

  const onHandleRequestAsyncCallBack = useCallback(
    async (params) => onHandleRequestAsync(params),
    []
  )

  useEffect(() => {
    let didCancel = false
    const fetchData = async () => {
      !didCancel && dispatch({ type: 'FETCH' })
      try {
        const response = await onHandleRequestAsyncCallBack(requestParams)
        !didCancel && dispatch({ type: 'SUCCESS', payload: response })
      } catch (error) {
        console.log(error)
        !didCancel && dispatch({ type: 'ERROR', payload: error })
      }
    }
    if (requestParams) fetchData()
    return () => {
      didCancel = true
    }
  }, [requestParams])

  return [state, requestParams, setRequestParams]
}

export default useHandleRequest
