<template>
  <div class="body">
    <app-header />

    <div class="content content-fixed">
      <nuxt />
    </div>

    <app-footer />
  </div>
</template>

<script>
import Header from '~/layouts/part/header.vue'
import Footer from '~/layouts/part/footer.vue'

export default {
  middleware: ['auth'],
  loading: true,
  components: {
    'app-header': Header,
    'app-footer': Footer,
  },

  mounted() {
    setTimeout(() => {
      this.$dashboard.navBarInit()
      this.$dashboard.navBarSearch()
      this.$dashboard.sidebarInit()
    }, 1000)
  },
  head() {
    return this.$nuxtI18nSeo()
  },
}
</script>
