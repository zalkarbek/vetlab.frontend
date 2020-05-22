import handler from './handler'

export default ({ socket, context, socks }) => {
  const { EVENTS } = socks
  socket.on(
    EVENTS.CLIENT_VNYT_NAPRAVLENIE_ACCEPT_SUCCESS,
    handler.onAcceptSuccess({ socket, context, socks })
  )
}
