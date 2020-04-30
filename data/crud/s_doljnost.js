import baseApiRoutes from './baseApiRoutes'
import baseFields from '~/data/crud/baseFields'
// Имя модели к которому привязан этот API
const restName = 's_doljnost'
// Превикс API маршрута
const routePrefix = 'doljnost'
// Имя набор данных которые хранится в vuex
const datasetName = 'doljnost'

// базовые машрутры для всех api
const baseApi = baseApiRoutes({ routePrefix })

export default {
  restName,
  routePrefix,
  datasetName,
  rest: {
    ...baseApi
  },

  fields: [...baseFields]
}
