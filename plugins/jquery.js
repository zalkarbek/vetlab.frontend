import jQuery from 'jquery'

export default ({ app }, inject) => {
  inject('jquery', jQuery)
}
