import baseApiRoutes from './baseApiRoutes'
import baseFields from '~/data/crud/baseFields'
// Имя модели к которому привязан этот API
const restName = 's_preparat'
// Превикс API маршрута
const routePrefix = 'preparat'
// Имя набор данных которые хранится в vuex или local (внутри компонента)
const datasetName = 'preparat'
// базовые машрутры для всех api
const baseApi = baseApiRoutes({ routePrefix })

export default {
  restName,
  routePrefix,
  datasetName,
  rest: {
    ...baseApi,
  },

  fields: [...baseFields],
}
