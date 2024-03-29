import {
  SET_CURRENT_LOCALE,
  SET_USER_LOGGED,
  SET_USER_LOGOUT,
  SET_SOCKS,
} from '~/store/types'

export default {
  [SET_CURRENT_LOCALE](state, { locale }) {
    state.currentLocale = locale
  },
  [SET_USER_LOGGED](state, { user, token }) {
    state.user = user
    state.token = token
    state.logged = true
  },
  [SET_USER_LOGOUT](state) {
    state.user = {}
    state.token = null
    state.logged = false
  },
  [SET_SOCKS](state, { socks }) {
    state.socks = socks
  },
}
