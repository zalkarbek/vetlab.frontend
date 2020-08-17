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

    toCapitalize(value) {
      return _.toCapitalize(value)
    },

    has(object, property) {
      return _.has(object, property)
    },

    isObject(prop) {
      return _.isObject(prop)
    },

    notIn(item, arr = [], itemKey, arrayKey) {
      if(!arr || arr.length === 0)
        return true

      const queryItem = itemKey ? item[itemKey] : item
      return !arr.find((arrItem) => {
        const currentItem = arrayKey ? arrItem[arrayKey] : arrItem
        return queryItem === currentItem
      })
    },

    range(start, end, step) {
      const range = []
      const typeofStart = typeof start
      const typeofEnd = typeof end

      if (step === 0) {
        throw TypeError('Step cannot be zero.');
      }

      if (typeofStart === 'undefined' || typeofEnd === 'undefined') {
        throw TypeError('Must pass start and end arguments.');
      } else if (typeofStart !== typeofEnd) {
        throw TypeError('Start and end arguments must be of same type.');
      }

      typeof step == 'undefined' && (step = 1);

      if (end < start) {
        step = -step;
      }

      if (typeofStart === 'number') {

        while (step > 0 ? end >= start : end <= start) {
          range.push(start);
          start += step;
        }

      } else if (typeofStart === 'string') {

        if (start.length !== 1 || end.length !== 1) {
          throw TypeError('Only strings with one character are supported.');
        }

        start = start.charCodeAt(0);
        end = end.charCodeAt(0);

        while (step > 0 ? end >= start : end <= start) {
          range.push(String.fromCharCode(start));
          start += step;
        }

      } else {
        throw TypeError('Only string and number types are supported');
      }

      return range;
    }
  },
}
