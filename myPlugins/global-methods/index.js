import _ from 'lodash'
export default {
  toLowerCase(text) {
    return _.toLower(text)
  },
  firstLetter(text = '') {
    return (text && text[0]) || ''
  },
  lastLetter(text = '') {
    return (text && text[text.length - 1]) || ''
  },
  randomInt(length = 10) {
    return Math.round(Math.random() * length)
  },
  filterArrayItems(needle, heystack) {
    const query = _.toLower(needle)
    return heystack.filter((item) => _.toLower(item).includes(query))
  },
  filterObjectArray(needle, key, heystack) {
    const query = _.toLower(needle)
    let columns = []
    if (key && Array.isArray(key)) {
      columns = [...key]
      return heystack.filter((item) => {
        let condition = false
        columns.forEach((col) => {
          condition = condition || _.toLower(item[col]).includes(query)
        })
        return condition
      })
    }
    return heystack.filter((item) => _.toLower(item[key]).includes(query))
  },
}
