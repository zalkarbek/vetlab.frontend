export default {
  onIsledovanieFinish(ctx, data) {
    console.log('busEvents', 'isledovanie started')
    const io = ctx.app.$io.getSocket()
    const socketEvents = ctx.app.$io.getSocksEvents()
    io.emit(socketEvents.SERVER_FINISH_ISLEDOVANIE, data)
  },

}
