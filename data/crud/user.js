import baseApiRoutes from './baseApiRoutes'
// Имя модели к которому привязан этот API
const restName = 'user'
// Превикс API маршрута
const routePrefix = 'users'
// Имя набор данных которые хранится в vuex
const datasetName = 'users'
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
      key: 'email'
    },
    {
      type: 'password',
      key: 'password'
    }
  ]
}
