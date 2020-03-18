import baseApiRoutes from './baseApiRoutes'
// Имя модели к которому привязан этот API
const restName = 's_region_type'
// Превикс API маршрута
const routePrefix = 'region/type'
// Имя набор данных которые хранится в vuex
const datasetName = 'regionTypes'

// базовые машрутры для всех api
const baseApi = baseApiRoutes({ routePrefix })

export default {
  restName,
  routePrefix,
  datasetName,
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