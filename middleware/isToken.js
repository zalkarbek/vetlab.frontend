export default async ({ app, store, redirect }) => {
  const token = store.state.token || localStorage.getItem('token')
  if (token) {
    app.$api.setToken(token)
    const authApi = app.$api.getApi('auth')

    authApi
      .getUserProfile()
      .then(async ({ data }) => {
        if (!data.error && data.user) {
          await store.dispatch('login', { user: data.user, token })
          return redirect('/index')
        }
      })
      .catch(() => false)
  }
  await store.dispatch('logout')
  return false
}
