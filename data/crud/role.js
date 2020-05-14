import baseApiRoutes from './baseApiRoutes'
// Имя модели к которому привязан этот API
const restName = 'role'
// Превикс API маршрута
const routePrefix = 'roles'
// Имя набор данных которые хранится в vuex
const datasetName = 'roles'
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
      key: 'role_name',
      disabled: false,
      hidden: false
    },
    {
      type: 'text',
      key: 'role_key',
      disabled: true,
      hidden: true
    },
    {
      type: 'text',
      key: 'role_desc',
      disabled: false,
      hidden: false
    }
  ]
}
