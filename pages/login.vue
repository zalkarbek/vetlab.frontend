<template>
  <div
    class="media align-items-stretch justify-content-center ht-100p pos-relative"
  >
    <!--    LOGIN PANEL-->
    <v-login-panel
      @onLogin="login"
      container-class="col-sm-12 col-md-4 col-xs-12 col-lg-4 mg-lg-r-50 mg-xl-r-60"
    >
      <template v-slot:title>
        Южняя ветеринарная лаборатория<i class="fal fa-registered" />
      </template>
      <template v-slot:description>
        Авторизация
      </template>
    </v-login-panel>
    <!--    NEWS PANEL-->
    <v-news-panel />
  </div>
</template>
<script>
import LoginPanel from '~/components/LoginPanel.vue'
import NewsPanel from '~/components/NewsPanel.vue'

export default {
  middleware: ['isToken'],
  components: {
    'v-login-panel': LoginPanel,
    'v-news-panel': NewsPanel
  },
  layout: 'LoginLayout',
  mounted() {
    if (this.$route.query && this.$route.query.redirectType) {
      const redirectType = this.$route.query.redirectType
      if (redirectType === 'no-auth') {
        this.$toast.error(this.$i18n.t('error.pleaseRequireAuth') || '')
      }
    }
  },
  methods: {
    async login(payload) {
      const auth = this.$api.getApi('auth')
      let data = {}
      try {
        data = await auth.userAuth({
          email: payload.email,
          password: payload.password
        })
        if (!data.error && data.user) {
          this.$bvToast.toast(this.$i18n.t('success.auth') || '', {
            title: this.$i18n.t('success.title'),
            variant: 'success',
            solid: true,
            append: true
          })
          await this.$store.dispatch('login', {
            user: data.user,
            token: data.token
          })
          await this.$router.push(this.localePath({ name: 'index' }))
        } else {
          this.$bvToast.toast(this.$i18n.t('error.authWrong') || '', {
            title: this.$i18n.t('error.title'),
            variant: 'danger',
            solid: true,
            append: true
          })
        }
      } catch (e) {
        this.$bvToast.toast(e.message, {
          title: this.$i18n.t('error.title'),
          variant: 'danger',
          solid: true,
          append: true
        })
      }
    }
  }
}
</script>
