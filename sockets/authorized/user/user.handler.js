export default {
  onUserConnected({ socket, socks }) {
    // const { EVENTS } = socks
    return (payload) => {
      // console.log(payload)
      // socket.emit(EVENTS.USER_SERVER_GET_PROFILE)
    }
  },

  onUserGetProfile({ socket, socks }) {
    return (profile) => {
      console.log(profile)
    }
  },
}
