import env from 'dotenv'
env.config()

export default {
  mode: 'spa',
  dev: process.env.NODE_ENV !== 'production',
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
    '~/plugins/moment.js',
    '~/plugins/time-out.js',
    { src: '~/plugins/i18n.js' },
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
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
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
