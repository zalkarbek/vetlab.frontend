<template>
  <ul class="nav navbar-menu">
    <li class="nav-label pd-l-20 pd-lg-l-25 d-lg-none">Навигация</li>

    <li
      v-for="(menu, index) in menus"
      :key="index + 1"
      :class="{ 'with-sub': menu.children }"
      class="nav-item"
    >
      <nuxt-link
        v-if="menu.type === 'single' || !menu.children"
        :to="localePath({ path: menu.to })"
        class="nav-link"
      >
        <i :class="menu.icon" class="mg-r-4" /> {{ $t(menu._t) }}
      </nuxt-link>

      <a v-else href="#" class="nav-link">
        <i :class="menu.icon" class="mg-r-4" /> {{ $t(menu._t) }}
      </a>

      <template v-if="menu.type === 'children' && menu.children">
        <ul class="navbar-menu-sub">
          <li
            v-for="(childMenu, childIndex) in menu.children"
            :key="index + childIndex + 200"
            class="nav-sub-item"
          >
            <nuxt-link
              :to="localePath({ path: childMenu.to })"
              class="nav-sub-link"
            >
              <i :class="childMenu.icon" class="mg-r-4" />
              {{ $t(childMenu._t) }}
            </nuxt-link>
          </li>
        </ul>
      </template>

      <template v-else-if="menu.type === 'flex' && menu.children">
        <div class="navbar-menu-sub">
          <div class="d-lg-flex">
            <ul
              v-for="(childMenu, childIndex) in menu.children"
              :key="index + childIndex + 300"
              :class="childMenu.class"
            >
              <template v-for="(flexMenu, flexIndex) in childMenu.flex">
                <li
                  :key="flexIndex + childIndex + 400"
                  :class="flexMenu.class"
                  class="nav-label"
                >
                  {{ $t(flexMenu._t) }}
                </li>
                <li
                  v-for="flexItems in flexMenu.items"
                  :class="flexItems.class"
                >
                  <nuxt-link
                    :to="localePath({ path: flexItems.to })"
                    class="nav-sub-link"
                  >
                    <i :class="flexItems.icon" class="mg-r-4" />
                    {{ $t(flexItems._t) }}
                  </nuxt-link>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </template>
    </li>
  </ul>
</template>
<script>
export default {
  computed: {
    menus() {
      return this.$store.getters['dash/menuItems']
    }
  },

  methods: {
    go(link) {
      this.$router.push(link)
    }
  }
}
</script>
