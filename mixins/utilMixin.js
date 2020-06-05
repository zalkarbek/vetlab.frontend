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

    cloneDeep(object) {
      return _.cloneDeep(object)
    },

    toLowerCase(value) {
      return _.toLower(value)
    },

    toUpperCase(value) {
      return _.toUpper(value)
    },

    has(object, property) {
      return _.has(object, property)
    },

    isObject(prop) {
      return _.isObject(prop)
    }
  },
}
