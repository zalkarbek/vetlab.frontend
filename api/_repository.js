import AuthApi from './authApi'

class Api {
  constructor(context) {
    this.context = context
    this.apiServices = {
      auth: AuthApi(context)
    }
  }

  getService(name) {
    return this.apiServices[name]
  }

  setHeader(name, value, scopes = []) {
    this.context.$axios.setHeader(name, value, scopes)
  }

  setToken(token, type, scopes = []) {
    this.context.$axios.setToken(token, type, scopes)
  }
}

export default (context) => {
  return new Api(context)
}
