import * as types from '~/store/types'

export default {
  setMenuToRoleFilter({ state, commit }, { user }) {
    const userRoles = user.roles || []
    commit(types.SET_MENUS_FILTER, { userRoles })
  },
}
