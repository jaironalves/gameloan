import Axios from 'axios'

class BaseService {
  createApi = () =>
    Axios.create({
      baseURL: `${process.env.API_BASE_URL}`,
    })

  post = (url, data, config) => {
    const api = this.createApi()
    return api.post(url, data, config)
  }

  get = (url, config) => {
    const api = this.createApi()
    return api.get(url, config)
  }
}

export default BaseService
