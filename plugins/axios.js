import api from '../api'

export default (context, inject) => {
  context.$axios.defaults.baseURL = context.env.baseUrl
  inject('api', api(context))

  context.$axios.onError((error) => {
    const response = Number(error.response && error.response.status)
    const code = Number(response)
    if (code === 400) {
      context.redirect('/400')
    }
  })
}
