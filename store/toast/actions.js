export default {
  toast(ctx, { message, title, options }) {
    const ttl = title || 'success.title'
    const msg = message || 'success.message'
    const opts = {
      variant: 'default',
      solid: true,
      append: true,
      ...options,
    }
    this._vm.$bvToast.toast(msg, {
      title: this.$i18n.t(ttl),
      ...opts,
    })
  },

  toastPrimary({ dispatch }, { message, title, options }) {
    const opts = {
      variant: 'primary',
      ...options,
    }
    dispatch('toast', { message, title, options: opts })
  },

  toastSecond({ dispatch }, { message, title, options }) {
    const opts = {
      variant: 'secondary',
      ...options,
    }
    dispatch('toast', { message, title, options: opts })
  },

  toastDanger({ dispatch }, { message, title, options }) {
    const ttl = title || 'error.title'
    const msg = message || 'error.message'
    const opts = {
      variant: 'danger',
      ...options,
    }
    dispatch('toast', { message: msg, title: ttl, options: opts })
  },

  toastWarning({ dispatch }, { message, title, options }) {
    const ttl = title || 'warning.title'
    const msg = message || 'warning.message'
    const opts = {
      variant: 'warning',
      ...options,
    }
    dispatch('toast', { message: msg, title: ttl, options: opts })
  },

  toastSuccess({ dispatch }, { message, title, options }) {
    const ttl = title || 'success.title'
    const msg = message || 'success.message'
    const opts = {
      variant: 'success',
      ...options,
    }
    dispatch('toast', { message: msg, title: ttl, options: opts })
  },

  toastInfo({ dispatch }, { message, title, options }) {
    const opts = {
      variant: 'info',
      ...options,
    }
    dispatch('toast', { message, title, options: opts })
  },
}
