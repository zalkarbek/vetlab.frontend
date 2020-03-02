<template>
  <div class="nuxt-error">
    <error-403 v-if="statusCode === 403" :error="error" />
    <error-404 v-else-if="statusCode === 404" :error="error" />
    <error-500 v-else :error="error" />
  </div>
</template>
<script>
import error403 from '~/components/error/403.vue'
import error404 from '~/components/error/404.vue'
import error500 from '~/components/error/500.vue'

export default {
  layout: 'ErrorLayout',
  head() {
    return {
      title: this.message,
      meta: [
        {
          name: 'viewport',
          content:
            'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
        }
      ]
    }
  },
  components: {
    error404,
    error403,
    error500
  },
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    statusCode() {
      return Number((this.error && this.error.statusCode) || 500)
    },
    message() {
      return this.error.message
    }
  }
}
</script>
