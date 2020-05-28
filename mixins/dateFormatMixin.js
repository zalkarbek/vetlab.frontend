import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      currentLocale: (state) => state.currentLocale,
      dateFormats: (state) => state.dateFormats,
      dateSwitchLocales: (state) => state.dateSwitchLocales,
    }),
  },
  methods: {
    formatDate(date) {
      const dateLocale = this.dateSwitchLocales[this.currentLocale]
      return this.$moment(date)
        .locale(dateLocale)
        .format(this.dateFormats.mediumDateFormat)
    },

    formatTime(date) {
      const dateLocale = this.dateSwitchLocales[this.currentLocale]
      return this.$moment(date)
        .locale(dateLocale)
        .format(this.dateFormats.mediumTimeFormat)
    },

    formatDateTime(date) {
      const dateLocale = this.dateSwitchLocales[this.currentLocale]
      return this.$moment(date)
        .locale(dateLocale)
        .format(this.dateFormats.mediumDateTimeFormat)
    },
  }
}
