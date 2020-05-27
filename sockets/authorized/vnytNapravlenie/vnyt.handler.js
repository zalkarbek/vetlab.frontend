export default {
  onAcceptSuccess({ context }) {
    const busEvents = context.store.state.busEvents
    return (data) => {
      context.app.$eventBus.$emit(
        busEvents.VNYT_NAPRAVLENIE_ACCEPT_SUCCESS,
        data
      )
    }
  },
}
