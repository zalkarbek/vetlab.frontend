import socketHandler from './user.handler'

export default ({ socket, context, socks }) => {
  const { EVENTS } = socks
  socket.on(
    EVENTS.USER_CLIENT_CONNECTED,
    socketHandler.onUserConnected({ socket, context, socks })
  )

  socket.on(
    EVENTS.USER_CLIENT_GET_PROFILE,
    socketHandler.onUserGetProfile({ socket, context, socks })
  )
}
