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

  socket.on(
    EVENTS.CLIENT_START_ISLEDOVANIE,
    handler.onStartIsledovanieResponse({ socket, context, socks })
  )

  socket.on(
    EVENTS.CLIENT_START_ISLEDOVANIE_SHARE,
    handler.onStartIsledovanieResponse({ socket, context, socks })
  )

  socket.on(
    EVENTS.CLIENT_VNYT_NAPRAVLENIE_STATUS_UPDATED,
    handler.onNapravlenieUpdated({ socket, context, socks })
  )
}
