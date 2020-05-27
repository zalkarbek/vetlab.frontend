export default {
  onSendedNapravlenieToOtdel({ context }) {
    const busEvents = context.store.state.busEvents
    return (data) => {
      context.app.$eventBus.$emit(busEvents.NAPRAVLENIE_SEND_TO_OTDEL_SUCCESS, data)
    }
  },
}
