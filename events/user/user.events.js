import handler from './user.handler'

export default (ctx) => {
  const busEvents = ctx.store.state.busEvents
  const eventBus = ctx.app.$eventBus
  eventBus.$on(busEvents.USER_TEST, handler.onUserTest.bind(null, ctx))
}
