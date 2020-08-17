export default {
  methods: {
    renderJSONArrayToList(array = [], column = null) {
      let listText = ''
      let separator = ''
      if (array && Array.isArray(array) && array.length >= 1) {
        array.forEach((item) => {
          if(array.indexOf(item) < array.length - 1) {
            separator = ', '
          } else {
            separator = ''
          }
          if(column) {
            listText = `${listText} ${item[column] || item.name}${separator}`
            return
          }
          listText = `${listText} ${item}${separator}`
        })
      }
      return listText
    },

    renderJSONArrayToListWithTranslate(array = [], prefix = 'form.label') {
      let listText = ''
      let separator = ''
      if (array && Array.isArray(array) && array.length >= 1) {
        array.forEach((item) => {
          if(array.indexOf(item) < array.length - 1) {
            separator = ', '
          } else {
            separator = ''
          }
          const translate = this.$t(`${prefix}.${item}`)
          listText = `${listText} ${translate}${separator}`
        })
      }
      return listText
    },

    renderObjectArrayToTextList(objectArray = [], key) {
      let listText = ''
      let separator = ''
      if (objectArray && Array.isArray(objectArray) && objectArray.length >= 1) {
        objectArray.forEach((object) => {
          if(objectArray.indexOf(object) < objectArray.length - 1) {
            separator = ', '
          } else {
            separator = ''
          }
          listText = `${listText} ${object[key]}${separator}`
        })
      }
      return listText
    }
  }
}
