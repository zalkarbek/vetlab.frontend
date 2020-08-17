import handler from './is.handler'

export default ({ socket, context, socks }) => {
  const { EVENTS } = socks
  socket.on(
    EVENTS.CLIENT_FINISH_ISLEDOVANIE,
    handler.onIsledovanieFinish({ socket, context, socks })
  )

  socket.on(
    EVENTS.CLIENT_FINISH_ISLEDOVANIE_SHARE,
    handler.onIsledovanieFinish({ socket, context, socks })
  )
}
