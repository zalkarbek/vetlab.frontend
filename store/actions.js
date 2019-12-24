import * as types from '~/store/types'

export default {
  initLocaleConfig({ commit, state }, { locale }) {
    commit(types.SET_CURRENT_LOCALE, { locale })
  },

  initCurrentLocale({ commit, state }) {
    let locale = localStorage.getItem('currentLocale')
    if (
      Array.isArray(state.supportedLocales) &&
      !state.supportedLocales.find((element) => element === locale)
    ) {
      locale = state.defaultLocale
      localStorage.setItem('currentLocale', locale)
    }
    this.$i18n.locale = locale
    commit(types.SET_CURRENT_LOCALE, { locale })
  },

  setCurrentLocale({ commit }, { locale }) {
    localStorage.setItem('currentLocale', locale)
    commit(types.SET_CURRENT_LOCALE, { locale })
    this.$i18n.locale = locale
  },

  login({ commit }, payload) {
    commit(types.SET_USER_LOGGED, { user: payload.user, token: payload.token })
    this.$http.setToken(payload.token, 'Bearer', [
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
