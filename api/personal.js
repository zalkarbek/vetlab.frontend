export default ({ $axios }) => {
  return {
    personalChangePassword() {
      return $axios.$post('api/v1/personal/change-password')
    },
  }
}
