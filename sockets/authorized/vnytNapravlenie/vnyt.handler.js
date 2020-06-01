export default {
  onAcceptSuccess({ context }) {
    const busEvents = context.store.state.busEvents
    return (response) => {
      context.app.$eventBus.$emit(busEvents.VNYT_NAPRAVLENIE_ACCEPT_SUCCESS, response.data)
    }
  },

  onReject({ context }) {
    const busEvents = context.store.state.busEvents
    return (response) => {
      context.app.$eventBus.$emit(busEvents.VNYT_NAPRAVLENIE_REJECT_FINISH, response.data)
    }
  }
}
