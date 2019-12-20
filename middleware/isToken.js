export default async ({ app, store, redirect }) => {
  const token = store.state.token
  if (token) {
    const authService = app.$http.getService('auth')
    authService.getUserProfile().then(async ({ data }) => {
      if (!data.error && data.user) {
        await store.dispatch('login', { user: data.user, token })
        return true
      }
    })
  }
  await store.dispatch('logout')
  return true
}
