import userSocket from './user/user.socket'
import vnytNapravlenieSocket from './vnytNapravlenie/vnyt.socket'
import naSocket from './napravlenie/na.socket'

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

  socket.on('response:error', async (response = {}) => {
    await context.app.store.dispatch('toast/toastDanger', {
      message: response.message || 'response.error'
    })
    if(context.isDev)
      console.log(response.stack)
  })

  socket.on('response:success', async (response) => {
    await context.app.store.dispatch('toast/toastSuccess', {
      message: response.message || 'response.success'
    })
  })

  userSocket({ socket, context, socks })
  vnytNapravlenieSocket({ socket, context, socks })
  naSocket({ socket, context, socks })
}
