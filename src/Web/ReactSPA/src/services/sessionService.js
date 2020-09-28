import BaseService from './baseService'
import decode from 'jwt-decode'

/**
 * Session Service Class
 */
class SessionService extends BaseService {
  constructor() {
    super()
    this.TOKEN_KEY = `@app-auth-token`
    this.USER_KEY = `@app-auth-user`
    this.BASE_PATH = '/session'
  }

  authenticate = (data) => this.post(`${this.BASE_PATH}/authenticate`, data)

  getToken = () => localStorage.getItem(this.TOKEN_KEY)

  isAuthenticated = () => {
    try {
      const token = localStorage.getItem(this.TOKEN_KEY)
      const jwt = decode(token)
      var current_time = Date.now() / 1000
      if (jwt.exp < current_time) {
        /* expired */
        this.logout(() => {})
        return false
      }
      return true
    } catch (error) {
      return false
    }
  }

  /**
   * @callback authCallback
   * @returns {void}
   */

  /**
   * Login
   * @param {Object} authResponse - The response object
   * @param {string} authResponse.token - The token
   * @param {Object} authResponse.user - The token
   * @param {authCallback} callback - The callback executed after sucess
   */
  login = (authResponse, callback) => {
    const { token, user } = authResponse
    localStorage.setItem(this.TOKEN_KEY, token)
    localStorage.setItem(this.USER_KEY, user)
    if (callback) callback()
  }

  /**
   * Logout
   * @param {authCallback} callback - The callback executed after sucess
   */
  logout = (callback) => {
    localStorage.removeItem(this.TOKEN_KEY)
    localStorage.removeItem(this.USER_KEY)
    callback()
  }
}

export { SessionService }
