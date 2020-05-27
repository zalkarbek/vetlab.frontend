import i18nConfig from '~/config/i18n'
import dateFormats from '~/config/dateFormats'
import busEvents from '~/data/busEvents'

export default () => ({
  user: {},
  token: '',
  logged: false,
  busEvents,
  socks: {},
  socketOpenedConnects: [],
  socketOpenedRooms: [],
  countries: [],
  cities: [],
  defaultLocale: i18nConfig.defaultLocale,
  currentLocale: i18nConfig.currentLocale,
  supportedLocales: i18nConfig.supportedLocales,
  dateSwitchLocales: i18nConfig.dateSwitchLocales,
  dateFormats,
})
