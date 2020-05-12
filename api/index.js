import AuthApi from './auth'
import OtdelApi from './otdel'

class Api {
  constructor(context) {
    this.context = context
    this.apiServices = {
      auth: AuthApi(context),
      otdel: OtdelApi(context)
    }
  }

  req(req, { params, data }) {
    return this.context.$axios({
      method: req.method,
      url: req.url,
      params,
      data
    })
  }

  get(url, params) {
    return this.context.$axios.$get(url, { params })
  }

  put(url, params) {
    return this.context.$axios.$put(url, params)
  }

  post(url, params) {
    return this.context.$axios.$post(url, params)
  }

  delete(url, params) {
    return this.context.$axios.$delete(url, { params })
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
