export default {
  vnytNapravlenieAccept({ rootState }, data) {
    const user = rootState.user
    const clientEvents = rootState.busEvents
    const sendData = {
      ...data,
      userId: user.id,
      personalId: user.personal.id,
      otdelId: user.personal.otdelId,
      subOtdelId: user.personal.subOtdelId,
    }
    this.$eventBus.$emit(clientEvents.VNYT_NAPRAVLENIE_ACCEPT_START, sendData)
  },

  vnytNapravlenieReject({ rootState }, data) {
    const user = rootState.user
    const clientEvents = rootState.busEvents
    const sendData = {
      ...data,
      userId: user.id,
      personalId: user.personal.id,
      otdelId: user.personal.otdelId,
      subOtdelId: user.personal.subOtdelId,
    }
    this.$eventBus.$emit(clientEvents.VNYT_NAPRAVLENIE_REJECT_START, sendData)
  },

  napravlenieSendToOtdel({ rootState }, data) {
    const user = rootState.user
    const clientEvents = rootState.busEvents
    const sendData = {
      ...data,
      userId: user.id,
      personalId: user.personal.id,
      otdelId: user.personal.otdelId,
      subOtdelId: user.personal.subOtdelId,
    }
    this.$eventBus.$emit(clientEvents.NAPRAVLENIE_SEND_TO_OTDEL, sendData)
  },

  vnytNapravlenieStartIsledovanie({ rootState }, data) {
    const user = rootState.user
    const clientEvents = rootState.busEvents
    const sendData = {
      ...data,
      userId: user.id,
      personalId: user.personal.id,
      otdelId: user.personal.otdelId,
      subOtdelId: user.personal.subOtdelId,
    }
    this.$eventBus.$emit(clientEvents.VNYT_NAPRAVLENIE_START_ISLEDOVANIE, sendData)
  },

  isledovanieFinish({ rootState }, data) {
    const user = rootState.user
    const clientEvents = rootState.busEvents
    const sendData = {
      ...data,
      userId: user.id,
      personalId: user.personal.id,
      otdelId: user.personal.otdelId,
      subOtdelId: user.personal.subOtdelId,
    }
    this.$eventBus.$emit(clientEvents.ISLEDOVANIE_FINISH, sendData)
  }
}
