/* eslint-disable func-names */

import { TimeOut } from '../class/TimeOut'

const timer = new TimeOut()

export default ({ app }, inject) => {
  inject('timer', timer)
}
