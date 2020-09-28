const apiRequestReducer = (state, { type, payload } = {}) => {
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

export default apiRequestReducer
