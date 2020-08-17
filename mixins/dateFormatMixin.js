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
    // ======================== SHORT FORMAT ============================//
    formatDateShort(date) {
      const dateLocale = this.dateSwitchLocales[this.currentLocale]
      return this.$moment(date)
        .locale(dateLocale)
        .format(this.dateFormats.shortDateFormat)
    },

    formatTimeShort(date) {
      const dateLocale = this.dateSwitchLocales[this.currentLocale]
      return this.$moment(date)
        .locale(dateLocale)
        .format(this.dateFormats.shortTimeFormat)
    },

    formatDateTimeShort(date) {
      const dateLocale = this.dateSwitchLocales[this.currentLocale]
      return this.$moment(date)
        .locale(dateLocale)
        .format(this.dateFormats.shortDateTimeFormat)
    },
    // ======================== BASE FORMAT ============================//

    formatDateBase(date) {
      const dateLocale = this.dateSwitchLocales[this.currentLocale]
      return this.$moment(date)
        .locale(dateLocale)
        .format(this.dateFormats.baseDateFormat)
    },

    formatTimeBase(date) {
      const dateLocale = this.dateSwitchLocales[this.currentLocale]
      return this.$moment(date)
        .locale(dateLocale)
        .format(this.dateFormats.baseTimeFormat)
    },

    formatDateTimeBase(date) {
      const dateLocale = this.dateSwitchLocales[this.currentLocale]
      return this.$moment(date)
        .locale(dateLocale)
        .format(this.dateFormats.baseDateTimeFormat)
    },

    // ======================== LONG FORMAT ============================//
    formatDateLong(date) {
      const dateLocale = this.dateSwitchLocales[this.currentLocale]
      return this.$moment(date)
        .locale(dateLocale)
        .format(this.dateFormats.longDateFormat)
    },

    formatTimeLong(date) {
      const dateLocale = this.dateSwitchLocales[this.currentLocale]
      return this.$moment(date)
        .locale(dateLocale)
        .format(this.dateFormats.longTimeFormat)
    },

    formatDateTimeLong(date) {
      const dateLocale = this.dateSwitchLocales[this.currentLocale]
      return this.$moment(date)
        .locale(dateLocale)
        .format(this.dateFormats.longDateTimeFormat)
    },

    // ======================== MEDIUM FORMAT ============================//
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
