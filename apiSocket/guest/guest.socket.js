import guestHandler from './guest.handler'

export default ({ socket }) => {
  socket.on('connect', () => {})
  socket.on('connect_error', (error) => {
    return error
  })
  socket.on('guest:client:connected', guestHandler.onGuestWelcome({ socket }))
}
