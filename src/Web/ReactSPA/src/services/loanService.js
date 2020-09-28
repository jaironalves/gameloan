import BaseService from './baseService'
import { SessionService } from './sessionService'

class LoanService extends BaseService {
  constructor() {
    super()
    this.session = new SessionService()
  }

  headerAuthorization = () => ({ Authorization: `Bearer ${this.session.getToken()}` })

  registerAuthorization = async (client_id, amount, password) => {
    const api = this.createApi()
    return api.post(
      '/partner/authorization',
      { client_id, amount, password },
      { headers: { ...this.headerAuthorization() } }
    )
  }

  registerAuthorizationSponsorship = async (sponsorship_number, amount) => {
    const api = this.createApi()
    return api.post(
      '/partner/authorization',
      { sponsorship_number, amount },
      { headers: { ...this.headerAuthorization() } }
    )
  }

  cancelAuthorization = async (authorization_id) => {
    const api = this.createApi()
    return api.delete('/partner/authorization', {
      headers: { ...this.headerAuthorization() },
      data: { authorization_id },
    })
  }

  listAuthorization = async (params) => {
    const api = this.createApi()
    return api.get('/partner/authorization', {
      headers: { ...this.headerAuthorization() },
      params,
    })
  }

  listInvoices = async (params) => {
    const api = this.createApi()
    return api.get('/partner/invoice', { params, headers: { ...this.headerAuthorization() } })
  }

  listClients = async (params) => {
    const api = this.createApi()
    return api.get('/partner/client', { params, headers: { ...this.headerAuthorization() } })
  }
}

export default LoanService
