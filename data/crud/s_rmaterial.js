import baseApiRoutes from './baseApiRoutes'
import baseFields from '~/data/crud/baseFields'
// Имя модели к которому привязан этот API
const restName = 's_rmaterial'
// Превикс API маршрута
const routePrefix = 'rmaterials'
// Имя набор данных которые хранится в vuex или local (внутри компонента)
const datasetName = 'rmaterials'
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
