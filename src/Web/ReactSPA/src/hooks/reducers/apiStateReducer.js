const apiStateReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH':
      return {
        ...state,
        params: action.payload,
        fetchData: state.fetchData === -1 ? 1 : state.fetchData + 1,
      }
    case 'INIT':
      return {
        ...state,
        isLoading: true,
        error: undefined,
      }
    case 'DATA':
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        fetchData: 0,
        params: undefined,
        error: undefined,
      }
    case 'FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    default:
      throw new Error()
  }
}

export default apiStateReducer
