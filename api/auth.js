export default ({ $axios }) => {
  return {
    userAuth(payload) {
      return $axios.$post('api/v1/auth/user/login', payload)
    },
    getUserProfile() {
      return $axios.$get('api/v1/user/profile')
    }
  }
}
