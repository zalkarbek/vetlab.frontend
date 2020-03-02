import AuthApi from './auth'

class Api {
  constructor(context) {
    this.context = context
    this.apiServices = {
      auth: AuthApi(context)
    }
  }

  getApi(name) {
    return this.apiServices[name]
  }

  setHeader(name, value, scopes = []) {
    this.context.$axios.setHeader(name, value, scopes)
  }

  setToken(
    token,
    type = 'Bearer',
    scopes = ['get', 'post', 'put', 'patch', 'delete']
  ) {
    this.context.$axios.setToken(token, type, scopes)
  }
}

export default (context) => {
  return new Api(context)
}
