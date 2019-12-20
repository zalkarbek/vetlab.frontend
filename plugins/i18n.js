import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default ({ app, store }, inject) => {
  app.i18n = new VueI18n({
    locale: store.state.currentLocale,
    fallbackLocale: 'ru',
    messages: {
      kg: require('~/i18n/kg.json'),
      ru: require('~/i18n/ru.json'),
      en: require('~/i18n/en.json')
    }
  })

  inject('i18n', app.i18n)
}
