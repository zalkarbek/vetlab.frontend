import _ from 'lodash'
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
    firstLetter(text) {
      return this.$firstLetter(text)
    },

    getObjectIfNull(object) {
      return object || {}
    },

    getProp(object, path, defaultValue = '') {
      return _.get(object, path, defaultValue)
    },

    checkIcon(condition) {},

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

    renderJSONArrayToList(array = []) {
      let listText = ''
      if (array && Array.isArray(array) && array.length >= 1) {
        array.forEach((item) => {
          listText = `${listText} ${item}`
        })
      }
      return listText
    },

    renderJSONArrayToListWithTranslate(array = [], prefix = 'form.label') {
      let listText = ''
      if (array && Array.isArray(array) && array.length >= 1) {
        array.forEach((item) => {
          const translate = this.$t(`${prefix}.${item}`)
          listText = `${listText} ${translate}`
        })
      }
      return listText
    },

    toLowerCase(value) {
      return _.toLower(value)
    },

    toUpperCase(value) {
      return _.toUpper(value)
    },

  },
}
