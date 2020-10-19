import * as types from '~/store/types'

export default {
  initCurrentLocale({ commit, state }) {
    let locale = localStorage.getItem('currentLocale')
    if (
      Array.isArray(state.supportedLocales) &&
      !state.supportedLocales.find((element) => element === locale)
    ) {
      locale = state.defaultLocale
      localStorage.setItem('currentLocale', locale)
    }
    commit(types.SET_CURRENT_LOCALE, { locale })
  },

  setCurrentLocale({ commit }, { locale }) {
    localStorage.setItem('currentLocale', locale)
    commit(types.SET_CURRENT_LOCALE, { locale })
  },

  openSocketConnection({ commit }, { socks, token }) {
    commit(types.SET_SOCKS, { socks })
    // Открываем Socket соединение
    this.$io.open({
      namespace: socks.NAMESPACES.AUTHORIZED,
      context: this.app.context,
      socks,
      options: {
        transports: ['websocket'],
        rejectUnauthorized: false,
        query: {
          token,
        },
      },
    })
  },

  async login({ commit, dispatch }, payload) {
    commit(types.SET_USER_LOGGED, { user: payload.user, token: payload.token })
    this.$api.setToken(payload.token, 'Bearer', [
      'get',
      'post',
      'put',
      'patch',
      'delete',
    ])
    localStorage.setItem('token', payload.token)
    const socks = await this.$api.getApi('option').getSocks()
    dispatch('openSocketConnection', { socks, token: payload.token })
    dispatch('dash/setMenuToRoleFilter', { user: payload.user })
  },
  logout({ commit }) {
    commit(types.SET_USER_LOGOUT)
    this.$io.closeAll()
    localStorage.removeItem('token')
  },

  authenticate({ commit }, payload) {},
}
