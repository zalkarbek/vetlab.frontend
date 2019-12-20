export default async ({ app, store, redirect }) => {
  const token = store.state.token
  if (!token) {
    await store.dispatch('logout')
    return redirect('/login', { redirectType: 'no-auth' })
  }
  if (token && !store.state.logged) {
    const authService = app.$http.getService('auth')
    authService
      .getUserProfile()
      .then(async ({ data }) => {
        if (!data.error && data.user) {
          await store.dispatch('login', { user: data.user, token })
          return true
        }
        await store.dispatch('logout')
        return redirect('/login')
      })
      .catch(() => redirect('/login', { redirectType: 'server-error' }))
  }
  return true
}
