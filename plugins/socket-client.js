import io from '../apiSocket/main.js'

export default ({ app, env }, inject) => {
  inject('io', io({ host: env.baseUrl }))
}
