export default {
  props: {
    crud: {
      type: Object,
      default: () => {}
    },
    crudDataName: {
      type: String,
      default: () => ''
    }
  },
  computed: {
    crudData() {
      return this.crud[this.crudDataName]
    },
    restName() {
      return this.crudData.restName || ''
    }
  },
  data() {
    return {
      selectedRecord: {},
      records: []
    }
  },
  mounted() {
    this.getRecords()
  },
  methods: {
    async onCreate(data) {
      try {
        const res = await this.$store.dispatch('api/req', {
          req: this.crudData.rest.create,
          data
        })
        const message = (res.data && res.data.message) || ''

        this.$bvToast.toast(message, {
          title: this.$i18n.t('success.title'),
          variant: 'success',
          solid: true,
          append: true
        })
      } catch (e) {
        const message =
          (e.response.data && e.response.data.message) || e.message
        this.$bvToast.toast(message, {
          title: this.$i18n.t('error.title'),
          variant: 'danger',
          solid: true,
          append: true
        })
      }
    },
    async onUpdate(data) {
      try {
        const res = await this.$store.dispatch('api/req', {
          req: this.crudData.rest.update,
          data
        })
        const message = (res.data && res.data.message) || ''
        if (!res.data.error) {
          this.clearForm()
        }
        this.$bvToast.toast(message, {
          title: this.$i18n.t('success.title'),
          variant: 'info',
          solid: true,
          append: true
        })
      } catch (e) {
        const message =
          (e.response.data && e.response.data.message) || e.message
        this.$bvToast.toast(message, {
          title: this.$i18n.t('error.title'),
          variant: 'danger',
          solid: true,
          append: true
        })
      }
    },
    async onDestroy(data) {
      try {
        const res = await this.$store.dispatch('api/req', {
          req: this.crudData.rest.destroy,
          data
        })
        const message = (res.data && res.data.message) || ''
        this.$bvToast.toast(message, {
          title: this.$i18n.t('success.title'),
          variant: 'info',
          solid: true,
          append: true
        })
      } catch (e) {
        const message =
          (e.response.data && e.response.data.message) || e.message
        this.$bvToast.toast(message, {
          title: this.$i18n.t('error.title'),
          variant: 'danger',
          solid: true,
          append: true
        })
      }
    },
    clearForm() {
      this.selectedRecord = {}
    },
    onEditSelect(data) {
      this.selectedRecord = data
    },

    async getRecords() {
      const { data } = await this.$store.dispatch('api/req', {
        req: this.crudData.rest.all
      })
      this.records = [...data]
    }
  }
}
