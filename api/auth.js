export default ({ $axios }) => {
  return {
    // eslint-disable-next-line require-await
    async userAuth(payload) {
      // return {
      //   error: false,
      //   message: 'hello',
      //   token: 'super token',
      //   user: {
      //     email: 'admin@gmail.com',
      //     name: 'admin'
      //   }
      // }
      return $axios.$post('api/v1/auth/user/login', payload)
    },
    // eslint-disable-next-line require-await
    async getUserProfile() {
      return $axios.$post('api/v1/user/profile')
    }
  }
}
