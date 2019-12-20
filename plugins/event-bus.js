/* eslint-disable func-names */

import Vue from 'vue'

const EventBus = new Vue()

export default (context, inject) => {
  inject('eventBus', EventBus)
}
