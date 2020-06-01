import handler from './vnyt.handler'

export default ({ socket, context, socks }) => {
  const { EVENTS } = socks
  socket.on(
    EVENTS.CLIENT_VNYT_NAPRAVLENIE_ACCEPT_SUCCESS,
    handler.onAcceptSuccess({ socket, context, socks })
  )

  socket.on(
    EVENTS.CLIENT_VNYT_NAPRAVLENIE_REJECT,
    handler.onReject({ socket, context, socks })
  )
}
