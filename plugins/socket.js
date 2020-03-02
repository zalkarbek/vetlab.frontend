import io from '../sockets'

export default ({ app, env }, inject) => {
  inject('io', io({ host: env.baseUrl }))
}
