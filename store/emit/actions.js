export default {
  vnytNapravlenieAccept({ rootState }, data) {
    const user = rootState.user
    const clientEvents = rootState.busEvents
    const io = this.$io.getSocket()
    const socksEvents = this.$io.getSocksEvents()
    const sendData = {
      ...data,
      userId: user.id,
      personalId: user.personal.id,
      otdelId: user.personal.otdelId,
      subOtdelId: user.personal.subOtdelId
    }
    this.$eventBus.$emit(clientEvents.VNYT_NAPRAVLENIE_ACCEPT_START, sendData)
    io.emit(socksEvents.SERVER_VNYT_NAPRAVLENIE_ACCEPT, sendData)
  }
}
