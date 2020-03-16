import baseApiRoutes from './baseApiRoutes'
// Имя модели к которому привязан этот API
const restName = 's_doljnost'
// Превикс API маршрута
const routePrefix = 'doljnost'

// базовые машрутры для всех api
const baseApi = baseApiRoutes({ routePrefix })

export default {
  restName,
  routePrefix,
  rest: {
    ...baseApi
  },

  fields: [
    {
      type: 'text',
      key: 'i18n'
    },
    {
      type: 'text',
      key: 'name'
    },
    {
      type: 'text',
      key: 'shortName'
    }
  ]
}
