import Axios from 'axios'

const createApi = (getToken) => {
  const api = Axios.create({
    baseURL: `${process.env.API_BASE_URL}`,
  })

  api.interceptors.request.use(async (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })
  return api
}

export { createApi }
