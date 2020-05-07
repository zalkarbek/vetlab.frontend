export default {
  methods: {
    toast(msg, ttl, opt) {
      const title = ttl || 'success.title'
      const message = msg || 'success.message'
      const options = {
        variant: 'default',
        solid: true,
        append: true,
        ...opt
      }
      this.$bvToast.toast(message, {
        title: this.$i18n.t(title),
        ...options
      })
    },
    toastPrimary(msg, ttl, opt) {
      const options = {
        variant: 'primary',
        ...opt
      }
      this.toast(msg, ttl, options)
    },
    toastSecond(msg, ttl, opt) {
      const options = {
        variant: 'secondary',
        ...opt
      }
      this.toast(msg, ttl, options)
    },
    toastDanger(msg, ttl, opt) {
      const title = ttl || 'error.title'
      const message = msg || 'error.message'
      const options = {
        variant: 'danger',
        ...opt
      }
      this.toast(message, title, options)
    },
    toastWarning(msg, ttl, opt) {
      const title = ttl || 'warning.title'
      const message = msg || 'warning.message'
      const options = {
        variant: 'warning',
        ...opt
      }
      this.toast(message, title, options)
    },
    toastSuccess(msg, ttl, opt) {
      const title = ttl || 'success.title'
      const message = msg || 'success.message'
      const options = {
        variant: 'success',
        ...opt
      }
      this.toast(message, title, options)
    },
    toastInfo(msg, ttl, opt) {
      const options = {
        variant: 'info',
        ...opt
      }
      this.toast(msg, ttl, options)
    }
  }
}
