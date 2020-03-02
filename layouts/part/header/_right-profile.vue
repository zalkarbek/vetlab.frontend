<template>
  <b-dropdown
    menu-class="dropdown-menu-right"
    toggle-tag="a"
    size="sm"
    variant="link"
    toggle-class="text-decoration-none"
    no-caret
  >
    <template v-slot:button-content>
      <div class="avatar avatar-sm">
        <img
          src="@/static/img/user.svg"
          class="rounded-circle"
          alt=""
          width="32"
        />
      </div>
    </template>

    <b-dropdown-item>
      <div class="avatar avatar-lg mg-b-15">
        <img
          src="@/static/img/user.svg"
          class="rounded-circle"
          alt=""
          width="64"
        />
      </div>
      <h6 class="tx-semibold mg-b-5">{{ userName }}</h6>
      <p class="mg-b-25 tx-12 tx-color-03">{{ userRank }}</p>
    </b-dropdown-item>
    <b-dropdown-item href="#">{{ $t('profile.view') }}</b-dropdown-item>
    <b-dropdown-item href="#">{{ $t('help.helpCenter') }}</b-dropdown-item>
    <b-dropdown-divider />
    <b-dropdown-item @click="signOut">{{ $t('auth.signOut') }}</b-dropdown-item>
  </b-dropdown>
</template>
<script>
export default {
  computed: {
    userName() {
      return this.$store.getters.userName
    },
    userRank() {
      return 'Administrator'
    }
  },
  methods: {
    async signOut() {
      await this.$store.dispatch('logout')
      await this.$router.push(this.localePath({ name: 'login' }))
    }
  }
}
</script>
