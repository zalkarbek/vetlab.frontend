import handler from './na.handler'

export default (ctx) => {
  const busEvents = ctx.store.state.busEvents
  const eventBus = ctx.app.$eventBus
  eventBus.$on(
    busEvents.NAPRAVLENIE_SEND_TO_OTDEL,
    handler.onNapravlenieSendToOtdel.bind(null, ctx)
  )
  eventBus.$on(
    busEvents.VNYT_NAPRAVLENIE_ACCEPT_START,
    handler.onVnytNapravlenieAccept.bind(null, ctx)
  )

  eventBus.$on(
    busEvents.VNYT_NAPRAVLENIE_REJECT_START,
    handler.onVnytNapravlenieReject.bind(null, ctx)
  )

  eventBus.$on(
    busEvents.VNYT_NAPRAVLENIE_START_ISLEDOVANIE,
    handler.onVnytNapravlenieStartIsledovanie.bind(null, ctx)
  )
}
