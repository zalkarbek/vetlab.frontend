import moment from 'moment'
import 'moment/locale/ru'
import 'moment/locale/ky'
import 'moment/locale/en-gb'
import momentDurationFormatSetup from 'moment-duration-format'

momentDurationFormatSetup(moment)

export default ({ app }, inject) => {
  inject('moment', moment)
}
