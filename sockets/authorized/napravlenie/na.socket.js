import handler from './na.handler'

export default ({ socket, context, socks }) => {
  const { EVENTS } = socks
  socket.on(
    EVENTS.CLIENT_NAPRAVLENIE_SEND_TO_OTDEL,
    handler.onSendedNapravlenieToOtdel({ socket, context, socks })
  )
}
