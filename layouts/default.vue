<template>
  <div class="body">
    <app-header />

    <div class="content content-fixed">
      <app-breadcump />
      <div class="container pd-x-0 pd-lg-x-10 pd-xl-x-0">
        <nuxt />
      </div>
    </div>

    <app-footer />
  </div>
</template>

<script>
import Header from '~/layouts/part/header.vue'
import Footer from '~/layouts/part/footer.vue'
import Breadcump from '~/layouts/part/breadcump.vue'

export default {
  components: {
    'app-header': Header,
    'app-footer': Footer,
    'app-breadcump': Breadcump
  },

  mounted() {
    setTimeout(() => {
      this.$dashboard.navBarInit()
      this.$dashboard.navBarSearch()
      this.$dashboard.sidebarInit()
    }, 1000)
  }
}
</script>
