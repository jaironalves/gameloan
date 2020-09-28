const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'INIT':
      return { ...state, isLoading: true, error: undefined }
    case 'SUCCESS':
      return { ...state, isLoading: false, error: undefined, data: action.payload }
    case 'FAILURE':
      return { ...state, isLoading: false, error: action.payload }
    default:
      throw new Error()
  }
}

export default dataFetchReducer
