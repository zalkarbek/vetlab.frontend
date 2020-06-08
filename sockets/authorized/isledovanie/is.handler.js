export default {
  onIsledovanieFinish({ context }) {
    const busEvents = context.store.state.busEvents
    return (response) => {
      context.app.$eventBus.$emit(busEvents.ISLEDOVANIE_FINISH_RESPONSE, response.data)
    }
  }
}
