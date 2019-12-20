import PerfectScrollbar from 'perfect-scrollbar'
import Dashboard from '~/class/Dashboard'

export default (context, inject) => {
  inject(
    'dashboard',
    new Dashboard({ jquery: context.app.$jquery, PerfectScrollbar })
  )
}
