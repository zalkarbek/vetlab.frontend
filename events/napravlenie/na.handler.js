export default {
  onNapravlenieSendToOtdel(ctx, data) {
    const io = ctx.app.$io.getSocket()
    const socketEvents = ctx.app.$io.getSocksEvents()
    io.emit(socketEvents.SERVER_NAPRAVLENIE_SEND_TO_OTDEL, data)
  },

  onVnytNapravlenieAccept(ctx, data) {
    const io = ctx.app.$io.getSocket()
    const socketEvents = ctx.app.$io.getSocksEvents()
    io.emit(socketEvents.SERVER_VNYT_NAPRAVLENIE_ACCEPT, data)
  }
}
