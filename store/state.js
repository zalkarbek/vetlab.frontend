import i18nConfig from '~/config/i18n'

export default () => ({
  user: {},
  token: '',
  logged: false,
  socketOpenedConnects: [],
  socketOpenedRooms: [],
  countries: [],
  cities: [],
  defaultLocale: i18nConfig.defaultLocale,
  currentLocale: i18nConfig.currentLocale,
  supportedLocales: i18nConfig.supportedLocales
})
