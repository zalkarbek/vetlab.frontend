export default async ({ app, store, redirect }) => {
  const token = store.state.token || localStorage.getItem('token')
  if (token) {
    app.$api.setToken(token)
    const authApi = app.$api.getApi('auth')
    try {
      const data = await authApi.getUserProfile()
      if (!data.error && data.user) {
        await store.dispatch('login', { user: data.user, token })
        redirect('/')
        return true
      }
    } catch (e) {
      await store.dispatch('logout')
      return false
    }
  }
  return false
}
