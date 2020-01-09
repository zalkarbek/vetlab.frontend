import env from 'dotenv'
env.config()

export default {
  mode: 'spa',
  server: {
    port: Number(process.env.NUXT_PORT), // default: 3000
    host: process.env.NUXT_HOST // default: localhost
  },
  isDev: process.env.NODE_ENV !== 'production',
  env: {
    isDev: process.env.NODE_ENV === 'development',
    isProd: process.env.NODE_ENV === 'production',
    baseUrl:
      process.env.NODE_ENV === 'development'
        ? process.env.HOST_DEVELOP
        : process.env.HOST_PROD
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
    '@/assets/scss/dash.scss',
    '@/assets/fonts/fontawesome-pro/scss/fontawesome.scss',
    '@/assets/fonts/fontawesome-pro/scss/duotone.scss',
    '@/assets/fonts/fontawesome-pro/scss/light.scss',
    '@/assets/fonts/fontawesome-pro/scss/regular.scss',
    '@/assets/fonts/fontawesome-pro/scss/brands.scss'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/event-bus.js',
    '~/plugins/jquery.js',
    '~/plugins/lodash.js',
    '~plugins/i18n.js',
    '~/plugins/moment.js',
    '~/plugins/time-out.js',
    '~/plugins/pouchdb.js',
    '~/plugins/axios.js',
    '~/plugins/dashboard.js',
    '~/plugins/socket-client'
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
  axios: {},
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'ru',
    lazy: true,
    langDir: 'lang/',
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
