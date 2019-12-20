import Repository from '../api/_repository'

export default (context, inject) => {
  context.$axios.defaults.baseURL = context.env.baseUrl
  inject('http', Repository(context))

  context.$axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      context.redirect('/400')
    }
  })
}
