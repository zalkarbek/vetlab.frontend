export default {
  methods: {
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

    renderObjectArrayToTextList(objectArray = [], key) {
      let listText = ''
      if (objectArray && Array.isArray(objectArray) && objectArray.length >= 1) {
        objectArray.forEach((object) => {
          listText = `${listText} ${object[key]}`
        })
      }
      return listText
    }
  }
}
