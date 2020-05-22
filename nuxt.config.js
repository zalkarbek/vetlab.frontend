import env from 'dotenv'
env.config()

const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV !== 'development'
const API_HOST = isDev ? process.env.HOST_DEV : process.env.HOST_PROD
const API_HOST_HTTPS = isDev
  ? process.env.HOST_HTTS_DEV
  : process.env.HOST_HTTS_PROD

export default {
  mode: 'spa',
  server: {
    port: Number(process.env.NUXT_PORT), // default: 3000
    host: process.env.NUXT_HOST // default: localhost
  },
  isDev,
  env: {
    isDev,
    isProd,
    baseUrl: API_HOST,
    baseSecureUrl: API_HOST_HTTPS
  },
  appDebug: process.env.APP_DEBUG,
  router: {
    middleware: ['userAgent', 'localization']
  },
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    bodyAttrs: {
      class: ['page-profile', 'df-roboto']
    },
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#5556FD' },
  /*
   ** Global CSS
   */
  css: [
    '@/assets/scss/index.scss',
    '@/assets/fonts/fontawesome-pro/scss/fontawesome.scss',
    '@/assets/fonts/fontawesome-pro/scss/duotone.scss',
    '@/assets/fonts/fontawesome-pro/scss/light.scss',
    '@/assets/fonts/fontawesome-pro/scss/solid.scss',
    '@/assets/fonts/fontawesome-pro/scss/regular.scss',
    '@/assets/fonts/fontawesome-pro/scss/brands.scss'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/event-bus.js', mode: 'client' },
    { src: '~/plugins/lodash.js', mode: 'client' },
    { src: '~/plugins/vue-select', mode: 'client' },
    { src: '~/plugins/vue-multiselect', mode: 'client' },
    { src: '~/plugins/vue-suggest', mode: 'client' },
    { src: '~/plugins/vue-calendar', mode: 'client' },
    { src: '~/plugins/vue-datepicker', mode: 'client' },
    { src: '~/plugins/vue-imask', mode: 'client' },
    { src: '~/plugins/vee-validate', mode: 'client' },
    { src: '~/plugins/jquery.js', mode: 'client' },
    { src: '~/plugins/pouchdb.js', mode: 'client' },
    { src: '~plugins/i18n.js', mode: 'client' },
    { src: '~/plugins/moment.js', mode: 'client' },
    { src: '~/plugins/time-out.js', mode: 'client' },
    { src: '~/plugins/api.js', mode: 'client' },
    { src: '~/plugins/dashboard.js', mode: 'client' },
    { src: '~/plugins/socket', mode: 'client' },
    { src: '~/plugins/global-methods', mode: 'client' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    ['nuxt-i18n'],
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // определитель девайса iOS, android, desktop
    '@nuxtjs/device',
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    // Doc : https://pwa.nuxtjs.org/setup.html
    '@nuxtjs/pwa'
  ],
  toast: {
    position: 'bottom-right',
    duration: 5000,
    containerClass: ['alert']
  },
  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false
  },
  axios: {
    proxy: true
  },
  proxy: {
    '/api/v1/': API_HOST,
    '/api/v2/': API_HOST
  },
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'ru',
    lazy: true,
    langDir: 'lang/',
    vueI18n: {
      silentTranslationWarn: true
    },
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en.js',
        name: 'EN'
      },
      {
        code: 'ru',
        iso: 'ru-RU',
        file: 'ru.js',
        name: 'RU'
      },
      {
        code: 'kg',
        iso: 'kg-KG',
        file: 'kg.js',
        name: 'KG'
      }
    ]
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
