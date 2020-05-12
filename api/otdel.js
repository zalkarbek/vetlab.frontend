export default ({ $axios }) => {
  return {
    getWithOtdelenia(params) {
      return $axios.$get('api/v1/otdel/with/otdelenia', params)
    }
  }
}
