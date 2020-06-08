import handler from './is.handler'

export default (ctx) => {
  const busEvents = ctx.store.state.busEvents
  const eventBus = ctx.app.$eventBus
  eventBus.$on(
    busEvents.ISLEDOVANIE_FINISH,
    handler.onIsledovanieFinish.bind(null, ctx)
  )
}
