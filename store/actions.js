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

  login({ commit }, payload) {
    commit(types.SET_USER_LOGGED, { user: payload.user, token: payload.token })
    this.$api.setToken(payload.token, 'Bearer', [
      'post',
      'put',
      'patch',
      'delete'
    ])
    localStorage.setItem('token', payload.token)
  },
  logout({ commit }) {
    commit(types.SET_USER_LOGOUT)
    this.$io.closeAll()
    localStorage.removeItem('token')
  }
}
