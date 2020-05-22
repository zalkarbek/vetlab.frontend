import userSocket from './user/user.socket'
import vnytNapravlenieSocket from './vnytNapravlenie/vnyt.socket'

export default ({ socket, context, socks }) => {
  socket.on('connect', () => {
    console.log('CONNECT SUCCESS')
  })
  socket.on('connect_error', () => {
    console.log('CONNECT ERROR')
  })

  socket.on('error', () => {
    console.log('CONNECT ERROR')
  })

  userSocket({ socket, context, socks })
  vnytNapravlenieSocket({ socket, context, socks })
}
