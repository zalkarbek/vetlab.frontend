import lodash from 'lodash'
import {
  SET_MENUS_FILTER
} from '~/store/types'

export default {
  [SET_MENUS_FILTER](state, { userRoles }) {
    state.menus = state.menus.filter((menu) => {

      /**
       * FLEX MENU FILTER
       */
      if(menu.type === 'flex' && menu.children && menu.children.length >= 1) {
        menu.children.forEach((flexMenu) => {
          if(flexMenu && Array.isArray(flexMenu.flex) && flexMenu.flex.length >= 1) {
            flexMenu.flex.forEach((inFlexMenu) => {
              if (inFlexMenu && Array.isArray(inFlexMenu.items) && inFlexMenu.items.length >= 1) {
                inFlexMenu.items = inFlexMenu.items.filter((inFlexMenuItem) => {
                  return userRoles.find((userRole) => {
                    if(inFlexMenuItem && !inFlexMenuItem.roles) {
                      return true
                    }
                    return inFlexMenuItem.roles.find((menuRole) => {
                      return lodash.toLower(userRole.role_key) === lodash.toLower(menuRole)
                    })
                  })
                })
              }
            })
          }
        })
      }

      /**
       * CHILDREN MENU FILTER
       */
      if(menu.type === 'children' && menu.children && menu.children.length >= 1) {
        menu.children = menu.children.filter((childMenu) => {
          return userRoles.find((userRole) => {
            if(childMenu && !childMenu.roles) {
              return true
            }
            return childMenu.roles.find((menuRole) => {
              return lodash.toLower(userRole.role_key) === lodash.toLower(menuRole)
            })
          })
        })
      }

      /**
       * BASE MENU FILTER
       */
      if(menu && !menu.roles) {
        return true
      }
      if(menu && menu.roles && Array.isArray(menu.roles)) {
        return userRoles.find((userRole) => {
          return menu.roles.find((menuRole) => {
            return lodash.toLower(userRole.role_key) === lodash.toLower(menuRole)
          })
        })
      }
      return false
    })
  },
}
